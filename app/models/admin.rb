# frozen_string_literal: true

class Admin < ApplicationRecord
  belongs_to :user
  has_paper_trail
end
