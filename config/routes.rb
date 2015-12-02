Rails.application.routes.draw do
  namespace :api do
  get 'chatrooms/index'
  end

  root 'chatrooms#index'
  resources :chatrooms, only: :show
  namespace :api, defaults: {format: :json} do
    resources :chatrooms, only: :index
  end
end
