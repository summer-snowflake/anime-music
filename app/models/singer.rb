class Singer < ApplicationRecord
  has_many :melodies

  validates :name, presence: true
end
