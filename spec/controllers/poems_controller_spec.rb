require 'spec_helper'

describe PoemsController do

  
  describe 'GET #index' do
    it 'creates a new poem object' do
      get :index
      assigns(:poem).should be_new_record
    end

    it 'creates an array of all poems' do
      poems_arr = []
      5.times{poems_arr << FactoryGirl.create(:poem)}

      get :index
      assigns(:poems).should eq(poems_arr)
    end
  end

  describe 'POST #create' do
    
    let(:nil_content) { {content: nil} }
    let(:new_poem) {FactoryGirl.attributes_for(:poem)}
    let(:wrong_params) {post :create, poem: (nil_content)}
    let(:correct_params) {post :create, poem: (new_poem)}
    let(:twitter_client) {stub(tweet: true)}

    context 'if user is logged in' do
      before(:each) do
        basho = FactoryGirl.create(:poet)       
        session[:poet_id] = basho.id
      end

      context 'when content is present and does not exceed character count in params' do        
        before { TwitterAPI.stub(:new).and_return(twitter_client) }

        it 'creates a new poem' do
          correct_params
          Poem.all.count.should eq(1)
        end

        it 'sends content to Twitter' do
          
          twitter_client.should_receive(:tweet).with(new_poem[:content])
          correct_params
          end

        it 'redirects to home page' do
          correct_params
          expect(response).to redirect_to root_path
        end
      end

      context 'when content not present in params' do
        before { TwitterAPI.stub(:new).and_return(twitter_client) }

        it 'does not create a new poem' do
          wrong_params
          Poem.all.count.should eq(0)
        end

        it 'does not send content to Twitter' do
          wrong_params

          expect(twitter_client).to_not have_received(:tweet)
        end

        it 'redirects to home page' do
          wrong_params
          expect(response).to redirect_to root_path
        end
      end

      context 'when content is over 140 characters' do
        let(:wrong_params) {post :create, poem: ({content: 'h'*141})}

        let(:twitter_client) {stub(tweet: true)}
        before { TwitterAPI.stub(:new).and_return(twitter_client) }

        it 'does not create a new poem' do
          wrong_params
          Poem.all.count.should eq(0)
        end

        it 'does not send content to Twitter' do
          wrong_params

          expect(twitter_client).to_not have_received(:tweet)
        end

        it 'redirects to home page' do
          wrong_params
          expect(response).to redirect_to root_path
        end
      end
    end

    context 'if user is not logged in' do
      it 'does not create a new poem' do
        correct_params
        Poem.all.count.should eq(0)
      end

      it 'does not send content to Twitter' do
        correct_params
        expect(twitter_client).to_not have_received(:tweet)
      end

      it 'redirects to new poet path' do
        correct_params
        expect(response).to redirect_to new_poet_path
      end
    end
  end
end