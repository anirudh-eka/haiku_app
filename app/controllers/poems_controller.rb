class PoemsController < ApplicationController
  def index
    @all_poems = Poem.all
  end

  def new
  end
end
