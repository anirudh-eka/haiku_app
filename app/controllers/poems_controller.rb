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
    respond_with(@poem, include: { poet: { only: [:id, :name] } })
  end

  private

  def poem_params
    params.require(:poem).permit(:title, :content)
  end
end
