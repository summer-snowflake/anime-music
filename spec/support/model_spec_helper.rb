# frozen_string_literal: true

module ModelSpecHelper
  RSpec.shared_examples 'PaperTrail enabled' do
    it { is_expected.to be_versioned }
    with_versioning do
      it { expect(PaperTrail).to be_enabled }
    end
  end
end
