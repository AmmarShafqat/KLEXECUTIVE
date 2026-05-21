import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL
if (!endpoint) {
  // Surface a loud error during dev rather than failing silently at request time.
  // The check is intentionally not throwing on the server side at module load
  // because Next.js evaluates this during build; instead we error on first use.
  if (typeof window !== 'undefined') {
    console.error(
      'NEXT_PUBLIC_GRAPHQL_URL is not set. The frontend cannot reach the backend until you set it in .env.',
    )
  }
}

export const ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG ?? 'klexec-executive'

export function getClient(): GraphQLClient {
  if (!endpoint) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_URL is required')
  }
  return new GraphQLClient(endpoint, {
    credentials: 'include',
    headers: {
      'x-org-slug': ORG_SLUG,
    },
  })
}
