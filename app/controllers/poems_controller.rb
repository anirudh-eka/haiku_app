class PoemsController < ApplicationController
  skip_before_action :require_login, only: [:index]
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
    @poem = Poem.find(params[:id])
    
    if current_user == @poem.poet
      @poem.update(poem_params)
      respond_with(@poem, include: { poet: { only: [:id, :name] } })
    else
      respond_with(@poem, include: { poet: { only: [:id, :name] } })
    end
  end

  private

  def poem_params
    params.require(:poem).permit(:title, :content, :snap_count)
  end
end
