require 'spec_helper'

describe Poem do
  it { should belong_to(:poet) }
  it { should have_many(:snaps) }

  context "title" do
    it "should be no greater than 40 characters" do
      FactoryGirl.build(:poem, title: "h" * 41).should_not be_valid
    end
  end

  context "content" do
    it "should be present" do 
      FactoryGirl.build(:poem, content: nil).should_not be_valid
      FactoryGirl.build(:poem, content: "").should_not be_valid
    end

    it "should be no greater than 140 characters" do
      FactoryGirl.build(:poem, content: "h"*141).should_not be_valid
    end
  end

  context 'snap_count' do
    it 'should not allow for poem count to be less than 0' do
      FactoryGirl.build(:poem, snap_count: -1).should_not be_valid
    end
  end

  context 'positive_update' do
    let(:poem) {FactoryGirl.create(:poem)}

    context 'after poem is created' do
      it 'should equal created_at' do
        expect(poem.positive_update).to eq(poem.created_at)
      end
    end

    context 'after poem count increases' do
      before {poem.update_attributes!(snap_count: poem.snap_count + 1) }
      it 'should equal updated_at' do
        expect(poem.positive_update).to eq(poem.updated_at)
      end
    end

    context 'after poem count decreases' do
      before(:each) { poem.update_attributes!(snap_count: poem.snap_count - 1) }
      it_behaves_like "positive update when snap count doesn't increase"
    end

    context 'after something else changes' do
      before(:each) { poem.update_attributes!(content: poem.content + 'chicka boom') }
      it_behaves_like "positive update when snap count doesn't increase"
    end
  end
end