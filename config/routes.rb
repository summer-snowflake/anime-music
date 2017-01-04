Rails.application.routes.draw do
  scope format: 'json' do
    resources :animes, only: %i(index)
  
    namespace :admin do
      resources :animes, only: %i(index show)
      resources :actors, only: %i(index show)
    end
  end
end
