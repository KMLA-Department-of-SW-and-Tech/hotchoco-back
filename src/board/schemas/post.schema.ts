import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string().nonempty(), // Unique
  author: z.string().nonempty(), // Reference to user uid
  title: z.string(), // if empty, it's a comment
  content: z.string().nonempty(),
  createdAt: z.date().default(() => new Date()),
  comments: z.array(z.string().nonempty()), // Reference to comment(post) id
  reactions: z.array(
    z.enum(['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']),
  ),
});

export type Post = z.infer<typeof PostSchema>;
