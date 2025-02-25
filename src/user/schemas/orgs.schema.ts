import { z } from 'zod';
import { UserSchema } from './user.schema';

const OrgsSchema = z.object({
  name: z.string(),
  manager: z.array(UserSchema),
  description: z.string(),
});

type Orgs = z.infer<typeof OrgsSchema>;

export { OrgsSchema, Orgs };
