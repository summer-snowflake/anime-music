# frozen_string_literal: true

json.access_token @session.token.token

json.user do
  json.id @user.id
  json.email @user.email
  json.admin @user.admin?
end
