import json
import re
import requests
from bs4 import BeautifulSoup
from tasks.coffee_catalog.shared.product import Product
from typing import cast, Any

BASE_URL = 'https://botecentral.com'
COLLECTIONS = [
    BASE_URL + '/collections/basilio-single-origins-and-blends',
    BASE_URL + '/collections/basilio-coffee-to-share'
]
FILENAME = 'data/scrapers/basilio.json'
BRAND_NAME = 'Basilio'
BLACKLIST_WORDS = [
    'gift set',
    'brew set',
    'sampler set',
    'drip set',
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
    product_urls = []
    has_next_page = True
    while has_next_page:
        container = soup.find('div', class_='card-list grid')
        products = container.find_all('div', class_='card critical-clear')
        products = [p for p in products if not is_blacklist(p)]
        for p in products:
            product_urls.append(BASE_URL + p.find('a')['href'])

        # check if has next page
        pagination_section = soup.find('div', class_='pagination')
        next_page_btn = pagination_section.find_all(['a', 'button'], recursive=False)[-1]
        if next_page_btn.name != 'a' or not next_page_btn['href']:
            has_next_page = False
            break

        soup = load_collection(BASE_URL + next_page_btn['href'])

    return product_urls


def load_product(product_url):
    res = requests.get(product_url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return parse_product(soup, product_url)

def extract_description(soup):
    if not soup or not soup.text.strip():
        return None

    # replace <br data-mce-fragment="1"/> with plain <br />
    new_str = re.sub(r'<br\s+[^>]*>', '\n', str(soup))
    new_soup = BeautifulSoup(new_str, 'html.parser')
    # fix spaces and remove duplicate newlines
    return '\n'.join([s for s in new_soup.text.strip().split('\n') if s])

def parse_product(soup, shopify_url):
    info_section = soup.find('div', class_='product__content')
    name = info_section.find('h1').text

    description = extract_description(info_section.find('div', attrs={'itemprop':'description'}))
    # NOTE: specifications is in a table. is it still worth splitting this out? combine into one?
    # example: https://botecentral.com/collections/basilio-single-origins-and-blends/products/robusta-maramag-bukidnon
    specifications = None
    sku = None

    media_section = soup.find('div', class_='product__image-container')
    img = media_section.find('img')
    image_url = 'https:' + img['src'] if img else None

    print(f"parsed product: {name}")
    return Product(
            brand=BRAND_NAME,
            name=name,
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
    for collection_url in COLLECTIONS:
        print(f"loading products for {collection_url}")
        soup = load_collection(collection_url)
        product_urls = get_product_urls(soup)
        for product_url in product_urls:
            product = load_product(product_url)  
            all_products.append(product.to_json())

    save_as_json(all_products)
    print(f"{len(all_products)} products saved from {BRAND_NAME}")

if __name__ == '__main__':
    main()
