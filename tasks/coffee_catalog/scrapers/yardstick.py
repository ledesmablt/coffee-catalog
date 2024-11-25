import json
import re
import requests
from bs4 import BeautifulSoup
from tasks.coffee_catalog.shared.product import Product

BASE_URL = 'https://store.yardstickcoffee.com'
ENTRYPOINT = BASE_URL + '/collections/coffees'
FILENAME = 'data/scrapers/yardstick.json'
BRAND_NAME = 'Yardstick'

def load_entrypoint():
    res = requests.get(ENTRYPOINT)
    return BeautifulSoup(res.text, 'html.parser')

def get_products(soup):
    # NOTE: there aren't enough products for there to be multiple pages
    container = soup.find('div', id='ShopProducts')
    return container.find_all('product-card')

def load_product(product_card):
    product_url = BASE_URL + product_card['data-url']
    res = requests.get(product_url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return parse_product(soup, product_url)

def extract_text(soup):
    # some of the <br>'s are broken or misplaced
    new_str = re.sub(r'<br\s*/?>', '\n', str(soup).replace('</br>', ''))
    new_soup = BeautifulSoup(new_str, 'html.parser')
    return new_soup.text.strip()

def parse_product(soup, shopify_url):
    info_section = soup.find('product-info')
    name = info_section.find('h1').text

    description = extract_text(info_section.find('div', class_='product-content-tab__content'))
    specifications = extract_text(info_section.find('div', class_='product-information-tag__body'))
    sku = info_section.find('product-form')['data-product-id']

    media_section = soup.find('div', attrs={'data-product-media-container': True})
    image_src = media_section.find('img')['src']
    image_url = 'https:' + image_src

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

def sanitize_data(data: dict):
    return {
        key: value.strip() if isinstance(value, str) else value
        for key, value in data.items()
    }

def save_as_json(data):
    with open(FILENAME, 'w') as f:
        json.dump(data, f)

def main():
    print(f"starting {BRAND_NAME}")
    soup = load_entrypoint()
    products = get_products(soup)
    parsed_products = [load_product(product) for product in products]
    sanitized_products = [sanitize_data(product.to_json()) for product in parsed_products]
    save_as_json(sanitized_products)
    print(f"{len(sanitized_products)} products saved from {BRAND_NAME}")

if __name__ == '__main__':
    main()
