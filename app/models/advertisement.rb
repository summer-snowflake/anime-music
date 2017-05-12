# frozen_string_literal: true

class Advertisement < ApplicationRecord
  belongs_to :anime, optional: true
  belongs_to :actor, optional: true
  belongs_to :season, optional: true
  belongs_to :melody, optional: true, inverse_of: :advertisement

  validates :body, presence: true,
                   format: { with: /\A<"\A*"|'\A*'|\A*>\z/i }
  validate :should_have_id

  def should_have_id
    errors[:base] << '所属が不明な広告です' unless anime || season || actor || melody
    # TODO: エラーメッセージにテーブル名が表示される問題を解消する
  end
end
