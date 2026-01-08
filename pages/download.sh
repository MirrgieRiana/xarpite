#!/usr/bin/env bash

set -euo pipefail

error() {
  echo "$1" >&2
  exit 1
}

check() {
  command -v "$1" > /dev/null 2>&1 || error "Error: $1 is required but not installed."
}
check curl
check tar
check perl
check sort


# Determine the downloading version

echo "Fetching metadata"

export metadata=$(curl -s 'https://repo1.maven.org/maven2/io/github/mirrgieriana/xarpite-bin/maven-metadata.xml')

version=$(
  perl -E '
    $ENV{metadata} =~ /<versions>(.*?)<\/versions>/s or die;
    my $versions = $1;
    while ($versions =~ /<version>(\d+\.\d+\.\d+(?:\+[^<]*)?)<\/version>/g) {
        say $1;
    }
  ' | sort -Vr | head -n 1
)
[ -z "$version" ] && error "Error: Failed to determine latest version."
echo "Latest version: $version"

echo


# Download and extract

file="xarpite-bin-$version-all.tar.gz"
install_dir="xarpite"
url="https://repo1.maven.org/maven2/io/github/mirrgieriana/xarpite-bin/$version/$file"

echo "Downloading from: $url"

[ -e "$install_dir" ] && error "Error: Already exists: $install_dir"
mkdir "$install_dir"
curl -L -o - "$url" | tar -xzf - -C "$install_dir"
echo "Successfully downloaded and extracted to: $install_dir"
