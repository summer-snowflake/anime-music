# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_paper_trail_whodunnit

  class BadRequestError < StandardError; end

  rescue_from Exception, with: :error500 unless Rails.env.development?
  rescue_from ActiveRecord::RecordNotFound,
              ActionController::RoutingError,
              with: :error404
  rescue_from BadRequestError, with: :error400

  def error400(e)
    logger.warn [e, *e.backtrace].join("\n")
    @error = e
    exception_notifier(e) if Rails.env.production?
    render :error400, status: 400, formats: :json
  end

  def error404(_e = nil)
    render :error404, status: 404, formats: :json
  end

  def error500(e)
    exception_notifier(e) if Rails.env.production?
    logger.error e.inspect
    logger.error [e, *e.backtrace].join("\n")
    render :error500, status: 500, formats: :json
  end

  def authenticate
    render :error401, status: 401 unless current_user
    Thread.current[:operator] = current_user
  end

  def current_user
    @current_user ||= authenticate_with_http_token do |token, _options|
      User.find_by_token(:access, token)
    end
  end

  private

  def exception_notifier(e)
    text = <<~EOC
      ```
      url: #{request.url}
      user_id: #{current_user.try(:id) || ''}
      error: #{e.inspect}
      #{[e, *e.backtrace].first(20).join("\n")}
      ```
    EOC
    Slack.chat_postMessage(
      text: text, username: 'Rails Error Notifier', channel: '#rails-error'
    )
  end

  def render_error(resource, status = 422)
    @resource = resource
    render :validation_error, status: status, formats: :json
  end
end
