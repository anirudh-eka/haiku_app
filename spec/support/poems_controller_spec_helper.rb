shared_examples_for 'failed poem creation' do
  it 'does not create a new poem' do
    Poem.all.count.should eq(0)
  end

  it 'does not send content to Twitter' do
    TwitterAPI.stub(:new).and_return(twitter_client)
    expect(twitter_client).to_not have_received(:tweet)
  end

  it 'sends an error' do
    expect(response).to_not be_success
  end
end

shared_examples_for 'failed poem update' do

  it 'does not change contents of poem' do
    expect(new_attributes).to contain_unique_pair_from(model)
  end
end

shared_examples_for 'user not logged in' do
  it 'redirects to new poet path' do
      expect(response).to redirect_to new_poet_path
  end
end
