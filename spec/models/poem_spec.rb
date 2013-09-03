require 'spec_helper'

describe Poem do
  it { should belong_to(:poet) }
  it { should have_many(:snaps) }

  context "content" do
    it "should be present" do 
      FactoryGirl.build(:poem, content: nil).should_not be_valid
      FactoryGirl.build(:poem, content: "").should_not be_valid
    end

    it "should be no greater than 140 characters" do
      FactoryGirl.build(:poem, content: "h"*141).should_not be_valid
    end
  end
end