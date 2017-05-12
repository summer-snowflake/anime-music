# frozen_string_literal: true

class Melody < ApplicationRecord
  belongs_to :anime
  belongs_to :season, optional: true
  belongs_to :singer
  has_one :advertisement
  accepts_nested_attributes_for :advertisement

  validates :title, :kind, presence: true
  validates :youtube,
            format: { with: /\A<iframe "\A*"|'\A*'|\A*>\z/i, allow_blank: true }

  enum kind: %i[op ed]
end
