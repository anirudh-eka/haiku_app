require 'spec_helper'

describe "Root", :js => true, integration: true do

  let(:new_poem) { FactoryGirl.create(:poem) }
  let(:new_poet) { FactoryGirl.create(:poet) }
  before(:each) { visit root_path }

  it "has title" do 
    page.should have_content "HaiCoup"
  end

  context "if user is not logged in" do
    it "should have login link" do   
      page.should have_link "Sign In with Twitter"
    end

    it "should not have form to write new poem" do 
      page.should_not have_field "Title"
      page.should_not have_field "Content"
      page.should_not have_button "Create Poem"
    end
  end

  context "if user is logged in" do
    before(:each) do  
      click_link "Sign In with Twitter"
    end

    it "should have logout link" do
      page.should have_link "Sign Out"  
    end

    it "should have form to write new poem" do
      page.should have_field "Title"
      page.should have_field "Content"
      page.should have_button "Create Poem"
    end

    context "when click create poem" do
      let(:poem_title) { 'A monk sips morning tea' }
      let(:too_much_poem_content) { 'h'*141 }
      before(:each) do
        fill_in 'Title', with: poem_title
      end

      it "should display error if content field is empty and preserve text of field that have been filled" do
        click_button "Create Poem"
      
        page.should have_content "What is a poem without words?"
        find_field('Title').value.should eq(poem_title)
      end

      it "should display error if content field is too long and preserve text of field that have been filled" do
        fill_in 'Content', with: too_much_poem_content
        click_button "Create Poem"

        page.should have_content "Words are like light, enough can give you sight, too much can make you blind"
        find_field('Title').value.should eq(poem_title)
        find_field('Content').value.should eq(too_much_poem_content)
      end

      it "should display success message if content is correct length" do
        fake_TwitterAPI_obj = double({ tweet: true })
        TwitterAPI.stub(:new).and_return(fake_TwitterAPI_obj)

        fill_in 'Content', with: "A monk sips morning tea\n it's quiet\n the chrysanthemum's flowering."
        click_button "Create Poem"
        page.should have_content "Your word is a sun, when you let it go, it joins the stars"
      end
    end
  end

  context "if poems exist" do
    before do
      new_poet.poems << new_poem
      visit root_path
    end

    it "should list all poems" do
      page.should have_content new_poem.title
      page.should have_content new_poem.content
      page.should have_content new_poem.poet.name
    end 
  end

  context "if poems don't exist" do
    it "should return a haiku of poems missing" do
      page.should have_content "The poems are gone"
      page.should have_content "To revive the tradition"
      page.should have_content "Please sign in and share"
    end
  end
end