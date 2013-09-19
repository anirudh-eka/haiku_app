require 'spec_helper'

describe TwitterAPI do

  describe 'initialize' do
    it 'should create a new twitter client' do
      twitterapi = TwitterAPI.new(1234567, 89191938)
      expect(twitterapi.client).to be_kind_of(Twitter::Client)
    end
  end

end