class PoemsController < ApplicationController
  def index
    @all_poems = Poem.all
    @poem = Poem.new
  end

  def create
    poem = Poem.create(poem_params)
    poet = Poet.find_by(seesion[:poet_id])
    TwitterAPI.new(poet.token, poet.secret).tweet(poem.content) if poem.valid?
    redirect_to root_path
  end

  private

  def poem_params
    params.require(:poem).permit(:title, :content)
  end
end
