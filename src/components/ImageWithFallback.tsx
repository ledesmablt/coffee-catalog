import { ImgHTMLAttributes, useEffect, useState } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  backgroundColor?: string
}

export const ImageWithFallback = ({ backgroundColor, ...props }: Props) => {
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // when the src changes, reset the error state
    setIsError(false)
  }, [props.src])

  if (isError || !props.src) {
    return (
      <div className='aspect-square bg-zinc-100 flex items-center justify-center'>
        <span className='text-zinc-400'>No image available</span>
      </div>
    )
  }
  return <img style={{ backgroundColor }} {...props} onError={() => setIsError(true)} />
}
