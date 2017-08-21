# frozen_string_literal: true

namespace :db do
  namespace :seed do
    desc 'Import test data'
    task dev: :environment do
      include SampleGenerator

      create_admin_user
      create_animes
      create_seasons
      create_melody1
      create_melody2
      create_appearances
      create_advertisements
    end
  end
end
