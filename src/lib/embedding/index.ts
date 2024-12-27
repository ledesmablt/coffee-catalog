import { OPENAI_EMBEDDING_SETTINGS, openAIClient } from './openai'

export const generateEmbedding = async (input: string) => {
  const res = await openAIClient.embeddings.create({
    input,
    ...OPENAI_EMBEDDING_SETTINGS,
  })
  return res.data[0].embedding
}

export const generateEmbeddings = async (input: string[]) => {
  const res = await openAIClient.embeddings.create({
    input,
    ...OPENAI_EMBEDDING_SETTINGS,
  })
  return res.data
}
