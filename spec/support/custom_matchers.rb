require 'rspec/expectations'

RSpec::Matchers.define :contain_unique_pair_from do |expected|
  match do |actual|
    actual.delete_if { |key, value| expected[key] == value }
    !(actual.empty?)
  end

  failure_message_for_should do |actual|
    "expected '#{actual}' to have a key value pair not included '#{expected}'"
  end
end
