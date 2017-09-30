# frozen_string_literal: true

class Api::Admin::ChangeLogsController < Api::Admin::BaseController
  def index
    fetcher = ChangeLog::Fetcher.new
    @anime_logs = fetcher.anime_logs
  end
end
