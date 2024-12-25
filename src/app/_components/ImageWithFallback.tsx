import { ImgHTMLAttributes, useState } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  // fallbackElement?: ReactElement
}

export const ImageWithFallback = (props: Props) => {
  const [isError, setIsError] = useState(false)

  if (isError || !props.src) {
    return (
      <div className='aspect-square bg-zinc-100 flex items-center justify-center'>
        <span className='text-zinc-400'>No image available</span>
      </div>
    )
  }
  return <img {...props} onError={() => setIsError(true)} />
}
