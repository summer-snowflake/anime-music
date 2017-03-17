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
      resources :animes, only: %i(index show create update destroy) do
        resources :seasons, only: %i(index show create update)
      end
      resources :actors, only: %i(index show create update destroy)
    end
  end
end
