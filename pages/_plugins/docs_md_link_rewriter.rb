module Xarpite
  module DocsMdLinkRewriter
    LINK_PATTERN = /href="([^"]*?\.md)(#[^"]*)?"/i.freeze

    module_function

    def rewrite_for(doc)
      relative_path = doc_relative_path(doc)
      return unless relative_path&.start_with?("docs/")
      return unless doc.respond_to?(:output) && doc.output

      doc.output = rewrite_html(doc.output, relative_path, baseurl(doc))
    end

    def rewrite_html(html, relative_path, baseurl)
      base_dir = File.dirname(relative_path)

      html.gsub(LINK_PATTERN) do
        href = Regexp.last_match(1)
        fragment = Regexp.last_match(2) || ""
        replace_href(href, fragment, base_dir, baseurl) || Regexp.last_match(0)
      end
    end

    def replace_href(href, fragment, base_dir, baseurl)
      return nil if href =~ %r{\A[a-z][a-z0-9+.\-]*:}i

      normalized = normalize_href_for_check(href, baseurl)
      resolved = resolve_path(normalized, base_dir)
      return nil unless resolved&.start_with?("/docs/")

      %(href="#{href.sub(/\.md\z/i, '.html')}#{fragment}")
    end

    def normalize_href_for_check(href, baseurl)
      return href unless href.start_with?("/")
      normalized_baseurl = baseurl.to_s
      return href if normalized_baseurl.empty?

      prefix = normalized_baseurl.end_with?("/") ? normalized_baseurl : "#{normalized_baseurl}/"
      return href unless href.start_with?(prefix)

      stripped = href.delete_prefix(prefix)
      stripped.start_with?("/") ? stripped : "/#{stripped}"
    end

    def resolve_path(href, base_dir)
      return href if href.start_with?("/")

      File.expand_path(href, File.join("/", base_dir, "/"))
    end

    def doc_relative_path(doc)
      return doc.relative_path.sub(%r{\A/+}, "") if doc.respond_to?(:relative_path)
      return doc.path.sub(%r{\A/+}, "") if doc.respond_to?(:path)

      nil
    end

    def baseurl(doc)
      doc.respond_to?(:site) && doc.site&.respond_to?(:config) ? doc.site.config["baseurl"] : nil
    end
  end
end

if defined?(Jekyll::Hooks)
  [:documents, :pages].each do |entity|
    Jekyll::Hooks.register entity, :post_convert do |doc|
      Xarpite::DocsMdLinkRewriter.rewrite_for(doc)
    end
  end
end
