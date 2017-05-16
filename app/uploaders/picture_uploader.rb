# frozen_string_literal: true

class PictureUploader < CarrierWave::Uploader::Base
  storage :file

  # TODO: production環境では、S3にアップロードできるようにする
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist
    %w[jpg jpeg gif png]
  end
end
