import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  // include the NEXT_PUBLIC prefix to use 
  // client-side environmental variables
  client: {
  },
  server: {
    QDRANT_URL: z.string().url(),
    QDRANT_API_KEY: z.string().optional(),
    QDRANT_COLLECTION_NAME: z.string().min(1),
    OPENAI_API_KEY:z.string().min(1),
  },
  runtimeEnv: {
    QDRANT_URL: process.env.QDRANT_URL,
    QDRANT_API_KEY: process.env.QDRANT_API_KEY,
    QDRANT_COLLECTION_NAME: process.env.QDRANT_COLLECTION_NAME,
    OPENAI_API_KEY:process.env.OPENAI_API_KEY,
  },
})