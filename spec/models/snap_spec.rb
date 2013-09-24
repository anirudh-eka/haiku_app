require 'spec_helper'

describe Snap do
  it { should belong_to(:poet) }
  it { should belong_to(:poem) }

  it { should validate_uniqueness_of(:poem_id).scoped_to(:poet_id) }
end