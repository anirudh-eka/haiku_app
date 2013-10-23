class PoetsController < ApplicationController
  skip_before_action :require_login, only: [:new, :show]
  respond_to :json

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

  def snap
    poet = Poet.find(params[:poet_id])
    @snap = poet.snaps.create(snap_params)
    respond_with(@snap)
  end

  def unsnap
    if params[:poet_id].to_i == session[:poet_id].to_i
      @snap = Snap.find(params[:id]).destroy
      respond_with(@snap)
    else
      respond_with(@snap)
    end
  end

  private

  def snap_params
    params.require(:snap).permit(:poem_id)
  end
end
