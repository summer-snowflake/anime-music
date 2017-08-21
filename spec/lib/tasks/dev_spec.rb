# frozen_string_literal: true

require 'rails_helper'

describe 'db:seed:dev' do
  include_context 'rake'

  it 'add administrator authority to the user' do
    expect(Anime.count).to eq 0
    expect(Season.count).to eq 0
    expect(Singer.count).to eq 0
    expect(Actor.count).to eq 0
    expect(Advertisement.count).to eq 0
    expect(Melody.count).to eq 0

    subject.invoke

    expect(Anime.count).to eq 1
    expect(Season.count).to eq 5
    expect(Singer.count).to eq 2
    expect(Actor.count).to eq 2
    expect(Advertisement.count).to eq 2
    expect(Appearance.count).to eq 2
    expect(Melody.count).to eq 2
  end
end
