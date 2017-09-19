# frozen_string_literal: true

class Appearance < ApplicationRecord
  include OperatorAccessor
  has_paper_trail

  belongs_to :anime
  belongs_to :actor
end
