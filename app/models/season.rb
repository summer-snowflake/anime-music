class Season < ApplicationRecord
  belongs_to :anime

  validates :name, presence: true
end
