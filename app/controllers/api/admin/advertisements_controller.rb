# frozen_string_literal: true

class Api::Admin::AdvertisementsController < Api::Admin::BaseController
  before_action :set_anime, only: %i[index]
  before_action :set_melody, only: %i[index]
  before_action :set_advertisement, only: %i[destroy]

  # /api/admin/animes/:anime_id/advertisements
  # /api/admin/melodies/:melody_id/advertisements
  def index
    @advertisements =
      if @anime
        @anime.advertisements
      elsif @melody
        @melody.advertisements
      else
        Advertisement.all.includes(:season).order(created_at: :desc)
      end
  end

  def create
    @advertisement = Advertisement.new(advertisement_params)
    if @advertisement.save
      head :created
    else
      render_error @advertisement
    end
  end

  def destroy
    @advertisement.destroy
    head @advertisement.destroyed? ? :ok : :forbidden
  end

  private

  def set_anime
    @anime = Anime.find(params[:anime_id]) if params[:anime_id]
  end

  def set_melody
    @melody = Melody.find(params[:melody_id]) if params[:melody_id]
  end

  def set_advertisement
    @advertisement = Advertisement.find(params[:id])
  end

  def advertisement_params
    params.require(:advertisement)
          .permit(:anime_id, :actor_id, :season_id, :melody_id,
                  :tag_name, :body)
  end
end
