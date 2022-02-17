import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import {
  CurrencyDefinition,
  CurrencyResolver,
  URLTypeDefinition,
  URLResolver,
} from 'graphql-scalars'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  // Custom scalars. See: https://redwoodjs.com/docs/graphql#custom-scalars.
  schemaOptions: {
    typeDefs: [CurrencyDefinition, URLTypeDefinition],
    resolvers: {
      Currency: CurrencyResolver,
      URL: URLResolver,
    },
  },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
