# frozen_string_literal: true

class Melody < ApplicationRecord
  belongs_to :anime
  belongs_to :season, optional: true
  belongs_to :singer
  has_one :advertisement, inverse_of: :melody
  accepts_nested_attributes_for :advertisement,
                                reject_if: lambda { |advertisement|
                                             advertisement[:body].blank?
                                           }

  validates :title, :kind, presence: true
  validates :youtube,
            format: { with: /\A<iframe "\A*"|'\A*'|\A*>\z/i, allow_blank: true }

  enum kind: %i[op ed]
end
