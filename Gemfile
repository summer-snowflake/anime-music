source 'https://rubygems.org'

ruby '2.4.0'

gem 'rails', '5.0.1'

gem 'bcrypt'
gem 'bootstrap-sass'
gem 'exception_notification'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'jquery-rails'
gem 'browserify-rails'
gem 'slim-rails'
gem 'jbuilder'
gem 'rake_shared_context'
gem 'react-rails'
gem 'slack-api'
gem 'slack-notifier'
gem 'dotenv-rails'
gem 'rails-i18n'
gem 'rack-cors'
gem 'sass-rails'
gem 'settingslogic'
gem 'tokens'
gem 'validates_email_format_of'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'pry-byebug'
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
  gem 'poltergeist'
  gem 'phantomjs'
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
