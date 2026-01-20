module Jekyll
  class EnvironmentVariablesGenerator < Generator
    priority :highest

    def generate(site)
      site.config['version'] = ENV['APP_VERSION'] || site.config['version'] || 'Latest'
    end
  end
end
