import { z } from 'zod';

const BoardSchema = z.object({
  id: z.string().uuid(), // Unique
  name: z.string().nonempty(),
  description: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

type Board = z.infer<typeof BoardSchema>;

export { BoardSchema, Board };
