# frozen_string_literal: true

class Appearance < ApplicationRecord
  include OperatorAccessor

  belongs_to :anime
  belongs_to :actor
end
