class SessionsController < ApplicationController
  def create
    poet = Poet.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Poet.create_with_omniauth(auth)
    session[:poet_id] = poet.id

    poet = Twitter::Client.new( 
      oauth_token: auth[:credentials][:token],
      oauth_token_secret: auth[:credentials][:secret]
    )
    # Thread.new{poet.update("Tweeting Poet")}

    redirect_to root_path
  end

  def destroy
    session[:poet_id] = nil
    redirect_to root_path
  end

  protected

  def auth
    request.env['omniauth.auth']
  end
end