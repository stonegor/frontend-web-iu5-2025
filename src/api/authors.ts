import type { Author } from './types'
import { AUTHORS_MOCK } from './mock'

export const getAuthors = async (): Promise<Author[]> => {
  try {
    const response = await fetch('/api/authors')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    return AUTHORS_MOCK
  }
}

export const getAuthorById = async (id: number): Promise<Author | undefined> => {
  try {
    const response = await fetch(`/api/authors/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    return AUTHORS_MOCK.find((author) => author.id === id)
  }
}