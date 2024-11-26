from typing import List, Union

class Product:
    def __init__(self,
                 brand: str,
                 title: str,
                 sku: Union[str, None] = None,
                 description: Union[str, None] = None,
                 specifications: Union[str, None] = None,
                 image_url: Union[str, None] = None,
                 shopify_url: Union[str, None] = None,
                 embedding: Union[List[float], None] = None,
                 id: Union[int, None] = None,
                 ) -> None:
        self.brand = brand # NOTE: this is actually roaster
        self.title = title
        self.sku = sku
        self.description = description
        self.specifications = specifications
        self.image_url = image_url
        self.shopify_url = shopify_url
        self.embedding = embedding
        # TODO: while there's no db, we'll set the id this way.
        self.id = id or hash(f"{self.brand}:{self.title}")

    def prepare_embedding_input(self):
        lines = [f"Title: {self.title}", f"Brand: {self.brand}"]

        if self.description:
            lines.append(f"Description: {self.description}")

        if self.specifications:
            lines.append(f"Specifications: {self.specifications or 'N/A'}")

        return '\n\n'.join(lines)

    def to_json(self):
        return {
                k: self._sanitize(v)
                for k,v in self.__dict__.items()
                if k[:1] != '_'
                }

    def _sanitize(self, v):
        if isinstance(v, str):
            return v.strip()

        return v

