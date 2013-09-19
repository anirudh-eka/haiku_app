require 'spec_helper'

describe SessionsController do
  let(:new_poet) {FactoryGirl.create(:poet)}
  let(:omniauth_auth) {{"provider" => "twitter", "uid" => 123456789}}
  let(:request_env) {{'omniauth.auth' => :omniauth_auth}}
  describe 'GET #create' do
    context 'happy path' do
      context 'when user logs in for the first time' do
        before(:each) do
          #Poet.stub(:create_with_omniauth).and_return(new_poet)
          request.stub(:env).and_return(request_env)
        end

        it 'should call create_with_omniauth on the Poet object' do
          #Poet.stub(:create_with_omniauth).and_return(new_poet)
          Poet.should_receive(:create_with_omniauth).and_return(new_poet)#.with(auth)
          get :create , :provider => "twitter"
        end
      end

      it 'should store poet id in session'
      it 'should create new twitter client'
      it 'should redirect to root path'
    end
  end

    context 'sad path'
      context 'when user logs in for the first time'
        it 'should not create new poet object'
      it 'should not store poet id in session'
      it 'should not make new twitter client'
      it 'should recirect to root path'

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