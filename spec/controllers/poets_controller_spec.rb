require 'spec_helper'

describe PoetsController do
  
  let(:new_poet) { FactoryGirl.create(:poet) }      
  
  describe 'GET #index' do
    context "if user is not signed in" do
      it "should redirect to new_poet_path" do
        get :index
        expect(response).to redirect_to new_poet_path
      end
    end
    
    context "if user is signed in " do
      before(:each) do
        session[:poet_id] = new_poet.id
      end

      it "should return an array of all poets" do
        poets_array = [new_poet]
        5.times{poets_array << FactoryGirl.create(:poet)}

        get :index
        assigns(:poets).should eq(poets_array)
      end
    end
  end

  describe 'GET #new' do
    it "should redirect to root_path" do
      get :new
      expect(response).to redirect_to root_path
    end
  end
end