require 'spec_helper'

describe "Root" do
  it "has title" do 
    visit root_url
    page.should have_content "HaiCoup"
  end

  context "if user is not logged in" do
    it "should have login link" do 
      visit root_url
      page.should have_link "Sign In with Twitter"
    end
  end

  context "if user is logged in" do
    before(:all) do
      visit root_url
      click_link "Sign In with Twitter"
    end

    it "should have logout link" do
      page.should have_link "Sign Out"  
    end

    it "should have form to write new poem"
  end

  it "should have all poems"
end