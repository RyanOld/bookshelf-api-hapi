// assert BookRequest as "any object"
export interface BookRequest extends Record<string, unknown> {
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  reading: boolean;
}

// assert BookStorage as "any object"
export interface BookStorage extends Record<string, unknown> {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;
  insertedAt: Date;
  updatedAt: Date;
}
