# frozen_string_literal: true

class ChangeLog::Fetcher
  include ActiveModel::Model

  attr_accessor :animes

  def initialize
    animes
  end

  def animes
    @animes = PaperTrail::Version.where(item_type: 'Anime').reverse[0..30]
  end
end
