class PoemsController < ApplicationController
  skip_before_action :require_login, except: [:create]

  def index
    @poems = Poem.all.reverse
    @poem = Poem.new
  end

  def create
    poet = Poet.find_by(session[:poet_id])
    poem = poet.poems.create(poem_params)

    TwitterAPI.new(poet.oauth_token, poet.oauth_secret).tweet(poem.content) if poem.valid?
    redirect_to root_path
  end

  private

  def poem_params
    params.require(:poem).permit(:title, :content)
  end
end
