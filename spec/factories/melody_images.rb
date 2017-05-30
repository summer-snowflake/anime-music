# frozen_string_literal: true

FactoryGirl.define do
  factory :melody_image do
    melody
    picture { fixture_file_upload('spec/fixtures/clover.gif', 'image/gif') }
  end
end
