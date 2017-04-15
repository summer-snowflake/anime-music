# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  tokenizable

  has_one :admin

  validates :email, presence: true

  enum status: { inactive: 1, registered: 2 }

  def add_access_token
    add_token(
      :access, size: Settings.access_token.length,
               expires_at: Settings.access_token.expire_after.seconds.from_now
    )
  end

  def admin?
    !admin.nil?
  end
end
