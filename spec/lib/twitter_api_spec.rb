require 'spec_helper'

describe TwitterAPI do
  let(:twitterapi) { TwitterAPI.new(1234567, 89191938) }
  let(:content) { FactoryGirl.attributes_for(:poem)[:content] }
  
  describe 'initialize' do
    it 'should create a new twitter client' do
      expect(twitterapi.client).to be_kind_of(Twitter::Client)
    end
  end

  describe 'tweet' do
    it 'should call update on client attribute passing content as argument' do
      twitterapi.client.should_receive(:update).with(content)
      twitterapi.tweet(content)
    end
  end
end