# frozen_string_literal: true

class PictureUploader < CarrierWave::Uploader::Base
  storage Rails.env.production? ? :fog : :file

  def store_dir
    "anime-music-uploads/#{model.class.to_s.underscore}/#{model.id}"
  end

  def extension_whitelist
    %w[jpg jpeg gif png]
  end
end
