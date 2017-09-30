# frozen_string_literal: true

class Tag < ApplicationRecord
  include OperatorAccessor
  has_paper_trail

  validates :name, presence: true,
                   length: { maximum: Settings.tag.name.maximum_length }
end
