#!/usr/bin/env ruby
# frozen_string_literal: true

require "minitest/autorun"
require_relative "../../pages/_plugins/docs_md_link_rewriter"

class DocsMdLinkRewriterTest < Minitest::Test
  DocStub = Struct.new(:relative_path, :site, :output)

  def rewrite(html, relative_path:, baseurl: "")
    site_stub = Struct.new(:config).new({ "baseurl" => baseurl })
    doc = DocStub.new(relative_path, site_stub, html)
    Xarpite::DocsMdLinkRewriter.rewrite_for(doc)
    doc.output
  end

  def test_converts_relative_docs_md_link
    html = '<a href="data_conversion.md">link</a>'
    assert_equal '<a href="data_conversion.html">link</a>',
                 rewrite(html, relative_path: "docs/ja/json.md")
  end

  def test_converts_single_quoted_link
    html = "<a href='data_conversion.md'>link</a>"
    assert_equal "<a href='data_conversion.html'>link</a>",
                 rewrite(html, relative_path: "docs/ja/json.md")
  end

  def test_keeps_external_md_link
    html = '<a href="https://example.com/data_conversion.md">external</a>'
    assert_equal html, rewrite(html, relative_path: "docs/ja/json.md")
  end

  def test_converts_absolute_docs_link_with_baseurl_and_fragment
    html = '<a href="/xarpite/docs/ja/data_conversion.md#sec">section</a>'
    assert_equal '<a href="/xarpite/docs/ja/data_conversion.html#sec">section</a>',
                 rewrite(html, relative_path: "docs/ja/json.md", baseurl: "/xarpite")
  end

  def test_ignores_non_docs_md_link
    html = '<a href="/README.md">readme</a>'
    assert_equal html, rewrite(html, relative_path: "docs/ja/json.md")
  end
end
