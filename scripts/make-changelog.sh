#!/usr/bin/env bash

cd -- "$(dirname -- "$0")" || exit 1

export script_name="$0"

./xarpite/xa -q -- '
  ARGS.$# == 1 || !! "Usage: $(ENV.script_name) <version>"
  version := ARGS.0

  files := ((EXECL("test", "-d", "../changelog.d").& | TRUE) !? FALSE) ? (
    "../changelog.d" | d => FILE_NAMES(d) | n => "$d/$n" >> SORT >> TO_ARRAY
  ) : (
    []
  )
  OUT << "Changelog files: $(files.$#)"

  table :=
    files()
    >> FILTER[/\.md$/]
    | f =>
      READL(f) | l =>
        l =~ /^!/  ? ["!", l[1 ~ l.$#]] :
        l =~ /^\?/ ? ["?", l[1 ~ l.$#]] :
                     ["+", l          ]
    >> GROUP[by: \_.0] | [_.0; [_.1().1]] >> TO_OBJECT
  OUT << "Changelog entries: $(table().1.$#)"

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
