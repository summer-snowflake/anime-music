# frozen_string_literal: true

class Actor < ApplicationRecord
  has_many :appearances, dependent: :destroy
  has_many :advertisements, dependent: :destroy

  validates :name, presence: true
end
