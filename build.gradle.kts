import org.gradle.kotlin.dsl.support.uppercaseFirstChar
import org.jetbrains.kotlin.gradle.dsl.JsModuleKind
import org.jetbrains.kotlin.gradle.dsl.JsSourceMapEmbedMode
import org.jetbrains.kotlin.gradle.plugin.mpp.KotlinNativeTarget

plugins {
    kotlin("multiplatform") version "2.2.21"
    kotlin("plugin.serialization") version "2.2.21"
    id("com.dorongold.task-tree") version "4.0.1"
    id("build-logic")
    `maven-publish`
    signing
    id("io.github.gradle-nexus.publish-plugin") version "2.0.0"
}

project.group = "io.github.mirrgieriana"
project.version = System.getenv("APP_VERSION") ?: "0.0.0-SNAPSHOT"

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
    }

}

val releaseExecutable = kotlin.targets
    .getByName<KotlinNativeTarget>("linuxX64")
    .binaries
    .getExecutable("xarpite", "RELEASE")


// Executable Jar

tasks.named<Jar>("jvmJar") {
    archiveFileName = "xarpite-jvm.jar"
    manifest {
        attributes["Main-Class"] = "JvmMainKt"
    }
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    from({
        configurations["jvmRuntimeClasspath"].filter { it.name.endsWith(".jar") }.map { zipTree(it) }
    })
}


// Release

val bundlePages = tasks.register<Sync>("bundlePages") {
    group = "build"
    into(project.layout.buildDirectory.dir("bundlePages"))
    from("pages")
    from("LICENSE")
    from(project(":playground").tasks.named("bundleRelease")) { into("playground") }
}
tasks.named("build").configure { dependsOn(bundlePages) }

val bundleXarpiteBinAll = tasks.register<Sync>("bundleXarpiteBinAll") {
    group = "build"
    into(project.layout.buildDirectory.dir("bundleXarpiteBinAll"))
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
    from("LICENSE")
    from(releaseExecutable.linkTaskProvider) {
        into("bin/native")
        rename("xarpite.kexe", "xarpite")
    }
    from(tasks.named("jvmJar")) { into("bin/jvm") }
    from(project(":node").tasks.named("jsNodeProductionLibraryDistribution")) { into("bin/node") }
    doLast {
        val versionFile = destinationDir.resolve("version")
        versionFile.writeText(project.version.toString() + "\n")
    }
}
tasks.named("build").configure { dependsOn(bundleXarpiteBinAll) }

val createXarpiteBinAllTarGz = tasks.register<Tar>("createXarpiteBinAllTarGz") {
    group = "build"
    archiveBaseName = "xarpite-bin"
    archiveClassifier = "all"
    archiveExtension = "tar.gz"
    compression = Compression.GZIP
    from(bundleXarpiteBinAll)
    destinationDirectory = project.layout.buildDirectory.dir("xarpiteBinAllTarGz")
    useFileSystemPermissions()
}

publishing {
    publications {
        create<MavenPublication>("xarpiteBinAll") {
            artifactId = "xarpite-bin"
            artifact(createXarpiteBinAllTarGz) {
                classifier = "all"
                extension = "tar.gz"
            }
            pom {
                name = "xarpite-bin"
                description = "Xarpite (xa) - An interpreted language for one-liners"
                url = "https://mirrgieriana.github.io/xarpite/"
                licenses {
                    license {
                        name = "MIT License"
                        url = "http://www.opensource.org/licenses/mit-license.php"
                    }
                }
                developers {
                    developer {
                        id = "MirrgieRiana"
                        name = "MirrgieRiana"
                        url = "https://github.com/MirrgieRiana"
                    }
                }
                scm {
                    connection = "scm:git:https://github.com/MirrgieRiana/xarpite.git"
                    developerConnection = "scm:git:ssh://github.com:MirrgieRiana/xarpite.git"
                    url = "https://github.com/MirrgieRiana/xarpite"
                }
            }
        }
    }
    repositories {
        maven {
            name = "BuildLocal"
            url = uri(project.layout.buildDirectory.dir("maven"))
        }
    }
}

signing {
    isRequired = true

    val signingKey = providers.gradleProperty("signingKey").orNull
    val signingPassword = providers.gradleProperty("signingPassword").orNull
    useInMemoryPgpKeys(signingKey, signingPassword)

    sign(publishing.publications["xarpiteBinAll"])
}

nexusPublishing {
    repositories {
        sonatype {
            nexusUrl.set(uri("https://ossrh-staging-api.central.sonatype.com/service/local/"))
            snapshotRepositoryUrl.set(uri("https://central.sonatype.com/repository/maven-snapshots/"))
        }
    }
}


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

val runDocShellTests = tasks.register<Exec>("runDocShellTests") {
    group = "verification"
    dependsOn(generateDocShellTests, bundleXarpiteBinAll)
    workingDir = project.layout.buildDirectory.file("docShellTests").get().asFile
    commandLine(
        "bash",
        "ja.sh",
        bundleXarpiteBinAll.get().destinationDir.relativeTo(workingDir).invariantSeparatorsPath,
    )
}
tasks.named("check").configure { dependsOn(runDocShellTests) }

val runReleaseTests = tasks.register<Exec>("runReleaseTests") {
    group = "verification"
    dependsOn(bundleXarpiteBinAll)
    workingDir = project.layout.projectDirectory.dir("scripts").asFile
    doFirst {
        commandLine(
            "bash",
            "run-release-tests.sh",
            bundleXarpiteBinAll.get().destinationDir.relativeTo(workingDir).invariantSeparatorsPath,
        )
    }
}
tasks.named("check").configure { dependsOn(runReleaseTests) }


// Utilities

allprojects {
    tasks.register("downloadDependencies") {
        doLast {
            configurations.filter { it.isCanBeResolved }.forEach { it.resolve() }
        }
    }
}
