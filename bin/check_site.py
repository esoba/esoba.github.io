"""Check our key routes, retired content, and generated internal links."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

site = Path('_site')
errors = []

class Links(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name not in ('href', 'src') or not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc or not url.path:
                continue
            path = unquote(url.path)
            target = site / path.lstrip('/') if path.startswith('/') else current.parent / path
            if not (target.is_file() or (target / 'index.html').is_file()):
                errors.append(f'{current}: missing {value}')

for route in ['index.html', 'about/index.html', 'resources/index.html', 'blog/index.html', 'feed.xml', 'assets/img/plat.jpg']:
    if not (site / route).is_file():
        errors.append(f'Missing route: {route}')
for route in ['interests', 'background', 'projects']:
    if (site / route).exists():
        errors.append(f'Retired route still published: {route}')
for current in site.rglob('*.html'):
    html = current.read_text()
    Links().feed(html)
    if 'spotify.com' in html or 'a-note-on-imposter-syndrome' in str(current):
        errors.append(f'Retired personal content: {current}')
if errors:
    raise SystemExit('\n'.join(errors))
print('Key routes, internal links, and retired content checks passed.')
