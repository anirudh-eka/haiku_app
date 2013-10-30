require 'spec_helper'

describe PoemsController do

  describe 'GET #index' do

    it 'creates an array of poems sorted by positive update' do
      poems_arr = FactoryGirl.create_list(:poem, 5)
      poems_arr[3].update_attributes!(snap_count: poems_arr[3].snap_count + 1)
      poems_arr[2].update_attributes!(snap_count: poems_arr[2].snap_count - 1)
      
      JSON.parse(poems_arr.to_json)
      get :index, :format => :json

      expect(response).to be_success
      expect(json).to eq(JSON.parse(Poem.order("positive_update ASC").to_json))
    end

  end

  describe 'POST #create' do
    
    let(:nil_content) { {content: nil} }
    let(:new_poem_attributes) {FactoryGirl.attributes_for(:poem)}
    let(:wrong_params) {post :create, poem: (nil_content), :format => :json}
    let(:correct_params) {post :create, poem: (new_poem_attributes), :format => :json}
    let(:twitter_client) {double("twitter client", tweet: true)}

    context 'when user is logged in' do
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

    context 'when user is not logged in' do
      before { correct_params }
      it_behaves_like 'failed poem creation'
      it_behaves_like 'user not logged in'
    end
  end

  describe 'PUT #update' do
    let(:poem) { FactoryGirl.create(:poem) }
    let(:correct_params) {put :update, poem: new_poem_attributes, id: poem, :format => :json}
    let(:new_poem_attributes) do
      new_attributes = FactoryGirl.attributes_for(:poem)
      new_attributes[:content] = "something else"
      new_attributes
    end
    let(:invalid_attributes) do
      invalid_attributes = FactoryGirl.attributes_for(:poem)
      invalid_attributes[:content] = ""
      invalid_attributes
    end
    
    context 'when user is logged in' do
      before(:each) do
        basho = FactoryGirl.create(:poet)       
        session[:poet_id] = basho.id
      end

      context 'when user is the author' do
        before(:each) do
          basho = Poet.find(session[:poet_id])
          basho.poems << poem
        end

        context 'when new attributes are valid' do
          before { correct_params }
          it_behaves_like 'successful poem update' do
            let(:new_attributes) { new_poem_attributes }
            let(:model) { poem }          
          end
        end

        context 'when new attributes are invalid' do
          before { put :update, poem: invalid_attributes, id: poem, :format => :json}
          it_behaves_like 'failed poem update' do
            let(:new_attributes) { invalid_attributes }
            let(:model) { poem }          
          end
          it 'sends an error' do
            expect(response).to_not be_success
          end
        end 
      end

      context 'when user is not the author' do
        before { correct_params }
        it_behaves_like 'failed poem update' do
          let(:new_attributes) { new_poem_attributes }
          let(:model) { poem }          
        end
      end
    end

    context 'when user is not logged in' do
      before { correct_params }
      it_behaves_like 'failed poem update' do
        let(:new_attributes) { new_poem_attributes }
        let(:model) { poem }
      end
      it_behaves_like 'user not logged in'
    end
  end
end