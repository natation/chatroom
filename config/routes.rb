Rails.application.routes.draw do
  root 'chatrooms#index'
  get '/chat' => 'chatrooms#start_chat'
  namespace :api, defaults: {format: :json} do
    resources :chatrooms, only: :index
    resources :chats, only: :show
  end
end
