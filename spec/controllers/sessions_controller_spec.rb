require 'spec_helper'

describe SessionsController do

  describe 'GET #create' do
    context 'happy path' do
      context 'when poet logs in for the first time' do
        
        xit 'should create new poet object' do
          get :create
        end
      end

      it 'should store poet id in session'
      it 'should create new twitter client'
      it 'should redirect to root path'
    end
  end

    context 'sad path'
      context 'when poet logs in for the first time'
        it 'should not create new poet object'
      it 'should not store poet id in session'
      it 'should not make new twitter client'
      it 'should recirect to root path'

  describe 'GET #destroy'
      it 'should change poet id in session to nil'
end