require 'spec_helper'

describe Poet do
  it { should have_many(:poems) }
  it { should have_many(:snaps) }

  context "name" do

    it "should be present" do
      FactoryGirl.build(:poet, name: nil).should_not be_valid
    end

    it "should not be greater than 20 characters" do
      FactoryGirl.build(:poet, name: "h"*21).should_not be_valid
    end
  end

  context "when created with omniauth" do
    let(:name) {{'name' => "Basho"}}
    let(:credentials) { {'token' => 1234567, 'secret' => 890123} }
    let(:auth) {{"provider" => "twitter", "uid" => 123456789, "info" => name, 'credentials' => credentials} }

    it "should have a uid" do
      auth["uid"] = nil
      expect{ Poet.create_with_omniauth(auth) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "should have a provider" do
      auth["provider"] = nil
      expect{ Poet.create_with_omniauth(auth) }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "should have a name" do
      auth["info"]["name"] = nil
      expect{Poet.create_with_omniauth(auth)}.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end