import { loadBrands } from '../../_shared/loaders/brands'
import { Props } from '../_components/Content'

// TODO: in the future just load brand slug + name and all other details later.
export const loadProps = async (): Promise<Props> => {
  const brands = await loadBrands()

  return {
    brands,
  }
}
