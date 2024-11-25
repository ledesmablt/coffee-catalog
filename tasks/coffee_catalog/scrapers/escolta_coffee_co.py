import json
import re
import requests
from bs4 import BeautifulSoup
from tasks.coffee_catalog.shared.product import Product

BASE_URL = 'https://escoltacoffee.co'
ENTRYPOINT = BASE_URL + '/collections/coffee'
FILENAME = 'data/scrapers/escolta_coffee_co.json'
BRAND_NAME = 'Escolta Coffee Company'

def load_entrypoint():
    res = requests.get(ENTRYPOINT)
    return BeautifulSoup(res.text, 'html.parser')

def get_products(soup):
    # NOTE: there aren't enough products for there to be multiple pages
    container = soup.find('ul', id='product-grid')
    return container.find_all('li')

def load_product(product_card):
    product_url = BASE_URL + product_card.find('div', class_='card__information').find('a')['href']
    res = requests.get(product_url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return parse_product(soup, product_url)

def extract_specifications(soup):
    if not soup or not soup.text.strip():
        return None

    # fix spaces and remove duplicate newlines
    stripped_str = re.sub(r'\xa0', ' ', soup.text.strip())
    return '\n'.join([s for s in stripped_str.split('\n') if s])

def parse_product(soup, shopify_url):
    info_section = soup.find('div', class_='product__info-wrapper')
    name = info_section.find('h1').text

    description = None
    specifications = extract_specifications(info_section.find('div', class_='product__description'))
    sku_match = re.search(r'--(\d+)__', soup.find('product-info')['id'])
    sku = sku_match.group(1) if sku_match else None

    media_section = soup.find('media-gallery')
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
    soup = load_entrypoint()
    products = get_products(soup)
    products = [load_product(product).to_json() for product in products]
    save_as_json(products)
    print(f"{len(products)} products saved from {BRAND_NAME}")

if __name__ == '__main__':
    main()

