import OpenAI from 'openai'

export const openAIClient = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] })
export const OPENAI_EMBEDDING_SETTINGS = {
  model: 'text-embedding-3-small',
  dimensions: 512,
} as const
