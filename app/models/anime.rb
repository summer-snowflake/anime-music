# frozen_string_literal: true
class Anime < ApplicationRecord
  has_many :seasons
  has_many :melodies
  has_many :appearances
  has_many :advertisements

  validates :title, presence: true
end
