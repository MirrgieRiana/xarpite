pluginManagement {
    includeBuild("build-logic")
}

dependencyResolutionManagement {
    repositories {
        mavenCentral()
        maven("https://raw.githubusercontent.com/MirrgieRiana/mirrg.kotlin/refs/heads/maven/maven/")
    }
}

include(":playground")

rootProject.name = "xarpite"
