# frozen_string_literal: true

class Melody::Fetcher
  include ActiveModel::Model

  attr_accessor :kind
  validates :kind, inclusion: { in: %w[op ed] }, allow_nil: true

  def initialize(season:, params:)
    @season = season
    @kind = params[:kind] if params && params[:kind]
  end

  def self.all(season:, params:)
    new(season: season, params: params).all
  end

  def all
    melodies = @season.melodies.order(:created_at)
    melodies = melodies.send(@kind) if valid? && @kind
    melodies.includes(:singer)
  end
end
