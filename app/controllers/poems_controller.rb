class PoemsController < ApplicationController
  def index
    @all_poems = Poem.all
    @poem = Poem.new
  end

  def create
    Poem.create!(poem_params)
    redirect_to root_url
  end

  private

  def poem_params
    params.require(:poem).permit(:title, :content)
  end
end
