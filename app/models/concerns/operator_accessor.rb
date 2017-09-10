# frozen_string_literal: true

module OperatorAccessor
  extend ActiveSupport::Concern

  included do
    before_create :set_created_by
    before_update :set_updated_by
  end

  def creater
    User.find(created_by)
  end

  def updator
    User.find(updated_by)
  end

  private

  def set_created_by
    return unless Thread.current[:operator]
    self.created_by = Thread.current[:operator].id
    self.updated_by = Thread.current[:operator].id
  end

  def set_updated_by
    return unless Thread.current[:operator]
    self.updated_by = Thread.current[:operator].id
  end
end
