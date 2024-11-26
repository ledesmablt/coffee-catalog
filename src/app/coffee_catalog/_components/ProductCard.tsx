import type { Product } from '../_types/schema'

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  // TODO: placeholder image for broken or missing images
  return (
    <div className='border rounded py-4 px-8 w-full'>
      <h4 className='font-bold text-lg mb-1'>{product.title}</h4>
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <p className='italic mb-6'>by {product.brand}</p>
          <div className='flex flex-col gap-2'>
            {product.description && (
              <div>
                {product.description.split('\n').map((line, index) => (
                  <p key={`product-${product.id}-desc-${index}`}>{line}</p>
                ))}
              </div>
            )}
            {product.specifications && (
              <div>
                {product.specifications.split('\n').map((line, index) => (
                  <p key={`product-${product.id}-spec-${index}`}>{line}</p>
                ))}
              </div>
            )}
            <a href={product.shopify_url} target='_blank' rel='noreferrer'>
              buy on shopify
            </a>
          </div>
        </div>

        {product.image_url && (
          <div className='max-w-24 md:max-w-[200px]'>
            <img src={product.image_url} alt={'' ?? `image for ${product.id}`} className='object-contain' />
          </div>
        )}
      </div>
    </div>
  )
}
