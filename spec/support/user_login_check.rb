shared_examples_for 'user not logged in' do
  it 'sends an error status' do
    expect(response).to_not be_success
  end

  it 'redirects to new poet path' do
      expect(response).to redirect_to new_poet_path
  end
end