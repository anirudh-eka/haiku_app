require 'spec_helper'

describe SessionsController do
  let(:new_poet) {FactoryGirl.create(:poet)}
  let(:omniauth_auth) {{"provider" => "twitter", "uid" => 123456789}}
  let(:request_env) {{'omniauth.auth' => :omniauth_auth}}
  describe 'GET #create' do
    context 'happy path' do
      
    before(:each) do
      Poet.stub(:create_with_omniauth).and_return(new_poet)
      request.stub(:env).and_return(request_env)
    end

      context 'when user logs in for the first time' do
        it 'should call create_with_omniauth on the Poet object' do
          Poet.should_receive(:create_with_omniauth).and_return(new_poet)#.with(auth)
          get :create , :provider => "twitter"
        end
      end
      context 'when user has logged in before' do
        it 'should not call create_with_omniauth on the Poet object' do
          Poet.stub(:find_by_provider_and_uid).and_return(new_poet)
          Poet.should_not_receive(:create_with_omniauth)
          get :create, :provider => "twitter"
        end
      end
      
      it 'should store poet id in session' do
         get :create, :provider => "twitter"
         expect(session[:poet_id]).to be(new_poet.id)
      end

      it 'should redirect to root path' do
        get :create, :provider => "twitter"
        expect(response).to redirect_to root_path
      end
    end
  end

  describe 'GET #destroy' do
    before(:each) do      
      session[:poet_id] = new_poet.id
    end
    it 'should change poet id in session to nil' do
      get :destroy
      expect(session[:poet_id]).to be_nil
    end
  end
end