# frozen_string_literal: true

class Api::Admin::MelodyImagesController < Api::Admin::BaseController
  before_action :set_melody, only: %i[create]

  def create
    ActiveRecord::Base.transaction do
      melody_image_params.each do |picture|
        @melody.melody_images.create!(picture: picture)
      end
      head :created
    end
  rescue
    raise 'Upload failed'
  end

  def destroy
    @melody_image.destroy
    head @melody_image.destroyed? ? :ok : :forbidden
  end

  private

  def set_melody
    @melody = Melody.find(params[:melody_id])
  end

  def melody_image_params
    params.require('picture')
  end
end
