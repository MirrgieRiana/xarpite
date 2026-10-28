import io.github.mirrgieriana.xarpeg.parseAll
import mirrg.xarpite.BracketsLiteralArrowedNode
import mirrg.xarpite.BracketsNode
import mirrg.xarpite.BracketsRightArrowedNode
import mirrg.xarpite.CommasNode
import mirrg.xarpite.EmptyNode
import mirrg.xarpite.InfixPlusNode
import mirrg.xarpite.Node
import mirrg.xarpite.ReturnNode
import mirrg.xarpite.SemicolonsNode
import mirrg.xarpite.ThrowNode
import mirrg.xarpite.XarpiteGrammar
import mirrg.xarpite.XarpiteParseContext
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertTrue

class NodeIdentityTest {

    private fun parse(grammar: XarpiteGrammar, source: String): Node {
        return grammar.rootParser.parseAll(source) { XarpiteParseContext(it) }.getOrThrow()
    }

    private fun assertDistinctIds(nodes: List<Node>) {
        val ids: List<Int> = nodes.map { it.id }
        assertEquals(nodes.size, ids.toSet().size)
    }

    private fun assertDistinctEmptyNodes(nodes: List<Node>) {
        assertTrue(nodes.all { it is EmptyNode })
        assertDistinctIds(nodes)
    }

    @Test
    fun nodeIdsAreAllocatedPerParseContext() {
        val firstContext = XarpiteParseContext("")
        val secondContext = XarpiteParseContext("")
        assertEquals(0, firstContext.allocateNodeId())
        assertEquals(1, firstContext.allocateNodeId())
        assertEquals(0, secondContext.allocateNodeId())
        assertEquals(2, firstContext.allocateNodeId())
        assertEquals(1, secondContext.allocateNodeId())
    }

    @Test
    fun successiveParseContextsContinueNodeIds() {
        val grammar = XarpiteGrammar("test", 5)
        val source = "1 + 1"
        val firstContext = XarpiteParseContext(source)
        val firstNode = grammar.rootParser.parseAll(source) { firstContext }.getOrThrow() as InfixPlusNode
        val nextNodeId = firstContext.nextNodeId
        val secondContext = XarpiteParseContext(source, nextNodeId)
        val secondNode = grammar.rootParser.parseAll(source) { secondContext }.getOrThrow() as InfixPlusNode
        assertDistinctIds(listOf(firstNode, firstNode.left, firstNode.right, secondNode, secondNode.left, secondNode.right))
        assertTrue(listOf(firstNode, firstNode.left, firstNode.right).all { it.id < nextNodeId })
        assertTrue(listOf(secondNode, secondNode.left, secondNode.right).all { it.id >= nextNodeId })
        assertTrue(secondContext.nextNodeId > nextNodeId)
    }

    @Test
    fun equalOccurrencesHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        listOf("value + value", "1 + 1").forEach { source ->
            val first = parse(grammar, source) as InfixPlusNode
            val second = parse(grammar, source) as InfixPlusNode
            val firstNodes = listOf(first, first.left, first.right)
            val secondNodes = listOf(second, second.left, second.right)
            assertDistinctIds(firstNodes)
            assertDistinctIds(secondNodes)
            assertEquals(firstNodes.map { it.id }, secondNodes.map { it.id })
        }
    }

    @Test
    fun emptyBracketBodiesHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        val source = "(); (); []; []; {}; {}; f(); f[]; f{}"
        repeat(2) {
            val semicolonsNode = parse(grammar, source) as SemicolonsNode
            val nodes = semicolonsNode.nodes.map { (it as BracketsNode).body }
            assertEquals(9, nodes.size)
            assertDistinctEmptyNodes(nodes)
            assertDistinctIds(listOf(semicolonsNode) + semicolonsNode.nodes + nodes)
        }
    }

    @Test
    fun emptyArrowArgumentsAndBodiesHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        val source = "(=>); [=>]; {=>}; f(=>); f[=>]; f{=>}"
        repeat(2) {
            val semicolonsNode = parse(grammar, source) as SemicolonsNode
            val nodes = semicolonsNode.nodes.flatMap {
                when (it) {
                    is BracketsLiteralArrowedNode -> listOf(it.arguments, it.body)
                    is BracketsRightArrowedNode -> listOf(it.arguments, it.body)
                    else -> error("Unexpected node: $it")
                }
            }
            assertEquals(12, nodes.size)
            assertDistinctEmptyNodes(nodes)
            assertDistinctIds(listOf(semicolonsNode) + semicolonsNode.nodes + nodes)
        }
    }

    @Test
    fun omittedStreamAndStatementPartsHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        listOf("," to 2, ",," to 3, ";" to 2, ";;" to 3).forEach { (source, expectedCount) ->
            repeat(2) {
                val node = parse(grammar, source)
                val nodes = when (node) {
                    is CommasNode -> node.nodes
                    is SemicolonsNode -> node.nodes
                    else -> error("Unexpected node: $node")
                }
                assertEquals(expectedCount, nodes.size, source)
                assertDistinctEmptyNodes(nodes)
                assertDistinctIds(listOf(node) + nodes)
            }
        }
    }

    @Test
    fun emptyRootsBlocksAndJumpValuesUseParseContextIds() {
        val grammar = XarpiteGrammar("test", 5)
        listOf("", ":", "!!", "label!!").forEach { source ->
            val context = XarpiteParseContext(source)
            val reservedId = context.allocateNodeId()
            val node = grammar.rootParser.parseAll(source) { context }.getOrThrow()
            val emptyNode = when (node) {
                is EmptyNode -> node
                is BracketsNode -> node.body
                is ThrowNode -> node.right
                is ReturnNode -> node.right
                else -> error("Unexpected node: $node")
            }
            assertTrue(emptyNode is EmptyNode)
            assertNotEquals(reservedId, emptyNode.id)
            assertNotEquals(reservedId, node.id)
            if (node !is EmptyNode) assertDistinctIds(listOf(node, emptyNode))
        }
    }
}
