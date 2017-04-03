# frozen_string_literal: true

class SeasonDecorator < Draper::Decorator
  delegate_all

  def period
    return '' unless start_on || end_on
    (start_on.to_s || '') + ' 〜 ' + (end_on.to_s || '')
  end
end
