class PoemsController < ApplicationController
  skip_before_action :require_login, except: [:create, :update, :snap, :unsnap]
  respond_to :json

  def index
    @poems = Poem.all
    respond_with(@poems, include: { poet: { only: [:id, :name] } })
  end

  def create
    poet = Poet.find(session[:poet_id])
    @poem = poet.poems.new(poem_params)

    TwitterAPI.new(poet.oauth_token, poet.oauth_secret).tweet(@poem.content) if @poem.save
    respond_with(@poem, include: { poet: { only: [:id, :name] } })
  end

  def update
    respond_with(@poem, include: { poet: { only: [:id, :name] } })
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
