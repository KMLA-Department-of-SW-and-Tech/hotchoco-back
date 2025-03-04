import { z } from 'zod';

const GroupSchema = z.object({
  id: z.string().uuid(), // unique
  name: z.string().nonempty(),
  description: z.string(),
});

type Group = z.infer<typeof GroupSchema>;

export { GroupSchema, Group };
