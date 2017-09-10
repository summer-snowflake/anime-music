# frozen_string_literal: true

class Api::Admin::ChangeLogsController < Api::Admin::BaseController
  def index
    fetcher = ChangeLog::Fetcher.new
    @animes = fetcher.animes
    # @animes = PaperTrail::Version.where(item_type: 'Anime').reverse[0..30]
  end
end
