class Api::ChatroomsController < ApplicationController
  def index
    render json: ["New York", "California", "Texas", "New Jersey"]
  end
end
