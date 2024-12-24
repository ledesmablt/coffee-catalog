import json
import re
import requests
from bs4 import BeautifulSoup
from tasks.coffee_catalog.shared.product import Product
from typing import cast, Any

BASE_URL = 'https://plainsight.coffee'
COLLECTION_URL = BASE_URL + '/collections/coffee'
FILENAME = 'data/scrapers/plain_sight.json'
BRAND_NAME = 'Plain Sight'
BLACKLIST_WORDS = [
    'merch box',
    'workshop',
    '1919 chocolate',
]

def load_collection(url: str):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return cast(Any, soup)

def is_blacklist(product_card):
    title = product_card.find('h3')
    if not title:
        return

    title = title.text.lower()
    return any([title.find(word) != -1 for word in BLACKLIST_WORDS])

def get_product_urls(soup):
    current_soup = soup
    product_urls = []
    while True:
        container = cast(Any, current_soup.find('ul', id='product-grid'))
        products = container.find_all('li', class_='grid__item')
        for product_card in products:
            if not is_blacklist(product_card):
                product_urls.append(BASE_URL + product_card.find('a')['href'])

        next_page = current_soup.find('a', attrs={'aria-label': 'Next page'})
        if not next_page:
            break

        res = requests.get(BASE_URL + cast(str, next_page['href']))
        current_soup = BeautifulSoup(res.text, 'html.parser')

    return product_urls

def load_product(product_url):
    res = requests.get(product_url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return parse_product(soup, product_url)

def extract_title(soup):
    h1 = soup.find('h1')
    return h1.text


def extract_description(soup):
    desc = soup.find('div', class_='product__description')
    if not desc or not desc.text.strip():
        return None

    return desc.text.strip()

def extract_specifications(soup):
    section = soup.find('div', class_='custom-section')
    if not section:
        breakpoint()
        return None

    subsections = section.find_all('div', class_='custom-container')
    all_items = []
    for item in subsections:
        label = item.find('h5').text
        value = ', '.join([x.text for x in item.find_all('p') if x.text])
        all_items.append(f"{label}: {value}".capitalize())

    subsections = section.find_all('div', class_='column')
    all_items = []
    for item in subsections:
        label = item.find('h5')
        if not label:
            continue

        label = label.text.capitalize()
        progress = item.find('progress')
        p = item.find('p')
        value = ''
        if progress:
            value = str(int(float(progress.text))) + '%'
        if p:
            value = p.text

        if value:
            all_items.append(f"{label}: {value}")

    return '\n'.join(all_items) or None

def extract_sku():
    # NOTE: nevermind
    return None

def parse_product(soup, shopify_url):
    info_section = soup.find('product-info')
    title = extract_title(info_section)
    description = extract_description(soup)
    specifications = extract_specifications(soup)
    sku = extract_sku()

    media_section = soup.find('div', class_='product__media')
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
    soup = load_collection(COLLECTION_URL)
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

