# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def render_error(resource, status = 422)
    @resource = resource
    render :validation_error, status: status, formats: :json
  end
end
