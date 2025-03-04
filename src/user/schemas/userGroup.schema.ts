import { z } from 'zod';
import { UserSchema } from './user.schema';
import { GroupSchema } from './group.schema';

export const UserGroupSchema = z.object({
  uid: UserSchema.shape.uid,
  groupId: GroupSchema.shape.id,
  joinedAt: z.date().default(() => new Date()),
  role: z.enum(['member', 'admin']),
  status: z.enum(['active', 'retired']),
});

export type UserGroup = z.infer<typeof UserGroupSchema>;
