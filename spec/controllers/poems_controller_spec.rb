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
      it_behaves_like 'user not logged in'
    end
  end

  describe 'PUT #update' do
    let(:poem) { FactoryGirl.create(:poem) }
    let(:new_poem_attributes) {FactoryGirl.attributes_for(:poem)[:content] = "something else"}

    before(:each) do
      poem
      put :update, poem: new_poem_attributes, id: poem, :format => :json
    end
    
    context 'if user is not logged in' do
      it_behaves_like 'failed poem update'
      it_behaves_like 'user not logged in'
    end
  end
end