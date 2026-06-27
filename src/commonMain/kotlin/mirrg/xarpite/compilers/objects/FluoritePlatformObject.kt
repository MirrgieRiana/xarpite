package mirrg.xarpite.compilers.objects

// sealed な FluoriteValue に対し、プラットフォーム固有のソースセット（jsMain の FluoriteJsObject など）から
// 継承するための逃がし口。KMP では commonMain の sealed 型へ別ソースセットから直接サブタイプを足せないため、
// commonMain 側に非 sealed な許可サブタイプを 1 枚挟む。
abstract class FluoritePlatformObject : FluoriteValue
