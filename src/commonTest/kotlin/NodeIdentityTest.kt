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
import kotlin.test.assertTrue

class NodeIdentityTest {

    private fun parse(grammar: XarpiteGrammar, source: String): Node {
        return grammar.rootParser.parseAll(source) { XarpiteParseContext(it) }.getOrThrow()
    }

    private fun assertDistinctIds(nodes: List<Node>) {
        val ids: List<Long> = nodes.map { it.id }
        assertEquals(nodes.size, ids.toSet().size)
    }

    private fun assertDistinctEmptyNodes(nodes: List<Node>) {
        assertTrue(nodes.all { it is EmptyNode })
        assertDistinctIds(nodes)
    }

    @Test
    fun equalOccurrencesHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        listOf("value + value", "1 + 1").forEach { source ->
            val first = parse(grammar, source) as InfixPlusNode
            val second = parse(grammar, source) as InfixPlusNode
            assertDistinctIds(listOf(first, first.left, first.right, second, second.left, second.right))
        }
    }

    @Test
    fun separateGrammarsHaveDistinctIds() {
        val first = parse(XarpiteGrammar("test", 5), "1 + 1") as InfixPlusNode
        val second = parse(XarpiteGrammar("test", 5), "1 + 1") as InfixPlusNode
        assertDistinctIds(listOf(first, first.left, first.right, second, second.left, second.right))
    }

    @Test
    fun emptyBracketBodiesHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        val source = "(); (); []; []; {}; {}; f(); f[]; f{}"
        val nodes = List(2) { parse(grammar, source) as SemicolonsNode }
            .flatMap { it.nodes }
            .map { (it as BracketsNode).body }
        assertEquals(18, nodes.size)
        assertDistinctEmptyNodes(nodes)
    }

    @Test
    fun emptyArrowArgumentsAndBodiesHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        val source = "(=>); [=>]; {=>}; f(=>); f[=>]; f{=>}"
        val nodes = List(2) { parse(grammar, source) as SemicolonsNode }
            .flatMap { it.nodes }
            .flatMap {
                when (it) {
                    is BracketsLiteralArrowedNode -> listOf(it.arguments, it.body)
                    is BracketsRightArrowedNode -> listOf(it.arguments, it.body)
                    else -> error("Unexpected node: $it")
                }
            }
        assertEquals(24, nodes.size)
        assertDistinctEmptyNodes(nodes)
    }

    @Test
    fun omittedStreamAndStatementPartsHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        listOf("," to 2, ",," to 3, ";" to 2, ";;" to 3).forEach { (source, expectedCount) ->
            val nodes = List(2) { parse(grammar, source) }.flatMap {
                when (it) {
                    is CommasNode -> it.nodes
                    is SemicolonsNode -> it.nodes
                    else -> error("Unexpected node: $it")
                }
            }
            assertEquals(expectedCount * 2, nodes.size, source)
            assertDistinctEmptyNodes(nodes)
        }
    }

    @Test
    fun emptyRootsBlocksAndJumpValuesHaveDistinctIds() {
        val grammar = XarpiteGrammar("test", 5)
        val nodes = listOf("", ":", "!!", "label!!").flatMap { source ->
            List(2) {
                when (val node = parse(grammar, source)) {
                    is EmptyNode -> node
                    is BracketsNode -> node.body
                    is ThrowNode -> node.right
                    is ReturnNode -> node.right
                    else -> error("Unexpected node: $node")
                }
            }
        }
        assertEquals(8, nodes.size)
        assertDistinctEmptyNodes(nodes)
    }
}
