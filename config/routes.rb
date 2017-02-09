Rails.application.routes.draw do
  root to: 'welcome#index'

  namespace :admin do
    root to: 'top#index', as: :top
    resources :animes, only: %i(index show)
    resources :actors, only: %i(index show)
    resources :melodies, only: %i(index show)
  end

  namespace :api, only: %i(index), format: 'json' do
    resource :session, only: %i(create)
    resources :animes, only: %i(index)

    namespace :admin do
      resources :animes, only: %i(index show update) do
        resources :seasons, only: %i(index)
      end
      resources :actors, only: %i(index show)
    end
  end
end
