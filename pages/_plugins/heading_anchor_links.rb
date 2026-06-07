require 'cgi'

module Xarpite
  module HeadingAnchorLinks
    # h1〜h4の見出しにアンカーリンクを追加するパターン
    # より厳密な正規表現を使用
    HEADING_PATTERN = /<(h[1-4])\s+([^>]*\bid=["']([^"']+)["'][^>]*)>(.*?)<\/\1>/im.freeze
    ANCHOR_LINK_CHECK = /<a[^>]+class=["'][^"']*heading-anchor-link[^"']*["']/i.freeze

    module_function

    def add_anchor_links_for(doc)
      relative_path = doc_relative_path(doc)
      # ドキュメントディレクトリ配下のみ処理
      return unless relative_path&.start_with?('docs/')
      return unless doc.respond_to?(:output) && doc.output

      doc.output = add_anchor_links_to_html(doc.output)
    end

    def add_anchor_links_to_html(html)
      html.gsub(HEADING_PATTERN) do
        tag = $1
        attrs = $2
        id = $3
        content = $4

        # 既にアンカーリンクが存在する場合はスキップ
        next Regexp.last_match(0) if ANCHOR_LINK_CHECK.match?(content)

        # アンカーリンクボタンを作成
        # IDはKramdownによって生成されるため、すでに安全
        anchor_link = %(<a href="##{CGI.escapeHTML(id)}" class="heading-anchor-link" aria-label="Link to this section">#</a>)

        # 見出しタグを再構築（アンカーリンクを末尾に追加）
        %(<#{tag} #{attrs}>#{content}#{anchor_link}</#{tag}>)
      end
    end

    def doc_relative_path(doc)
      return doc.relative_path.sub(%r{\A/+}, '') if doc.respond_to?(:relative_path)
      return doc.path.sub(%r{\A/+}, '') if doc.respond_to?(:path)

      nil
    end
  end
end

if defined?(Jekyll::Hooks)
  [:documents, :pages].each do |entity|
    Jekyll::Hooks.register entity, :post_render do |doc|
      Xarpite::HeadingAnchorLinks.add_anchor_links_for(doc)
    end
  end
end
