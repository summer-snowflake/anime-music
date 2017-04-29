Rails.application.routes.draw do
  root to: 'welcome#index'

  get 'login', to: 'sessions#new'
  delete 'logout', to: 'sessions#destroy'

  namespace :admin do
    root to: 'top#index', as: :top
    resources :animes, only: %i(index show)
    resources :actors, only: %i(index show)
    # resources :melodies, only: %i(index show)
  end

  namespace :api, only: %i(index), format: 'json' do
    resource :user, only: %i(show)
    resource :session, only: %i(create)
    get :welcome, to: 'welcome#show'

    namespace :admin do
      resources :advertisements, only: %i(create)
      resources :animes, only: %i(index show create update destroy) do
        resources :seasons, only: %i(index show create update destroy)
      end
      resources :actors, only: %i(index show create update destroy)
      resources :seasons, only: :none do
        resources :melodies, only: %i(index create update destroy)
      end
    end
  end
end
