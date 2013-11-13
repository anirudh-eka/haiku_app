module PoemsHelper

  def attribute_updated_is_snap_count
    attributes_proposed_to_be_updated == ['snap_count']
  end

  def attributes_proposed_to_be_updated
    @poem = Poem.find(params[:id])
    ans = []
    poem_params.each do |key, value| 
      ans << key if value != @poem[key]
    end
    ans
  end
end