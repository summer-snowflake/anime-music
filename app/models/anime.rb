class Anime < ApplicationRecord
  has_many :seasons
  has_many :melodies

  validates :title, presence: true
end
