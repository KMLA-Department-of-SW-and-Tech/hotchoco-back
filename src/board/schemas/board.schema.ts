import { z } from 'zod';

const BoardSchema = z.object({
  id: z.string().uuid(), // Unique
  name: z.string().nonempty(),
  description: z.string().optional(),
  parentId: z.lazy((): z.ZodString => BoardSchema.shape.id).nullable(),
});

type Board = z.infer<typeof BoardSchema>;

export { BoardSchema, Board };
