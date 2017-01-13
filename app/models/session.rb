# frozen_string_literal: true
class Session
  include ActiveModel::Model

  attr_accessor :email, :password
  validates :email, :password, presence: true

  def initialize(params)
    @params = params
    @email = params[:email]
    @password = params[:password]
  end

  def save
    return false if invalid?
    if authenticate
      true
    else
      errors[:base] << I18n.t('errors.messages.sessions.invalid_parameters')
      false
    end
  end

  def token
    return nil unless authenticate
    @token ||= user.add_access_token
  end

  def user
    @user ||= find_user
  end

  private

  def authenticate
    user && user.registered? && user.authenticate(@password)
  end

  def find_user
    User.find_by(email: @email)
  end
end
