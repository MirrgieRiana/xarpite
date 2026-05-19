package mirrg.xarpite

/** このThrowableが正規表現実行中のスタックオーバーフローを表すかどうかを返す */
expect fun Throwable.isRegexStackOverflow(): Boolean
