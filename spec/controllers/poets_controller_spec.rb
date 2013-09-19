require 'spec_helper'

describe PoetsController do
  describe 'GET #index' do
    it "should redirect to root_path" do
      get :new
      expect(response).to redirect_to root_path
    end
  end
end