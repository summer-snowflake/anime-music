class Melody < ApplicationRecord
  belongs_to :anime
  belongs_to :season, optional: true
  belongs_to :singer

  validates :title, :kind, presence: true

  enum kind: { op: 1, ed: 2 }
end