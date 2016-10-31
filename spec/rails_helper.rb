# frozen_string_literal: true
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)

require 'spec_helper'
require 'rspec/rails'
require 'shoulda-matchers'
require 'rspec/json_matcher'
require 'faker'
require 'capybara/email/rspec'
require 'capybara/poltergeist'
require 'capybara-screenshot/rspec'
require 'rack_session_access/capybara'
require 'simplecov'
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

include ActionDispatch::TestProcess

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, phantomjs: Phantomjs.path)
end

Capybara.javascript_driver = :poltergeist
Capybara.default_max_wait_time = 20

Capybara.register_driver :mobile do |app|
  Capybara::RackTest::Driver.new(
    app,
    headers: { 'HTTP_USER_AGENT' =>
               'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) \
               AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 \
               Mobile/11A465 Safari/9537.53' }
  )
end

ActiveRecord::Migration.maintain_test_schema!
SimpleCov.start 'rails'

RSpec.configure do |config|
  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!

  config.include FactoryGirl::Syntax::Methods
  config.include RSpec::JsonMatcher
  config.include ActiveJob::TestHelper

  config.before :suite do
    I18n.locale = :ja
    Faker::Config.locale = :en
    begin
      FactoryGirl.lint
    ensure
      DatabaseRewinder.clean_all
    end
  end
end
