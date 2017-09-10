# frozen_string_literal: true

class Singer < ApplicationRecord
  include OperatorAccessor

  has_many :melodies

  validates :name, presence: true
end
