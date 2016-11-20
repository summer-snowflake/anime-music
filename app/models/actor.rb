# frozen_string_literal: true
class Actor < ApplicationRecord
  has_many :appearances
  has_many :advertisements

  validates :name, presence: true
end
