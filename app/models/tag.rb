# frozen_string_literal: true

class Tag < ApplicationRecord
  validates :name, presence: true,
                   length: { maximum: Settings.tag.name.maximum_length }
end
