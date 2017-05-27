# frozen_string_literal: true

class MelodyImage < ApplicationRecord
  belongs_to :melody

  mount_uploader :picture, PictureUploader
end
