# frozen_string_literal: true

class Melody::Fetcher
  include ActiveModel::Model

  attr_accessor :kind
  validates :kind, inclusion: { in: %w[op ed] }, allow_nil: true

  def initialize(season:, kind:)
    @season = season
    @kind = kind
  end

  def self.all(season:, kind:)
    new(season: season, kind: kind).all
  end

  def all
    melodies = @season.melodies.order(:created_at)
    melodies = melodies.send(@kind) if valid? && @kind
    melodies
  end
end
