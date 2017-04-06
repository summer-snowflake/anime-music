# frozen_string_literal: true

module FeatureSpecHelper
  def login(user)
    visit login_path
    fill_in 'email', with: user.email
    fill_in 'password', with: user.password
    find('.btn-danger').click

    sleep 1
  end

  def logout
    find('.logout').click
  end
end
