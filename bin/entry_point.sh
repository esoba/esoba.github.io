#!/bin/sh
set -eu
exec bundle exec jekyll serve --host 0.0.0.0 --port 8080 --force_polling "$@"
