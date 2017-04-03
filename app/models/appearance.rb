# frozen_string_literal: true

class Appearance < ApplicationRecord
  belongs_to :anime
  belongs_to :actor
end
