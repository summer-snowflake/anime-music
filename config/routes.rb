Rails.application.routes.draw do
  root to: 'welcome#index'

  namespace :admin do
    root to: 'top#index', as: :top
    resources :animes
    resources :actors
    resources :melodies
  end

  namespace :api, only: %i(index), format: 'json' do
    resources :animes, only: %i(index)

    namespace :admin do
      resources :animes, only: %i(index)
    end
  end
end
