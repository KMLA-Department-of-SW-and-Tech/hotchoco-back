import { z } from 'zod';

export enum Reaction {
  Like = 'like',
  Love = 'love',
  Care = 'care',
  Haha = 'haha',
  Wow = 'wow',
  Sad = 'sad',
  Angry = 'angry',
}

export const PostSchema = z.object({
  id: z.string().nonempty(), // Unique
  author: z.string().nonempty(), // Reference to user uid
  title: z.string(), // if empty, it's a comment
  content: z.string().nonempty(),
  createdAt: z.date().default(() => new Date()),
  comments: z.array(z.string().nonempty()), // Reference to comment(post) id
  reactions: z.array(z.nativeEnum(Reaction)),
});

export type Post = z.infer<typeof PostSchema>;
