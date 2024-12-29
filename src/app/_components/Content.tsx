'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Product } from '../_types/schema'
import { ProductGrid } from './ProductGrid'

const PLACEHOLDERS = [
  'sweet and delicate flavors',
  'memories from my childhood',
  'good cup sidamo special',
  'coffee from sitio san roque',
] as const

interface FormValues {
  searchQuery: string
  enableSmartSuggestions: boolean
}

export const Content = () => {
  const placeholder = useMemo(() => {
    // randomized placeholder text
    const index = Math.floor(Math.random() * PLACEHOLDERS.length)
    return PLACEHOLDERS[index]
  }, [])

  const { handleSubmit, register, setValue } = useForm<FormValues>({
    defaultValues: {
      enableSmartSuggestions: true,
    },
  })

  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['/api/products/search', searchQuery],
    enabled: !!searchQuery,
    queryFn: async () => {
      if (!searchQuery) {
        return []
      }

      const res = await fetch(`/api/products/search?${searchQuery}`)
      const { data } = await res.json()
      return data as Product[]
    },
  })

  const onSubmit = handleSubmit((values) => {
    const q = values.searchQuery || placeholder
    const filterType = values.enableSmartSuggestions ? 'similarity' : ''
    const params = new URLSearchParams({ q, filterType })
    // submit the placeholder if it doesn't exist
    if (!values.searchQuery) {
      setValue('searchQuery', q)
    }

    setSearchQuery(params.toString())
  })

  return (
    <>
      <h1 className='text-3xl font-light'>Coffee Catalog</h1>
      <section className='flex flex-col items-center'>
        <form className='flex flex-col items-center mt-4 gap-3' onSubmit={onSubmit}>
          <p className='text-lg'>{"I'm looking for..."}</p>
          <input
            type='text'
            placeholder={placeholder}
            className='w-80 md:w-96 px-4 py-2 border rounded-md border-zinc-500 text-center placeholder:text-center'
            {...register('searchQuery')}
          />
          <button
            type='submit'
            className='px-4 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors'
          >
            search
          </button>
        </form>
      </section>

      <ProductGrid products={data} isLoading={isLoading} />
    </>
  )
}
