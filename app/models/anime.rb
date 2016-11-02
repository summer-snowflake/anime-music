class Anime < ApplicationRecord
  has_many :seasons

  validates :title, presence: true
end
