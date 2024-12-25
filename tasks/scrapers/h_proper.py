import json
import requests
from bs4 import BeautifulSoup
from tasks.shared.product import Product
from typing import cast, Any

BASE_URL = 'https://hproper.com'
COLLECTION_URL = BASE_URL + '/collections/coffee'
FILENAME = 'data/scrapers/h_proper.json'
BRAND_NAME = 'H Proper'
BLACKLIST_WORDS = []

def load_collection(url: str):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return cast(Any, soup)

def is_blacklist(product_card):
    title = product_card.find('p', class_='name_wrapper')
    if not title:
        return

    title = title.text.lower()
    return any([title.find(word) != -1 for word in BLACKLIST_WORDS])

def get_product_urls(soup):
    current_soup = soup
    product_urls = []
    while True:
        container = cast(Any, current_soup.find('div', class_='grid--uniform'))
        products = container.find_all('div', class_='product-grid-item')
        for product_card in products:
            if not is_blacklist(product_card):
                product_urls.append(BASE_URL + product_card.find('a')['href'])

        next_page = current_soup.find('span', class_='next')
        if not next_page:
            break

        res = requests.get(BASE_URL + cast(str, next_page.find('a')['href']))
        current_soup = BeautifulSoup(res.text, 'html.parser')

    return product_urls

def load_product(product_url):
    res = requests.get(product_url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return parse_product(soup, product_url)

def extract_title(soup):
    heading = soup.find('h3')
    return heading.text

def extract_description(soup):
    return None

def extract_specifications(soup):
    desc = soup.find('div', class_='product-description')
    if not desc or not desc.text.strip():
        return None

    return '\n'.join([s.text for s in desc.find_all('p')])

def extract_sku():
    # NOTE: nevermind
    return None

def parse_product(soup, shopify_url):
    info_section = soup.find('div', class_='product__form__wrapper')
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


