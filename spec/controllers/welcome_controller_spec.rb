require 'spec_helper'

describe WelcomeController do

  describe 'GET #index' do

    it 'creates an array of poems sorted by positive update in ascending order' do
      poems_arr = FactoryGirl.create_list(:poem, 5)
      poems_arr[3].update_attributes!(snap_count: poems_arr[3].snap_count + 1)
      poems_arr[2].update_attributes!(snap_count: poems_arr[2].snap_count - 1)
      get :index, format: :html
      expect(assigns(:poems)).to eq(Poem.order("positive_update ASC"))
    end

    it 'creates an array of poets' do
      poets_arr = FactoryGirl.create_list(:poet, 5)
      get :index, format: :html
      expect(assigns(:poets)).to eq(Poet.all)
    end
  end
end