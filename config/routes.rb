Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'welcome#index'

  namespace :api, only: %w(index), format: 'json' do
    resources :animes
  end
end
