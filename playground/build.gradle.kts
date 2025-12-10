import org.jetbrains.kotlin.gradle.dsl.JsSourceMapEmbedMode

plugins {
    kotlin("multiplatform") version "2.2.21"
}

kotlin {
    js {
        browser()
        binaries.executable()
        compilerOptions {
            sourceMapEmbedSources = JsSourceMapEmbedMode.SOURCE_MAP_SOURCE_CONTENT_ALWAYS
        }
    }
    sourceSets {
        jsMain {
            dependencies {
                implementation(npm("codemirror", "6.0.1"))
                implementation(npm("@codemirror/lang-javascript", "6.2.2"))
                implementation(npm("pako", "2.1.0"))
            }
        }
    }
}

tasks.named<Copy>("jsProcessResources") {
    filesMatching("index.html") {
        filteringCharset = "UTF-8"
        filter {
            it.replace("<%= APP_VERSION %>", System.getenv("APP_VERSION") ?: "nightly build")
        }
    }
}

val bundleRelease = tasks.register<Sync>("bundleRelease") {
    group = "build"
    from(tasks.named("jsBrowserDistribution"))
    from(rootProject.project(":browser").tasks.named("jsBrowserProductionLibraryDistribution"))
    into(project.layout.buildDirectory.dir("bundleRelease"))
}
tasks.named("build").configure { dependsOn(bundleRelease) }
