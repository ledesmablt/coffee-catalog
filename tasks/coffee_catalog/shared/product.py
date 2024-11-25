from typing import List, Union

class Product:
    def __init__(self,
                 brand: str,
                 name: str,
                 sku: Union[str, None] = None,
                 description: Union[str, None] = None,
                 specifications: Union[str, None] = None,
                 image_url: Union[str, None] = None,
                 shopify_url: Union[str, None] = None,
                 embedding: Union[List[float], None] = None,
                 id: Union[int, None] = None,
                 ) -> None:
        self.brand = brand # NOTE: this is actually roaster
        self.name = name
        self.sku = sku
        self.description = description
        self.specifications = specifications
        self.image_url = image_url
        self.shopify_url = shopify_url
        self.embedding = embedding
        # TODO: while there's no db, we'll set the id this way.
        self.id = id or hash(f"{self.brand}:{self.name}")

    def prepare_embedding_input(self):
        lines = [f"Name: {self.name}"]

        if self.description:
            lines.append(f"Description: {self.description}")

        if self.specifications:
            lines.append(f"Specifications: {self.specifications or 'N/A'}")

        return '\n\n'.join(lines)

    def to_json(self):
        return { k:v for k,v in self.__dict__.items() if k[:1] != '_'}
