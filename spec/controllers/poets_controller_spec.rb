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

  describe 'GET #show' do
    before(:each) { new_poet }

    it "should return poet" do
      get :show, id: new_poet.id
      assigns(:poet).should eq(new_poet)
    end 

    it "should return an array of all poems by poet" do
      new_poet.poems.create(FactoryGirl.attributes_for(:poem))
      all_poems = new_poet.poems
      get :show, id: new_poet.id 
      assigns(:poems).should eq(all_poems)
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do 
      new_poet.poems.create(FactoryGirl.attributes_for(:poem))
    end

    context 'if user is logged in ' do
      before(:each) { session[:poet_id] = new_poet.id }

      context 'if user is poet to be destroyed' do
        it "removes poet from database" do
          delete :destroy, id: new_poet.id
          expect(Poet.all).to be_empty
        end

        it "removes all poet's poems" do
          delete :destroy, id: new_poet.id
          expect(Poem.all).to be_empty
        end
        
        it "redirects to root_path" do
          delete :destroy, id: new_poet.id
          expect(response).to redirect_to root_path
        end

      end
      
      context 'if user is not poet to be destroyed' do
        before(:each) do
          @another_poet = FactoryGirl.create(:poet)
          session[:poet_id] = @another_poet.id
        end

        it "does not remove poet from database" do
          delete :destroy, id: new_poet.id
          expect(Poet.where(id: new_poet.id)).to_not be_empty
        end
        
        it "does not remove poets haikus" do
          delete :destroy, id: new_poet.id
          expect(Poem.where(poet_id: new_poet.id)).to_not be_empty
        end

        it "redirects to poet show page" do
          delete :destroy, id: new_poet.id
          expect(response).to redirect_to poet_path(id: new_poet.id)
        end
      end
    end

    context 'if user is not logged in' do
      it "should redirect to new_poet_path" do
        delete :destroy, id: new_poet.id
        expect(response).to redirect_to new_poet_path
      end
    end

  end

  context 'POST #snap' do
    let(:poet) { FactoryGirl.create(:poet) }
    let(:poem) { FactoryGirl.create(:poem) }
    let(:snap) { poem.snaps.create }
    let(:action) { post :snap, poet_id: (session[:poet_id] || 99), snap: snap.attributes, :format => :json}

    context 'if user is logged in' do
      before(:each) { session[:poet_id] = poet.id}

      context 'when user has already snapped' do
        before do
          poet.snaps << snap
        end
        it_behaves_like 'failed snap creation'
      end

      context 'when user has not snapped' do 
        before { action }
        it_behaves_like 'successful snap creation'
      end
    end

    context 'if user is not logged in' do
      before { action }
      it_behaves_like 'user not logged in'
    end
  end

  context 'POST #unsnap'
end