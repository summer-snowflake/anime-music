module OperatorSetter
  extend ActiveSupport::Concern

  included do
    before_create :set_created_by
    before_update :set_updated_by
  end

  def creater
    User.find(self.created_by)
  end

  def updator
    User.find(self.updated_by)
  end

  private

  def set_created_by
    self.created_by = Thread.current[:operator].id
    self.updated_by = Thread.current[:operator].id
  end

  def set_updated_by
    self.updated_by = Thread.current[:operator].id
  end
end
