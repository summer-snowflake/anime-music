# frozen_string_literal: true

class MelodyImage < ApplicationRecord
  has_paper_trail

  belongs_to :melody

  mount_uploader :picture, PictureUploader

  validates :picture, presence: true
end
