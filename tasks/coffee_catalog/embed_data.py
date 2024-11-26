from dotenv import load_dotenv
import json
import os
from openai import OpenAI
from tasks.coffee_catalog.shared.product import Product
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

def load_products() -> dict[int, Product]:
    data_path = 'data/merged_data.json'
    with open(data_path) as f:
        saved_products = [Product(**p) for p in json.load(f)]

    products_dict = {
        p.id: p
        for p in saved_products
    }

    # assign embedding if exists
    if os.path.exists(OUTPUT_PATH):
        with open(OUTPUT_PATH) as f:
            embedded_list = [Product(**p) for p in json.load(f)]
        
        for p in embedded_list:
            if products_dict.get(p.id):
                products_dict[p.id].embedding = p.embedding

    return products_dict

# TODO: use the batch api after doing some R&D on what settings work best.
def create_embeddings_as_batch(products: List[Product]):
    inputs = [p.prepare_embedding_input() for p in products]
    return client.embeddings.create(input=inputs, **embedding_settings())

# TODO: eventually save this to a vector db instead of a file. ignoring the /data files so
# we don't end up with huge commits.
def write_results(products):
    with open(OUTPUT_PATH, 'w') as f:
        json.dump([product.to_json() for product in products], f)

def main():
    products_dict = load_products()
    products_without_embeddings = [p for p in products_dict.values() if not p.embedding]

    if len(products_without_embeddings) == 0:
        print(f"all {len(products_dict)} products already have embeddings - exiting...")
        return

    print(f"generating embeddings for {len(products_without_embeddings)} products...")
    embedding_result = create_embeddings_as_batch(products_without_embeddings)
    for i, result in enumerate(embedding_result.data):
        product = products_without_embeddings[i]
        product.embedding = result.embedding
        products_dict[product.id] = product

    output = [p for p in products_dict.values()]
    write_results(output)
    print(f"saved embeddings for {len(output)} products")

if __name__ == '__main__':
    main()
