import { z } from 'zod';

const OrgsSchema = z.object({
  name: z.string().nonempty(), // unique
  manager: z.array(z.string().nonempty()), // Reference to user uid
  members: z.array(z.string().nonempty()), // Reference to user uid
  description: z.string(),
});

type Orgs = z.infer<typeof OrgsSchema>;

export { OrgsSchema, Orgs };
