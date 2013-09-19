class PoetsController < ApplicationController
  skip_before_action :require_login, only: [:new]

  def new
    redirect_to root_path
  end
end
