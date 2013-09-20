class PoetsController < ApplicationController
  skip_before_action :require_login, only: [:new, :show]

  def index
    @poets = Poet.all
  end

  def new
    redirect_to root_path
  end

  def show
    @poet = Poet.find(params[:id])
    @poems = @poet.poems
  end

  def destroy
    if params[:id].to_i == session[:poet_id].to_i
      poet = Poet.find(params[:id])
      poet.destroy
      redirect_to root_path
    else
      redirect_to poet_path(id: params[:id])
    end
  end
end
