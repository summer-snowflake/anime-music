class Season < ApplicationRecord
  belongs_to :anime
  has_many :melodies

  validates :name, presence: true
end
