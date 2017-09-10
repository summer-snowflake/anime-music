# frozen_string_literal: true

class ChangeLog::Fetcher
  include ActiveModel::Model

  attr_accessor :anime_logs

  def initialize
    @anime_logs = anime_logs
  end

  def anime_logs
    PaperTrail::Version.where(item_type: 'Anime').reverse[0..30]
  end
end
