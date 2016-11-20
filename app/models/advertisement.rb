# frozen_string_literal: true
class Advertisement < ApplicationRecord
  belongs_to :anime, optional: true
  belongs_to :actor, optional: true

  validates :body, presence: true
end
