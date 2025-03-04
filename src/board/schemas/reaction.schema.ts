import { z } from 'zod';

export const ReactionSchema = z.object({
  like: z.number(),
  love: z.number(),
  care: z.number(),
  haha: z.number(),
  wow: z.number(),
  sad: z.number(),
  angry: z.number(),
});

export type Reaction = z.infer<typeof ReactionSchema>;
