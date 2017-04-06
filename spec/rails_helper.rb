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
require 'selenium-webdriver'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

include ActionDispatch::TestProcess

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

Capybara.default_max_wait_time = 20

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

ActiveRecord::Migration.maintain_test_schema!
SimpleCov.start 'rails'

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
  config.include Capybara::DSL

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!

  config.include FactoryGirl::Syntax::Methods
  config.include RSpec::JsonMatcher
  config.include ActiveJob::TestHelper
  config.include RequestSpecHelper, type: :request
  config.include FeatureSpecHelper, type: :feature

  config.before :suite do
    I18n.locale = :ja
    Faker::Config.locale = :en
    begin
      FactoryGirl.lint
    ensure
      DatabaseRewinder.clean_all
    end
  end

  config.after :each do
    DatabaseRewinder.clean_all
  end

  Autodoc.configuration.template =
    File.read(
      File.expand_path('../autodoc/templates/document.md.erb', __FILE__)
    )
  Autodoc.configuration.suppressed_request_header =
    %w[Accept Content-Length Host]
  Autodoc.configuration.suppressed_response_header =
    %w[
      Cache-Control Content-Length ETag
      X-Content-Type-Options X-Frame-Options X-Request-Id
      X-Runtime X-XSS-Protection
    ]
end
