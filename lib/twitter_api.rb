class TwitterAPI
  attr_reader :client

  def initialize(oauth_token, oauth_secret)
    @client = Twitter::Client.new(
      oauth_token: oauth_token,
      oauth_token_secret: oauth_secret
    )
  end

  def tweet(content)
    client.update(content)
  end
end