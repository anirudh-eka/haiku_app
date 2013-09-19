require 'spec_helper'

describe PoemsController do
  
  describe 'GET #index' do
    it 'creates a new poem object' do
      get :index
      assigns(:poem).should be_new_record
    end

    it 'creates an array of all poems' do
      poems = []
      5.times{poems << FactoryGirl.create(:poem)}

      get :index
      assigns(:all_poems).should eq(poems)
    end
  end

  describe 'POST #create' do
    context 'when content is present and does not exceed character count in params' do
      let(:new_poem) {FactoryGirl.attributes_for(:poem)}
      let(:correct_params) {post :create, poem: (new_poem)}
      
      before { TwitterAPI.stub(:new).and_return(twitter_client) }
      let(:twitter_client) { stub({ tweet: true }) }

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
      let(:nil_content) { {content: nil} }
      let(:wrong_params) {post :create, poem: (nil_content)}

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
end