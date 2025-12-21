import org.gradle.kotlin.dsl.support.uppercaseFirstChar
import org.jetbrains.kotlin.gradle.dsl.JsModuleKind
import org.jetbrains.kotlin.gradle.dsl.JsSourceMapEmbedMode
import org.jetbrains.kotlin.gradle.plugin.mpp.KotlinNativeTarget

plugins {
    kotlin("multiplatform") version "2.2.21"
    kotlin("plugin.serialization") version "2.2.21"
    id("com.dorongold.task-tree") version "4.0.1"
    id("build-logic")
}

kotlin {

    jvmToolchain(21)

    jvm()
    js {
        nodejs()
        binaries.library()
        outputModuleName = "xarpite-core"
        compilerOptions {
            moduleKind = JsModuleKind.MODULE_ES
            sourceMapEmbedSources = JsSourceMapEmbedMode.SOURCE_MAP_SOURCE_CONTENT_ALWAYS
        }
    }
    linuxX64 {
        binaries {
            executable("xarpite")
        }
    }
    // mingwX64だけ同じテストが成功したり失敗したりする怪現象のため廃止
    //mingwX64 {
    //    binaries {
    //        executable("xarpite")
    //    }
    //}

    sourceSets {
        commonMain {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.9.0")
                implementation("com.squareup.okio:okio:3.10.2")
                implementation("com.ionspin.kotlin:bignum:0.3.10")
                implementation("mirrg.kotlin:mirrg.kotlin.helium-kotlin-2-2:4.4.0")
            }
        }
        commonTest {
            dependencies {
                implementation(kotlin("test"))
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.10.2")
            }
        }
        jsMain {
            dependencies {
                implementation("com.squareup.okio:okio-nodefilesystem:3.10.2")
            }
        }
        jsTest {
            dependencies {
                implementation("com.squareup.okio:okio-nodefilesystem:3.10.2")
            }
        }
    }

}

val releaseExecutable = kotlin.targets
    .getByName<KotlinNativeTarget>("linuxX64")
    .binaries
    .getExecutable("xarpite", "RELEASE")


// Executable Jar

tasks.named<Jar>("jvmJar") {
    manifest {
        attributes["Main-Class"] = "JvmMainKt"
    }
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    from({
        configurations["jvmRuntimeClasspath"].filter { it.name.endsWith(".jar") }.map { zipTree(it) }
    })
}


// Release

fun registerGenerateInstallTask(engine: String): TaskProvider<Sync> {
    return tasks.register<Sync>("generateInstall${engine.uppercaseFirstChar()}") {
        from(file("release-template/install.sh"))
        filteringCharset = "UTF-8"
        filter {
            it
                .replace("@ENGINE@", engine)
                .replace("@SCRIPT_NAME@", "install-$engine.sh")
        }
        filePermissions {
            unix("rwxr-xr-x")
        }
        rename("install.sh", "install-$engine.sh")
        into(project.layout.buildDirectory.dir("generateInstall${engine.uppercaseFirstChar()}"))
    }
}

val generateInstallNative = registerGenerateInstallTask("native")
val generateInstallJvm = registerGenerateInstallTask("jvm")
val generateInstallNode = registerGenerateInstallTask("node")

val bundleRelease = tasks.register<Sync>("bundleRelease") {
    group = "build"
    val outputDirectory = layout.buildDirectory.dir("bundleRelease")
    into(outputDirectory)
    from("release") {
        rename("gitignore", ".gitignore")
        eachFile {
            if (relativePath.pathString == "xarpite") {
                permissions {
                    unix("rwxr-xr-x")
                }
            }
        }
    }
    from(generateInstallNative)
    from(generateInstallJvm)
    from(generateInstallNode)
    from(releaseExecutable.linkTaskProvider) {
        into("bin/native")
        rename("xarpite.kexe", "xarpite")
    }
    from(tasks.named("jvmJar")) { into("bin/jvm") }
    from(project(":node").tasks.named("jsNodeProductionLibraryDistribution")) { into("bin/node") }
    from("pages")
    from(project(":playground").tasks.named("bundleRelease")) { into("playground") }
}
tasks.named("build").configure { dependsOn(bundleRelease) }


// Doc Shell Tests

val generateDocShellTests = tasks.register("generateDocShellTests") {
    val docsDir = file("pages/docs/ja")
    val outFile = project.layout.buildDirectory.file("docShellTests/ja.sh")

    inputs.dir(docsDir)
    outputs.file(outFile)

    doLast {
        outFile.get().asFile.parentFile.mkdirs()
        val lines = mutableListOf<String>()
        val docFiles = docsDir.walkTopDown().filter { it.extension == "md" }.toList()
        docFiles.forEachIndexed { index, file ->
            val docShellParser = DocShellParser(file.toRelativeString(projectDir).replace('\\', '/'), file.readLines(), lines::add)
            if (index == 0) docShellParser.writeTestScriptHeader()
            docShellParser.writeTestScript()
            if (index == docFiles.size - 1) docShellParser.writeTestScriptFooter()
        }
        outFile.get().asFile.writeText(lines.joinToString("") { "$it\n" })
        outFile.get().asFile.setExecutable(true)
    }
}

tasks.register<Exec>("runDocShellTests") {
    group = "verification"
    dependsOn(generateDocShellTests, releaseExecutable.linkTaskProvider)
    workingDir = project.layout.buildDirectory.file("docShellTests").get().asFile
    commandLine("bash", "ja.sh", releaseExecutable.outputFile.relativeTo(workingDir).invariantSeparatorsPath)
}
tasks.named("check").configure { dependsOn(tasks.named("runDocShellTests")) }


// Utilities

allprojects {
    tasks.register("downloadDependencies") {
        doLast {
            configurations.filter { it.isCanBeResolved }.forEach { it.resolve() }
        }
    }
}
