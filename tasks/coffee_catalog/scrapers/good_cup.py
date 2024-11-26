import json
import re
import requests
from bs4 import BeautifulSoup
from tasks.coffee_catalog.shared.product import Product
from typing import cast, Any

BASE_URL = 'https://goodcup.ph'
COLLECTIONS = [
    BASE_URL + '/collections/filter-coffee',
    BASE_URL + '/collections/espresso-roast-beans'
]
FILENAME = 'data/scrapers/good_cup.json'
BRAND_NAME = 'Good Cup Coffee Co.'
BLACKLIST_WORDS = [
    'box of',
    'drip pack',
]

def load_collection(url: str):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return cast(Any, soup)

def is_blacklist(product_card):
    title = product_card.find('div', class_='grid-product__title')
    if not title:
        return

    title = title.text.lower()
    return any([title.find(word) != -1 for word in BLACKLIST_WORDS])

def get_product_urls(soup):
    # NOTE: no pagination
    product_urls = []
    container = soup.find('div', class_='collection-grid')
    products = container.find_all('div', class_='product-grid-item')
    for product_card in products:
        if not is_blacklist(product_card):
            product_urls.append(BASE_URL + product_card.find('a')['href'])

    return product_urls

def load_product(product_url):
    res = requests.get(product_url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return parse_product(soup, product_url)

def extract_title(soup, page_title, shopify_url):
    h1 = soup.find('h1')
    if h1 and h1.text:
        return h1.text

    if page_title:
        # remove trailing " – Good Cup Coffee Co.'
        delimiter = ' – '
        delimiter.join(page_title.split(delimiter)[:-1])

    product_slug = shopify_url.split('/')[-1]
    return product_slug.replace('-', ' ').title()

def extract_description(soup):
    desc = soup.find_all('div', class_='product-block')[1]
    if not desc or not desc.text.strip():
        return None

    return desc.text.strip()

def extract_specifications(soup):
    section = soup.find('div', class_='index-section')
    items = section.find_all('div', class_='grid__item')
    all_items = []
    for item in items:
        children = [c for c in item.children]
        label = children[0].text.strip()
        value = children[1].text.strip()
        all_items.append(f"{label}: {value}")

    return '\n'.join(all_items) or None

def extract_sku(soup):
    section_id = soup.find('div', class_='product-block').get('data-section-id')
    if not section_id:
        return None

    sku_match = re.search(r'--(\d+)__', section_id)
    return sku_match.group(1) if sku_match else None

def parse_product(soup, shopify_url):
    info_section = soup.find('div', class_='product-grid__content')
    title = extract_title(info_section, soup.title.text, shopify_url)
    description = extract_description(info_section)
    specifications = extract_specifications(soup)
    sku = extract_sku(info_section)

    media_section = soup.find('div', class_='product__main-photos')
    img = media_section.find('img')
    image_url = 'https:' + img['src'] if img else None

    print(f"parsed product: {title}")
    return Product(
            brand=BRAND_NAME,
            title=title,
            sku=sku,
            description=description,
            specifications=specifications,
            image_url=image_url,
            shopify_url=shopify_url,
            )

def save_as_json(data):
    with open(FILENAME, 'w') as f:
        json.dump(data, f)

def main():
    print(f"starting {BRAND_NAME}")
    all_products = []
    all_product_urls = set()
    for collection_url in COLLECTIONS:
        print(f"loading products for {collection_url}")
        soup = load_collection(collection_url)
        product_urls = get_product_urls(soup)
        for product_url in product_urls:
            all_product_urls.add(product_url)

    for product_url in sorted(list(all_product_urls)):
        product = load_product(product_url)  
        all_products.append(product.to_json())

    save_as_json(all_products)
    print(f"{len(all_products)} products saved from {BRAND_NAME}")

if __name__ == '__main__':
    main()

