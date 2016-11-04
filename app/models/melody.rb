class Melody < ApplicationRecord
  belongs_to :season
  belongs_to :singer

  validates :title, presence: true
end
