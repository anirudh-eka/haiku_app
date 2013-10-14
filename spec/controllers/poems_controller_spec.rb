require 'spec_helper'

describe PoemsController do

  describe 'GET #index' do
    it 'creates an array of all poems' do
      poems_arr = JSON.parse(FactoryGirl.create_list(:poem, 5).to_json)
      get :index, :format => :json
      expect(response).to be_success
      expect(json).to eq(poems_arr)
    end
  end

  describe 'POST #create' do
    
    let(:nil_content) { {content: nil} }
    let(:new_poem_attributes) {FactoryGirl.attributes_for(:poem)}
    let(:wrong_params) {post :create, poem: (nil_content), :format => :json}
    let(:correct_params) {post :create, poem: (new_poem_attributes), :format => :json}
    let(:twitter_client) {double("twitter client", tweet: true)}

    context 'if user is logged in' do
      before(:each) do
        basho = FactoryGirl.create(:poet)       
        session[:poet_id] = basho.id
      end

      context 'when content is present and does not exceed character count in params' do        
        before do
         TwitterAPI.stub(:new).and_return(twitter_client)
         correct_params
        end

        it 'creates a new poem' do
          Poem.all.count.should eq(1)
        end

        it 'sends content to Twitter' do
          correct_params
          expect(twitter_client).to have_received(:tweet).with(new_poem_attributes[:content])
        end

        it 'returns the created poem object' do
          correct_params
          poem = Poem.first.to_json(include: { poet: { only: [:id, :name] } })
          expect(response).to be_success
          expect(json).to eq(JSON.parse(poem))
        end
      end

      context 'when content not present in params' do
        before { wrong_params }
        it_behaves_like 'failed poem creation'
      end

      context 'when content is over 140 characters' do
        before { post :create, poem: ({content: 'h'*141}), :format => :json }
        it_behaves_like 'failed poem creation'
      end
    end

    context 'if user is not logged in' do
      before { correct_params }
      it_behaves_like 'failed poem creation'

      it 'redirects to new poet path' do
        expect(response).to redirect_to new_poet_path
      end
    end
  end

  describe 'PUT #snap' do
    let(:poem) { FactoryGirl.create(:poem) }
    let(:poet) { FactoryGirl.create(:poet) }
    let(:action) { put :snap, id: poem.id }

    context 'if user is logged in' do
      before(:each) do 
        session[:poet_id] = poet.id
      end

      context 'if user has not snapped yet' do 
        it 'creates new snap object' do
          put :snap, id: poem.id
          expect(poem.snaps.count).to eq(1)
        end
        it 'adds 1 to snap count' do
          put :snap, id: poem.id
          expect(Poem.find(poem.id).snap_count).to eq(1)
        end
      end

      context 'if user has snapped' do
        before(:each) do
          poet.snaps.create(poem_id: poem.id)
          poem.snap_count += 1
          poem.save
        end

        it 'does not create new snap object' do
          put :snap, id: poem.id
          expect(poem.snaps.count).to be == 1
        end

        it 'does not add to snap count' do
          put :snap, id: poem.id
          expect(poem.snap_count).to be == 1
        end
      end

      it 'redirects to root path' do
        put :snap, id: poem.id
        expect(response).to redirect_to root_path
      end
    end

    context 'if user is not logged in' do
      it 'does not create new snap object' do
        put :snap, id: poem.id
        expect(Snap.all).to be_empty
      end
      it 'does not add to snap count' do
        put :snap, id: poem.id
        expect(poem.snap_count).to eq(0)
      end
      it 'redirects to new poet path' do
        put :snap, id: poem.id
        expect(response).to redirect_to new_poet_path
      end
    end
  end

  describe 'PUT #unsnap' do
    let(:poem) { FactoryGirl.create(:poem) }
    let(:poet) { FactoryGirl.create(:poet) }

    context 'if user is logged in' do
      before(:each) do 
        session[:poet_id] = poet.id
      end

      context 'if user has snapped' do
        before(:each) do
          poet.snaps.create(poem_id: poem.id)
          poem.snap_count += 1
          poem.save
        end

        it 'deletes the snap object' do
          put :unsnap, id: poem.id
          expect(poet.snaps.count).to eq(0) 
        end

        it 'subtracts 1 to snap count' do
          put :unsnap, id: poem.id
          expect(Poem.find(poem.id).snap_count).to eq(0)
        end
      end

      context 'if user has not snapped' do
        before(:each) do
          poem.snaps.create(poet_id: 52)
          poem.snap_count += 1
          poem.save
        end 
        it 'does not delete the snap object' do
          put :unsnap, id: poem.id
          expect(poem.snaps).to_not be_empty
        end
        it 'does not subtract 1 to snap count' do
          put :unsnap, id: poem.id
          expect(Poem.find(poem.id).snap_count).to eq(1)
        end
      end

      it 'redirects to root path' do
        put :unsnap, id: poem.id
        expect(response).to redirect_to root_path
      end
    end

    context 'if user is not logged in' do
      before(:each) do
        poet.snaps.create(poem_id: poem.id)
        poem.snap_count += 1
        poem.save
      end

      it 'does not delete the snap object' do
        put :unsnap, id: poem.id
        expect(Snap.all.count).to eq(1)
      end
      it 'does not subtract 1 to snap count' do
        put :unsnap, id: poem.id 
        expect(poem.snap_count).to eq(1)
      end
      it 'redirects to new poet path' do
        put :unsnap, id: poem.id
        expect(response).to redirect_to new_poet_path
      end
    end
  end
end