Rails.application.routes.draw do
  root 'welcome#index'

  namespace :admin do
    root to: 'top#index', as: :top
    resources :animes
    resources :actors
    resources :melodies
  end

  namespace :api, only: %w(index), format: 'json' do
    resources :animes
  end
end
