Rails.application.routes.draw do
  root 'chatrooms#index'
  resources :chatrooms, only: :show
  namespace :api, defaults: {format: :json} do
    resources :chatrooms, only: :index
    resources :chats, only: :show
  end
end
