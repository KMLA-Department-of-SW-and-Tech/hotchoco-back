import { z } from 'zod';
import { ReactionSchema } from './reaction.schema';
import { BoardSchema } from './board.schema';

export const PostSchema = z.object({
  id: z.string().uuid(), // Unique
  boardId: BoardSchema.shape.id,
  author: z.string().nonempty(), // Reference to user Firebase uid. Anonymous user will have a unique id - Anonymous
  title: z.string(), // if empty, it's a comment
  content: z.string().nonempty(),
  images: z.array(z.string()), // Reference to image id
  files: z.array(z.string()), // Reference to file id
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
  reactions: ReactionSchema,
});

export type Post = z.infer<typeof PostSchema>;
