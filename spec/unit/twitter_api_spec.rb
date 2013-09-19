# require 'spec_helper'

# describe TwitterAPI do
#   describe '#initialize' do
#     it 'should create new twitter client' do
      
#       fake_client = stub({ update: true })
#       Twitter::Client.stub(:new).and_return(fake_client)

#       api = TwitterAPI.new

#       expect(api.client).to eq fake_client
#     end
#   end

#   describe '#tweet' do
#     it "should send tweet to API" do
#       # Arrange all the preconditions that allow the test to run
#       fake_client = stub({ update: true })
#       Twitter::Client.stub(:new).and_return(fake_client)
#       api = TwitterAPI.new

#       # act, by calling the method under test
#       api.tweet("hi mom")

#       # assert, ensure the conditions have changed how we want them to.
#       expect(fake_client).to have_received(:update).with("hi mom")
#           #the update method has been called on fake_client with"hi mom" as a parameter
#     end
#   end
# end 