import json
import os

OUTPUT_PATH = 'data/merged_data.json'

def main():
    data_path = os.path.join(os.getcwd(), 'data', 'scrapers')
    data_file_paths = os.listdir(data_path)
    all_products = []
    for filename in data_file_paths:
        products = []
        path = os.path.join(data_path, filename)
        with open(path) as f:
            products = json.load(f)

        for product in products:
            product['source'] = filename.replace('.json', '')
            all_products.append(product)

        with open(OUTPUT_PATH, 'w') as f:
            json.dump(all_products, f)

if __name__ == '__main__':
    main()
