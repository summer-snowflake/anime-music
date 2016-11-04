class Melody < ApplicationRecord
  belongs_to :anime
  belongs_to :season
  belongs_to :singer

  validates :title, presence: true

  enum kind: { op: 1, ed: 2 }
end
