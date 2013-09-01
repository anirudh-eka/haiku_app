class SessionsController < ApplicationController
  def create
    @poet = Poet.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Poet.create_with_omniauth(auth)
    self.current_user = @poet
    redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end