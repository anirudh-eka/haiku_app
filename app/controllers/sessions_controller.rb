class SessionsController < ApplicationController
  def create
    poet = Poet.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Poet.create_with_omniauth(auth)
    session[:poet_id] = poet.id
    redirect_to root_path
  end

  protected

  def auth
    request.env['omniauth.auth']
  end
end