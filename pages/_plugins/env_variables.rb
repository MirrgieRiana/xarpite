module Jekyll
  class EnvironmentVariablesGenerator < Generator
    priority :highest

    def generate(site)
      if ENV['APP_VERSION']
        site.config['version'] = ENV['APP_VERSION']
      end
    end
  end
end
