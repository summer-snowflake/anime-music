# frozen_string_literal: true

class AnimeDecorator < Draper::Decorator
  delegate_all

  def human_status_name
    I18n.t("labels.status.#{status}")
  end
end
