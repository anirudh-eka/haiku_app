class SnapsController < ApplicationController

  def index
    @poets = Poet.all
  end
end
