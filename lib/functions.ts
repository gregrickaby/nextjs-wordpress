import {GraphQLResponse} from '@/lib/types'

/**
 * Function to execute a GraphQL query.
 */
export async function fetchGraphQL<T = any>(
  query: string,
  variables: object = {}
): Promise<GraphQLResponse<T>> {
  // If there is no URL, throw an error.
  if (!process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL) {
    throw new Error('Missing WordPress URL environment variable')
  }

  // Fetch data from external API.
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables
        }),
        next: {
          tags: ['posts']
        }
      }
    )

    // If the response status is not 200, throw an error.
    if (!response.ok) {
      console.error('Response Status:', response.status)
      throw new Error(response.statusText)
    }

    // Read the response as JSON.
    const data = await response.json()

    // Throw an error if there was a GraphQL error.
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      throw new Error('Error executing GraphQL query')
    }

    // Finally, return the data.
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
