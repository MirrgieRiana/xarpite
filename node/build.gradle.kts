import org.jetbrains.kotlin.gradle.dsl.JsModuleKind
import org.jetbrains.kotlin.gradle.dsl.JsSourceMapEmbedMode

plugins {
    kotlin("multiplatform") version "2.2.21"
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll(
            listOf(
                "-Xmulti-dollar-interpolation",
                "-Xcontext-parameters",
                "-Xwhen-guards",
            )
        )
    }
    js {
        nodejs {
            testTask {
                useMocha {
                    timeout = "10s"
                }
            }
        }
        binaries.executable()
        binaries.library()
        outputModuleName = "xarpite-node"
        compilerOptions {
            moduleKind = JsModuleKind.MODULE_ES
            sourceMapEmbedSources = JsSourceMapEmbedMode.SOURCE_MAP_SOURCE_CONTENT_ALWAYS
        }
    }
    sourceSets {
        commonMain {
            dependencies {
                implementation(rootProject)
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
                implementation("com.squareup.okio:okio:3.10.2")
            }
        }
        commonTest {
            dependencies {
                implementation(rootProject)
                implementation(kotlin("test"))
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.10.2")
            }
        }
        jsMain {
            dependencies {
                implementation(rootProject)
                implementation("com.squareup.okio:okio-nodefilesystem:3.10.2")
                implementation("io.ktor:ktor-client-js:3.0.3")
            }
        }
        jsTest {
            dependencies {
                implementation(rootProject)
            }
        }
    }
}

// 異なる経路で同じディレクトリの成果物に依存するKotlin Multiplatformの構造的問題のための苦肉の対策のために書かされている
tasks.named("jsNodeProductionLibraryDistribution") { dependsOn("jsProductionExecutableCompileSync") }
