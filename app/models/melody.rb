# frozen_string_literal: true

class Melody < ApplicationRecord
  belongs_to :anime
  belongs_to :season, optional: true
  belongs_to :singer

  validates :title, :kind, presence: true

  enum kind: %i[op ed]
end
