# frozen_string_literal: true

class Api::UsersController < Api::BaseController
  before_action :authenticate

  def show
    @user = current_user
  end
end
