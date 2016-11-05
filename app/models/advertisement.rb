class Advertisement < ApplicationRecord
  belongs_to :anime
  belongs_to :actor

  validates :body, presence: true
end
