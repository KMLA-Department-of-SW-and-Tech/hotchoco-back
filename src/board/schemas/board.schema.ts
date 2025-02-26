import { z } from 'zod';

const BoardSchema = z.object({
  name: z.string().nonempty(), // unique
  admin: z.array(z.string()).optional(), // orgs name as string
  reader: z.array(z.string()).optional(),
  posts: z.array(z.string()).optional(), // Reference to post id
});

type Board = z.infer<typeof BoardSchema>;

export { BoardSchema, Board };
