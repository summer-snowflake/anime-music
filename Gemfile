source 'https://rubygems.org'

ruby '2.3.1'

gem 'rails', '5.0.0.1'

gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'jquery-rails'
gem 'coffee-rails'
gem 'therubyracer'
gem 'browserify-rails'
gem 'rb-readline'
gem 'react-rails'
gem 'turbolinks'
gem 'slim-rails'
gem 'jbuilder'
gem 'bootstrap-sass'
gem 'sass-rails'
gem 'rake_shared_context'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'pry-byebug'
  gem 'rack-cors'
  gem 'factory_girl_rails'
  gem 'gimei'
  gem 'faker'
  gem 'brakeman', require: false
end

group :test do
  gem 'autodoc'
  gem 'rspec-rails'
  gem 'rspec-collection_matchers'
  gem 'shoulda-matchers'
  gem 'rspec-json_matcher', require: false
  gem 'selenium-webdriver'
  gem 'rack_session_access'
  gem 'phantomjs', '2.1.1.0'
  gem 'poltergeist'
  gem 'capybara'
  gem 'capybara-email'
  gem 'capybara-screenshot'
  gem 'simplecov'
  gem 'database_rewinder'
  gem 'terminal-notifier'
  gem 'terminal-notifier-guard'
end

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'guard-rspec'
  gem 'guard-rubocop'
  gem 'rubocop', require: false
  gem 'better_errors'
  gem 'binding_of_caller'
end

group :production do
  gem 'rails_12factor'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
