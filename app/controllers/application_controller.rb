# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  class BadRequestError < StandardError; end

  rescue_from Exception, with: :error500 unless Rails.env.development?
  rescue_from ActiveRecord::RecordNotFound,
              ActionController::RoutingError,
              with: :error404
  rescue_from BadRequestError, with: :error400

  def error400(e)
    logger.warn [e, *e.backtrace].join("\n")
    @error = e
    render :error400, status: 400, formats: :json
  end

  def error404(_e = nil)
    render :error404, status: 404, formats: :json
  end

  def error500(e)
    origin = "#{request.protocol}#{request.host_with_port}"
    ExceptionNotifier.notify_exception(
      e,
      env: request.env,
      data: { url: origin, user_id: current_user.try(:id) }
    ) if Rails.env.production?
    logger.error e.inspect
    logger.error [e, *e.backtrace].join("\n")
    render :error500, status: 500, formats: :json
  end

  def authenticate
    render :error401, status: 401 unless current_user
  end

  def current_user
    @current_user ||= authenticate_with_http_token do |token, _options|
      User.find_by_token(:access, token)
    end
  end

  private

  def render_error(resource, status = 422)
    @resource = resource
    render :validation_error, status: status, formats: :json
  end
end
