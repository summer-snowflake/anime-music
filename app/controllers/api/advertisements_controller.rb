# frozen_string_literal: true

class Api::AdvertisementsController < Api::BaseController
  before_action :set_anime, only: %i[index]

  def index
    @advertisement =
      if @anime
        @anime.sample_advertisement
      else
        Anime.sample_airing_advertisement(Time.zone.today)
      end
  end

  private

  def set_anime
    @anime = Anime.find(params[:anime_id]) if params[:anime_id]
  end
end
