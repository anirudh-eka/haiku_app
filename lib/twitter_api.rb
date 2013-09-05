class TwitterAPI
  attr_reader :client

  def initialize(oauth_token, oauth_secret)
    @client = Twitter::Client.new(
      oauth_token: auth[:credentials][:token],
      oauth_token_secret: auth[:credentials][:secret]
    )
  end

  def tweet(content)
    client.update(content)
  end
end