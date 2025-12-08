package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.Parser
import mirrg.xarpite.parser.Tuple0

operator fun Parser<*>.unaryMinus() = this map { Tuple0 }
