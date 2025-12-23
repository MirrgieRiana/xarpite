require 'set'
require 'liquid'
require 'cgi'

module Xarpite
  module TocFilter
    SLUG_ALLOWED_CHARS_PATTERN = /[^a-z0-9ぁ-んァ-ヶ一-龠-]/.freeze

    def generate_toc_from_html(html)
      return '' unless html

      heading_regex = /<h([1-3])([^>]*)>(.*?)<\/h\1>/im
      headings = html.scan(heading_regex)
      return '' if headings.empty?

      existing_ids = html.scan(/id="([^"]+)"/i).map(&:first).to_set

      toc_lines = []
      list_stack = [toc_lines]
      current_level = nil

      root = { level: 0, children: [] }
      stack = [root]

      headings.each do |level_str, attrs, inner_html|
        level = level_str.to_i
        text = strip_tags(inner_html).strip
        next if text.empty?

        id_match = attrs.match(/id="([^"]+)"/i)
        id = id_match ? id_match[1] : generate_slug(text, existing_ids)
        existing_ids.add(id)

        while stack.last[:level] >= level
          stack.pop
        end

        parent = stack.last
        node = { level: level, text: text, id: id, children: [] }
        parent[:children] << node
        stack << node
      end

      build_html(root[:children])
    end

    private

    def generate_slug(text, existing_ids)
      base = text.downcase.gsub(/\s+/, '-').gsub(SLUG_ALLOWED_CHARS_PATTERN, '')
      base = 'section' if base.empty?
      candidate = base
      counter = 1
      while existing_ids.include?(candidate)
        candidate = "#{base}-#{counter}"
        counter += 1
      end
      candidate
    end

    def strip_tags(html)
      html.gsub(/<[^>]*>/, '')
    end

    def build_html(items)
      return '' if items.empty?

      '<ul id="markdown-toc">' + items.map { |item| render_item(item) }.join + '</ul>'
    end

    def render_item(item)
      children_html = build_html(item[:children])
      %(<li><a href="##{CGI.escapeHTML(item[:id])}">#{CGI.escapeHTML(item[:text])}</a>#{children_html}</li>)
    end
  end
end

Liquid::Template.register_filter(Xarpite::TocFilter)
