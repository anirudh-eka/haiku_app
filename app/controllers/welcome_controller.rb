class WelcomeController < ApplicationController
  skip_before_action :require_login
  respond_to :html, :json

  def index
    puts '*' * 80
    @something ='cat'
    @poems = Poem.all
    @poets = Poet.all
  end
end