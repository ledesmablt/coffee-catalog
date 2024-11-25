from dotenv import load_dotenv
import json
import os
from openai import OpenAI
from scripts.coffee_catalog.shared.product import Product
from typing import List

load_dotenv()
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
OUTPUT_PATH = 'data/merged_data_with_embeddings.json'

def embedding_settings():
    return {
            'model': 'text-embedding-3-small',
            'dimensions': 256,
            }

# https://platform.openai.com/docs/guides/embeddings

def load_products() -> List[Product]:
    data_path = os.path.join(os.getcwd(), 'data', 'merged_data.json')
    products = []
    with open(data_path) as f:
        products = json.load(f)

    return [Product(**product) for product in products]

# TODO: use the batch api after doing some R&D on what settings work best.
# TODO: this also doesn't account for incremental updates - need a proper db to make it
# easy to work with. otherwise we'll be calling the API on ALL products, even those already
# with embeddings.
def create_embeddings_as_batch(products: List[Product]):
    inputs = [p.prepare_embedding_input() for p in products]
    return client.embeddings.create(input=inputs, **embedding_settings())

# TODO: eventually save this to a vector db instead of a file. ignoring the /data files so
# we don't end up with huge commits.
def write_results(products):
    with open(OUTPUT_PATH, 'w') as f:
        json.dump([product.to_json() for product in products], f)

def main():
    products = load_products()
    print(f"generating embeddings for {len(products)} products...")
    embedding_result = create_embeddings_as_batch(products)
    for i, result in enumerate(embedding_result.data):
        products[i].embedding = result.embedding
    write_results(products)
    print(f"generated embeddings for {len(products)} products")

if __name__ == '__main__':
    main()
