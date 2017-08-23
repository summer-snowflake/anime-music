# frozen_string_literal: true

namespace :db do
  namespace :seed do
    desc 'Import test data'
    task dev: :environment do
      include SampleGenerator

      create_admin_user
      %w[animes seasons singers melodies].each do |target_table|
        create_from_csv(target_table)
      end
      create_actors
    end
  end
end
