Rails.application.routes.draw do
  root to: 'welcome#index'

  namespace :admin do
    root to: 'top#index'
  end

  namespace :api, only: %w(index), format: 'json' do
    resources :animes
  end
end
