from dotenv import load_dotenv
import json
import os
from openai import OpenAI
from typing import List, Union

load_dotenv()
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
OUTPUT_PATH = 'data/merged_data_with_embeddings.json'

def embedding_settings():
    return {
            'model': 'text-embedding-3-small',
            'dimensions': 256,
            }

# https://platform.openai.com/docs/guides/embeddings

# TODO: extract to separate file?
class Product:
    def __init__(self,
                 name: str,
                 description: str,
                 source: str,
                 specifications: Union[str, None]=None,
                 image_url: Union[str, None] = None,
                 shopify_url: Union[str, None] = None,
                 embedding: Union[List[float], None] = None,
                 ) -> None:
        self.name = name
        self.description = description
        self.source = source # NOTE: this is actually roaster
        self.specifications = specifications
        self.image_url = image_url
        self.shopify_url = shopify_url
        self.embedding = embedding

    def prepare_embedding_input(self):
        lines = [
                f"Name: {self.name}",
                f"Description: {self.description}",
                f"Specifications: {self.specifications or 'N/A'}",
                ]
        return '\n\n'.join(lines)

    def to_json(self):
        return {
                'name': self.name,
                'description': self.description,
                'source': self.source,
                'specifications': self.specifications,
                'image_url': self.image_url,
                'shopify_url': self.shopify_url,
                'embedding': self.embedding,
                }

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
    embedding_result = create_embeddings_as_batch(products)
    for i, result in enumerate(embedding_result.data):
        products[i].embedding = result.embedding
    write_results(products)
    print(f"generated embeddings for {len(products)} products")

if __name__ == '__main__':
    main()
