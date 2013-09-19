require 'spec_helper'

describe Snap do
  it { should belong_to(:poet) }
  it { should belong_to(:poem) }
end