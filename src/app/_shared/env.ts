// NOTE: destructuring from process.env doesn't work, results in undefined
// variables when rerendering components

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export { GOOGLE_MAPS_API_KEY }
