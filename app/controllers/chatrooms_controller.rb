class ChatroomsController < ApplicationController
  def index
    render json: {chatrooms: ["New York", "California", "Texas", "New Jersey"]}
  end

  def show
  end
end
