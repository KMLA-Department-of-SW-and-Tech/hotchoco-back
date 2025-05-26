import { z } from 'zod';

const TagSchema = z.object({
  name: z.string().nonempty(), // Tag name (serves as identifier)
  boardId: z.string().uuid(), // Reference to board
});

type Tag = z.infer<typeof TagSchema>;

export { TagSchema, Tag };
