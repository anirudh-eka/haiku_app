shared_examples_for "positive update when snap count doesn't increase" do
  it 'positive update should not equal updated at' do
    expect(poem.positive_update).to_not eq(poem.updated_at)
  end

  it 'positive update should still be a date' do
    expect(poem.positive_update).to be_instance_of(ActiveSupport::TimeWithZone)
  end
end