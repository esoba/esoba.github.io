#!/usr/bin/env ruby
# Run from the site's root using its bundled Jekyll runtime.
require 'pathname'
require 'jekyll'

abort 'Usage: bundle exec ruby preview_draft.rb /absolute/path/to/_drafts/topic.md' unless ARGV.length == 1

draft = Pathname.new(ARGV.first).expand_path
abort "Draft does not exist: #{draft}" unless draft.file?
abort 'Select a Markdown file directly inside _drafts.' unless draft.parent.basename.to_s == '_drafts' && draft.extname == '.md'

root = draft.parent.parent
abort "Run this command from #{root} so Bundler uses the site's Gemfile." unless Pathname.pwd.realpath == root.realpath
abort 'Missing _config.yml or Gemfile.' unless root.join('_config.yml').file? && root.join('Gemfile').file?

config = Jekyll.configuration('source' => root.to_s)
other_drafts = root.join('_drafts').glob('**/*').select(&:file?).reject { |path| path == draft }
config['exclude'] = Array(config['exclude']) + other_drafts.map { |path| path.relative_path_from(root).to_s }
config['show_drafts'] = true
config['trace'] = true
config['strict_front_matter'] = true
# Avoid cached output from a previous preview.
config['incremental'] = false

site = Jekyll::Site.new(config)
site.process
rendered = site.posts.docs.find { |doc| Pathname.new(doc.path).expand_path == draft }
abort 'Selected draft was not rendered; check published/date/exclude settings.' unless rendered
output = rendered.destination(site.dest)
abort "Missing rendered draft: #{output}" unless File.file?(output)

if root.join('bin/check_site.py').file?
  abort 'Local route/link checks failed.' unless system('python3', 'bin/check_site.py')
end
puts "Draft preview: #{output}"
puts 'Source remains in _drafts; nothing was published or committed.'
