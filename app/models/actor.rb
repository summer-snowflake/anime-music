class Actor < ApplicationRecord
  has_many :appearances

  validates :name, presence: true
end
