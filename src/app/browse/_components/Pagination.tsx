interface Props {
  currentPage: number
  maxPages: number
  onChangePage: (newPage: number) => void
}

const disabledClass = 'pointer-events-none cursor-not-allowed no-underline text-zinc-400'

export const Pagination = ({ currentPage, maxPages, onChangePage }: Props) => {
  if (maxPages <= 1) {
    return
  }

  return (
    <div className='flex gap-4'>
      <a
        href='#'
        className={currentPage === 1 ? disabledClass : undefined}
        onClick={(e) => {
          e.preventDefault()
          onChangePage(Math.max(currentPage - 1, 0))
        }}
      >
        back
      </a>
      <p className='mx-6'>
        page {currentPage} of {maxPages}
      </p>
      <a
        href='#'
        className={currentPage === maxPages ? disabledClass : undefined}
        onClick={(e) => {
          e.preventDefault()
          onChangePage(Math.min(currentPage + 1, maxPages))
        }}
      >
        next
      </a>
    </div>
  )
}
