class HomeController < ApplicationController
  skip_before_action :require_login, only: [:index]

  def index
    puts '-' *80
  end

end