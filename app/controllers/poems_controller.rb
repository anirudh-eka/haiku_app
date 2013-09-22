class PoemsController < ApplicationController
  skip_before_action :require_login, except: [:create]

  def index
    @poems = Poem.all.reverse
    @poem = Poem.new
  end

  def create
    poet = Poet.find_by(session[:poet_id])
    poem = poet.poems.new(poem_params)

    if poem.save
      TwitterAPI.new(poet.oauth_token, poet.oauth_secret).tweet(poem.content)
      redirect_to root_path flash[:success] = "Your word is a sun, when you let it go, it joins the stars"
    else
      @prev_entry = poem_params
      @error_message = poem.errors.messages[:content].join
      @poem = Poem.new
      @poems = Poem.all.reverse
      render :index
    end
  end

  def snap
  end

  def unsnap
  end

  private

  def poem_params
    params.require(:poem).permit(:title, :content)
  end
end
