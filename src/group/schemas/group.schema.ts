import { z } from 'zod';

export const GroupSchema = z.object({
  id: z.string().uuid(), // unique
  name: z.string().nonempty(),
  description: z.string(),
});

export type Group = z.infer<typeof GroupSchema>;
