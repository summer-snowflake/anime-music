Rails.application.routes.draw do
  root to: 'welcome#show'

  get 'login', to: 'sessions#new'
  delete 'logout', to: 'sessions#destroy'

  resources :animes, only: %i(show)

  namespace :admin do
    root to: 'top#index', as: :top
    resources :animes, only: %i(index show)
    resources :actors, only: %i(index show)
    # resources :melodies, only: %i(index show)
  end

  namespace :api, only: %i(index), format: 'json' do
    resource :notification, only: %i(create)
    resource :user, only: %i(show)
    resource :session, only: %i(create)
    resources :advertisements, only: %i(index)
    resources :animes, only: %i(show) do
      resources :advertisements, only: %i(index)
    end
    get :welcome, to: 'welcome#show'

    namespace :admin do
      resources :advertisements, only: %i(create destroy)
      resources :animes, only: %i(index show create update destroy) do
        resources :advertisements, only: %i(index)
        resources :seasons, only: %i(index show create update destroy)
      end
      resources :actors, only: %i(index show create update destroy)
      resources :seasons, only: :none do
        resources :advertisements, only: %i(index)
        resources :melodies, only: %i(index create update destroy)
      end
      resources :melodies, only: :none do
        resources :melody_images, only: %i(index create destroy)
      end
    end
  end
end
