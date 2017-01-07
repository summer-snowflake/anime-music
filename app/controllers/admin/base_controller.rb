# frozen_string_literal: true
class Admin::BaseController < ApplicationController
  protect_from_forgery with: :null_session
  layout 'admin'
end
