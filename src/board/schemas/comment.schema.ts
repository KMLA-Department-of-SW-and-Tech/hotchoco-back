import { z } from 'zod';
import { ReactionSchema } from './reaction.schema';
import { PostSchema } from './post.schema';

export const CommentSchema = z.object({
  id: z.string().uuid(), // Unique
  postId: PostSchema.shape.id,
  parentId: z.lazy((): z.ZodString => CommentSchema.shape.id).nullable(),
  author: z.string().nonempty(), // Reference to user uid. Anonymous user will have a unique id - Anonymous
  content: z.string().nonempty(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
  reactions: ReactionSchema,
});

export type Comment = z.infer<typeof CommentSchema>;
