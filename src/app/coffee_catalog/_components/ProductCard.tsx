import type { Product } from '../_types/schema'

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  // TODO: placeholder image for broken images
  return (
    <div className='border rounded py-4 px-8 w-full max-w-[600px] flex'>
      <div>
        <h4 className='font-bold text-lg mb-4'>{product.name}</h4>
        <div className='flex flex-col gap-4'>
          <div>
            {product.description.split('\n').map((line, index) => (
              <p key={`product-${product.name}-desc-${index}`}>{line}</p>
            ))}
          </div>
          <div>
            {product.specifications.split('\n').map((line, index) => (
              <p key={`product-${product.name}-spec-${index}`}>{line}</p>
            ))}
          </div>
          <a href={product.shopify_url} target='_blank' rel='noreferrer'>
            buy on shopify
          </a>
          <b>similarity: {product.similarity}</b>
        </div>
      </div>

      <div>
        <img src={product.image_url} alt={'' ?? `image for ${product.name}`} />
      </div>
    </div>
  )
}
