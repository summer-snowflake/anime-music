# frozen_string_literal: true

class Api::NotificationsController < Api::BaseController
  def create
    return unless Rails.env.production?
    info = error_info_params.each { |k| k }.map { |k| k.join(': ') }.join("\n")
    text = <<~EOC
      ```
      #{info}
      ```
    EOC
    Slack.chat_postMessage(
      text: text, username: 'Javascript Error Notifier', channel: '#rails-error'
    )
  end

  private

  def error_info_params
    params.permit(:error_msg, :file_name, :line_number,
                  :url_disp_page, :user_agent)
  end
end
