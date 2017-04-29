# frozen_string_literal: true

class Api::Admin::AdvertisementsController < Api::Admin::BaseController
  def create
    @advertisement = Advertisement.new(advertisement_params)
    if @advertisement.save
      head :created
    else
      render_error @advertisement
    end
  end

  private

  def advertisement_params
    params.require(:advertisement)
          .permit(:anime_id, :actor_id, :season_id, :body)
  end
end
