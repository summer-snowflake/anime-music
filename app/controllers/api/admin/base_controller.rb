# frozen_string_literal: true

class Api::Admin::BaseController < Api::BaseController
  before_action :authenticate
end
