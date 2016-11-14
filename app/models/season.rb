class Season < ApplicationRecord
  belongs_to :anime
  has_many :melodies

  validates :phase, presence: true
end
