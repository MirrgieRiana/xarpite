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

    def wrap_toc(container_html, toc_list)
      return '' if toc_list.to_s.empty?
      return toc_list if container_html.to_s.empty?

      closing_tag = '</div>'
      if container_html.include?(closing_tag)
        container_html.sub(closing_tag, toc_list + closing_tag)
      else
        container_html + toc_list
      end
    end

    def insert_toc(html, toc_markup)
      return html unless html

      cleaned_html = html.gsub('<!-- toc -->', '')
      return cleaned_html if toc_markup.to_s.empty?

      h1_match = cleaned_html.match(/<h1[^>]*>.*?<\/h1>/im)
      return cleaned_html unless h1_match

      insertion_base = h1_match.end(0)
      after_h1 = cleaned_html[insertion_base..] || ''
      next_heading_index = after_h1.index(/<h[1-6][^>]*>/i)
      insertion_point = next_heading_index ? insertion_base + next_heading_index : cleaned_html.length

      result = cleaned_html.dup
      result.insert(insertion_point, toc_markup)
      result
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
