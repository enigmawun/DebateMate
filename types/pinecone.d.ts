// Import the MovieMetadata type from our types.ts file
import { MovieMetadata } from './types';

// The 'declare module' syntax allows us to add new types to an existing module
// Here we're extending the '@pinecone-database/pinecone' module
declare module '@pinecone-database/pinecone' {
  // We're adding a new interface definition to the Index class/interface
  interface Index {
    // This defines the query method with a generic type parameter T
    // By default, T will be MovieMetadata if no other type is specified
    // QueryRequest and QueryResponse are types defined by the Pinecone library
    // 
    // What this actually means:
    // 1. When we call query(), it will return data with MovieMetadata structure by default
    // 2. This helps TypeScript understand that result.matches will contain MovieMetadata
    // 3. Without this, TypeScript thinks the metadata could be any structure (RecordMetadata)
    query<T = MovieMetadata>(args: QueryRequest): Promise<QueryResponse<T>>;
  }
}
