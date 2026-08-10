"""
Simple technical SEO audit script.
Fetches each URL from sitemap.xml (or a provided list) and reports:
- HTTP status
- Title
- Meta description
- Canonical link
- Has viewport meta
- H1 presence
Writes results to ./website/seo_audit_report.json
"""
import sys
import json
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

SITEMAP = 'sitemap.xml'
OUT = 'seo_audit_report.json'
UA = {'User-Agent':'CogniSync-SEO-Audit/1.0'}


def read_sitemap(path):
    with open(path,'r') as f:
        txt = f.read()
    # simple loc extraction
    import re
    locs = re.findall(r'<loc>([^<]+)</loc>', txt)
    return locs


def audit_url(url):
    try:
        r = requests.get(url, headers=UA, timeout=12)
    except Exception as e:
        return {'url':url,'status':'error','error':str(e)}
    data = {'url':url,'status':r.status_code}
    if r.status_code >= 400:
        return data
    s = BeautifulSoup(r.text, 'html.parser')
    title = s.title.string.strip() if s.title and s.title.string else ''
    meta_desc = ''
    for m in s.find_all('meta'):
        if m.get('name','').lower()=='description':
            meta_desc = m.get('content','').strip()
    canonical = ''
    link = s.find('link', rel='canonical')
    if link and link.get('href'):
        canonical = link.get('href')
    viewport = any(m.get('name','').lower()=='viewport' for m in s.find_all('meta'))
    h1 = s.find('h1')
    h1_text = h1.get_text().strip() if h1 else ''
    data.update({'title':title,'meta_description':meta_desc,'canonical':canonical,'has_viewport':viewport,'h1':h1_text})
    return data


def main():
    locs = read_sitemap(SITEMAP)
    report = []
    for u in locs:
        print('Auditing',u)
        report.append(audit_url(u))
    with open(OUT,'w') as f:
        json.dump(report,f,indent=2)
    print('Wrote',OUT)

if __name__=='__main__':
    main()
