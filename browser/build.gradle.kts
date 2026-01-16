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
        browser {
            testTask {
                useMocha {
                    timeout = "10s"
                }
            }
        }
        binaries.library()
        outputModuleName = "xarpite-browser"
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
            }
        }
        jsTest {
            dependencies {
                implementation(rootProject)
            }
        }
    }
}
