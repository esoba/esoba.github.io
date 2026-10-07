FROM ruby:3.3-slim
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libyaml-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN bundle install
EXPOSE 8080
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "8080", "--force_polling"]
