# frozen_string_literal: true

class SeasonDecorator < Draper::Decorator
  delegate_all

  def anime_title
    title = "#{anime.title} #{name}"
    title += " （第#{phase}期）" unless disabled
    title
  end

  def period
    return '' unless start_on || end_on
    (start_on.to_s || '') + ' 〜 ' + (end_on.to_s || '')
  end
end
