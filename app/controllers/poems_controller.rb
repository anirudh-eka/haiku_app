class PoemsController < ApplicationController
  skip_before_action :require_login, except: [:create, :snap, :unsnap]
  respond_to :html, :json

  def index
    respond_with(@poems = Poem.all)
  end

  def create
    poet = Poet.find_by(session[:poet_id])
    @poem = poet.poems.new(poem_params)

    if @poem.save
      respond_with(@poem, include: { poet: { only: [:id, :name] } })
    else
      respond_with(@poem)
    end
  end

  def snap
    poem = Poem.find(params[:id])
    unless poem.snaps.find_by_poet_id(session[:poet_id])
      poem.snaps.create(poet_id: session[:poet_id])
      poem.snap_count += 1
      poem.save 
    end
    redirect_to root_path
  end

  def unsnap
    poem = Poem.find(params[:id])
    if snap = poem.snaps.find_by_poet_id(session[:poet_id])
      snap.destroy
      poem.snap_count -= 1
      poem.save 
    end
    redirect_to root_path
  end

  private

  def poem_params
    params.require(:poem).permit(:title, :content)
  end
end
