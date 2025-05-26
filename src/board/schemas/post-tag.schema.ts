import { z } from 'zod';

const PostTagSchema = z.object({
  postId: z.string().uuid(), // Reference to post
  tagName: z.string().nonempty(), // Reference to tag
});

type PostTag = z.infer<typeof PostTagSchema>;

export { PostTagSchema, PostTag };
