// NOTE: destructuring from process.env doesn't work, results in undefined
// variables when rerendering components

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
export const DATABASE_URL = process.env.DATABASE_URL
export const DATABASE_POOLING_URL = process.env.DATABASE_POOLING_URL
