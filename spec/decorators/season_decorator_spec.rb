# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SeasonDecorator, type: :decorator do
  describe '#period' do
    let!(:start_on) { 3.months.ago.to_date.to_s }
    let!(:end_on) { 1.month.ago.to_date.to_s }
    let!(:season) do
      create(:season, start_on: start_on, end_on: end_on).decorate
    end
    subject { season.period }

    context 'start_onとend_onに値が入っている場合' do
      it { is_expected.to eq start_on + ' 〜 ' + end_on }
    end

    context 'start_onのみ値が入っている場合' do
      let(:end_on) { nil }

      it { is_expected.to eq start_on + ' 〜 ' }
    end

    context 'start_onのみ値が入っている場合' do
      let(:start_on) { nil }

      it { is_expected.to eq ' 〜 ' + end_on }
    end

    context 'start_onとend_on両方のデータがない場合' do
      let(:start_on) { nil }
      let(:end_on) { nil }

      it { is_expected.to eq '' }
    end
  end
end
