class WelcomeController < ApplicationController
  skip_before_action :require_login
  respond_to :html, :json

  def index
    @poem = Poem.new
  end
end