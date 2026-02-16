#!/usr/bin/env bash

cd -- "$(dirname -- "$0")" || exit 1

(($# == 1)) || {
  echo "Usage: $0 <version>" >&2
  exit 1
}
export version="$1"

find ../changelog.d -type f | sort | ./xarpite/xa -q '
  table :=
    I >> FILTER[/\.md$/] | READ(_) |
      */^!/  ? ["!", _[1 ~ _.$#]] :
      */^\?/ ? ["?", _[1 ~ _.$#]] :
               ["+", _          ]
    >> GROUP[by: \_.0] | [_.0; [_.1().1]] >> TO_OBJECT
  renderSection := name, items -> [
    name
    ""
    items() | "- $_"
  ]() >> JOIN["\n"]
  table.$# > 0 && (
    WRITE["../CHANGELOG.md"] << READB("../CHANGELOG.md")::(UTF8D)()::replace(
      "<!-- INSRTION POINT -->"
      [
        "<!-- INSRTION POINT -->"
        "## $(ENV.version)"
        "!" @ table ? renderSection("**Changes:**"     ; table."!") : E
        "+" @ table ? renderSection("**Improvements:**"; table."+") : E
        "?" @ table ? renderSection("**Fixes:**"       ; table."?") : E
      ]() >> JOIN["\n\n"]
    )
  )
' || exit 1

rm -f ../changelog.d/*.md || exit 1
