from flask import Flask, render_template, abort, send_from_directory, url_for
import os
from pathlib import Path
import markdown

POSTS_DIR = Path('/home/cbreezy5393/work/cognisync_blog_writer/posts')

app = Flask(__name__, template_folder='templates', static_folder='static')


def list_posts():
    posts = []
    if not POSTS_DIR.exists():
        return posts
    for p in sorted(POSTS_DIR.glob('*.md'), key=lambda p: p.stat().st_mtime, reverse=True):
        title = p.stem
        posts.append({'slug': p.stem, 'path': str(p), 'title': title})
    return posts


@app.route('/')
def home():
    posts = list_posts()
    return render_template('index.html', posts=posts)


@app.route('/posts/<slug>')
def post(slug):
    p = POSTS_DIR / (slug + '.md')
    if not p.exists():
        abort(404)
    text = p.read_text()
    html = markdown.markdown(text, extensions=['fenced_code', 'tables', 'toc'])
    return render_template('post.html', content=html, title=slug)


@app.route('/static/<path:filename>')
def static_files(filename):
    root = os.path.join(os.path.dirname(__file__), 'static')
    return send_from_directory(root, filename)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5005, debug=True)
