#!/usr/bin/env bash

set -euo pipefail

command -v curl > /dev/null 2>&1 || {
  echo "Error: curl is required but not installed." >&2
  exit 1
}


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
echo "Latest version: $version"


# Download and extract

file="xarpite-bin-$version-all.tar.gz"
dir="xarpite"
url="https://repo1.maven.org/maven2/io/github/mirrgieriana/xarpite-bin/$version/$file"

if [ -e "$dir" ]; then
  echo "Error: Already exists: $dir" >&2
  exit 1
fi

echo "Downloading from: $url"
mkdir "$dir"
curl -L -o - "$url" | tar -xzf - -C "$dir"

echo "Successfully downloaded and extracted to: $dir"
