import json
import re
import requests
from bs4 import BeautifulSoup

BASE_URL = 'https://store.yardstickcoffee.com'
ENTRYPOINT = BASE_URL + '/collections/coffees'
FILENAME = 'data/yardstick.json'

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

def parse_product(soup, shopify_url):
    info_section = soup.find('product-info')
    name = info_section.find('h1').text

    def extract_text(soup):
        # some of the <br>'s are broken or misplaced
        new_str = re.sub(r'<br\s*/?>', '\n', str(soup).replace('</br>', ''))
        new_soup = BeautifulSoup(new_str, 'html.parser')
        return new_soup.text.strip()

    description = extract_text(info_section.find('div', class_='product-content-tab__content'))
    specifications = extract_text(info_section.find('div', class_='product-information-tag__body'))

    media_section = soup.find('div', attrs={'data-product-media-container': True})
    image_src = media_section.find('img')['src']
    image_url = 'https:' + image_src

    # TODO: id
    return {
        'name': name,
        'description': description,
        'specifications': specifications,
        'image_url': image_url,
        'shopify_url': shopify_url,
    }

def sanitize_data(data):
    return {
        key: value.strip() if isinstance(value, str) else value
        for key, value in data.items()
    }

def save_as_json(data):
    with open(FILENAME, 'w') as f:
        json.dump(data, f)

def main():
    soup = load_entrypoint()
    products = get_products(soup)
    parsed_products = [load_product(product) for product in products]
    sanitized_products = [sanitize_data(product) for product in parsed_products]
    save_as_json(sanitized_products)

if __name__ == '__main__':
    main()
