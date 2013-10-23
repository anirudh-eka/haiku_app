shared_examples_for 'failed snap creation' do
  before(:each) {@snap_count = Snap.all.count }

  it 'does not create snap object' do
    action
    expect(Snap.all.count).to eq(@snap_count)
  end

  it 'returns an error' do
    action
    expect(response).to_not be_success
  end
end

shared_examples_for 'successful snap creation' do
  it 'creates snap object' do
    expect(current_user_snaps.count).to eq 1
  end

  it 'sends a successful status' do
    expect(response).to be_success
  end
end

shared_examples_for 'failed snap deletion' do
  before(:each) {@snap_count = Snap.all.count }

  it 'does no delete snap object' do
    action
    expect(Snap.all.count).to eq(@snap_count)
  end
end

shared_examples_for 'successful snap deletion' do
  it 'deletes snap object' do
    expect(current_user_snaps.count).to eq 0
  end

  it 'sends a successful status' do
    expect(response).to be_success
  end
end


def current_user_snaps
  Poet.find(session[:poet_id]).snaps
end