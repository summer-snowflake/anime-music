# frozen_string_literal: true

class Melody < ApplicationRecord
  attr_accessor :singer_name

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

  before_save :find_or_create_singer, if: :singer_name_present?

  def find_or_create_singer
    new_singer = Singer.find_or_create_by!(name: singer_name)
    self.singer = new_singer
  end

  private

  def singer_name_present?
    singer_name.present?
  end
end
