import { type SchemaTypeDefinition } from 'sanity';

import {author} from "@/sanity/schemaTypes/author";
import {post} from "@/sanity/schemaTypes/post";
import {playlist} from "@/sanity/schemaTypes/playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post, playlist],
}
