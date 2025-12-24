require 'set'
require 'liquid'
require 'cgi'

module Xarpite
  module TocFilter
    SLUG_ALLOWED_CHARS_PATTERN = /[^a-z0-9ぁ-んァ-ヶ一-龠-]/.freeze

    # h1〜h3の構造を辿りながら見出しIDの重複を避けて目次を構築するループ
    def generate_toc_from_html(html)
      return '' unless html

      # htmlからh1〜h3の見出しを抽出する正規表現を用いて該当要素をまとめて取り出す
      headings = html.scan(/<h([1-3])([^>]*)>(.*?)<\/h\1>/im)
      return '' if headings.empty?

      # 重複チェック用に既存のid属性を収集してセットに格納する
      existing_ids = html.scan(/id="([^"]+)"/i).map(&:first).to_set

      # 先頭のルート要素をスタックに置き、親子関係の構築を開始する
      root = { level: 0, children: [] }
      stack = [root]

      headings.each do |level_str, attrs, inner_html|
        level = level_str.to_i
        text = strip_tags(inner_html).strip
        next if text.empty?

        id_match = attrs.match(/id="([^"]+)"/i)
        id = id_match ? id_match[1] : generate_slug(text, existing_ids)
        existing_ids.add(id)

        # 深さの浅い親要素と階層が揃うまでスタックを遡る
        while stack.last[:level] >= level
          stack.pop
        end

        parent = stack.last
        # 現在の見出しを親の子リストに追加してツリー構造のルートを伸ばす
        node = { level: level, text: text, id: id, children: [] }
        parent[:children] << node
        stack << node
      end

      build_html(root[:children])
    end

    private

    # 見出しテキストから既存IDと衝突しないスラグを生成し、重複するたび数値を付加して処理を繰り返す
    def generate_slug(text, existing_ids)
      # 見出しテキストを小文字にし、許可パターン以外を削除して基礎文字列を得る
      base = text.downcase.gsub(/\s+/, '-').gsub(SLUG_ALLOWED_CHARS_PATTERN, '')
      base = 'section' if base.empty?
      candidate = base
      counter = 1
      while existing_ids.include?(candidate)
        # 既存IDと衝突するたびに数値を付加して一意のスラグとする
        candidate = "#{base}-#{counter}"
        counter += 1
      end
      candidate
    end

    # HTMLタグを取り除いて、生テキストだけを取り出す
    def strip_tags(html)
      html.gsub(/<[^>]*>/, '')
    end

    # 子要素があれば再帰的に<ul>構造を構築して返す
    def build_html(items)
      return '' if items.empty?

      '<ul id="markdown-toc">' + items.map { |item| render_item(item) }.join + '</ul>'
    end

    # 目次項目ごとに<li><a>を組み立て、必要なら子リストも追加する
    def render_item(item)
      children_html = build_html(item[:children])
      %(<li><a href="##{CGI.escapeHTML(item[:id])}">#{CGI.escapeHTML(item[:text])}</a>#{children_html}</li>)
    end
  end
end

Liquid::Template.register_filter(Xarpite::TocFilter)
