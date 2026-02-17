#!/usr/bin/env bash

cd -- "$(dirname -- "$0")" || exit 1

export script_name="$0"

find ../changelog.d -type f | sort | ./xarpite/xa -q '
  ARGS.$# == 1 || !! "Usage: $(ENV.script_name) <version>"
  version := ARGS.0

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
      "<!-- INSERTION POINT -->"
      [
        "<!-- INSERTION POINT -->"
        "## $(version)"
        "!" @ table ? renderSection("**Changes:**"     ; table."!") : E
        "+" @ table ? renderSection("**Improvements:**"; table."+") : E
        "?" @ table ? renderSection("**Fixes:**"       ; table."?") : E
      ]() >> JOIN["\n\n"]
    )
  )
' "$@" || exit 1

rm -f ../changelog.d/*.md || exit 1
