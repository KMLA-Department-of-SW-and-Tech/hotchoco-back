import { z } from 'zod';
import { UserSchema } from './user.schema';

export const ProfileSchema = z.object({
  uid: UserSchema.shape.uid,
  bio: z.string().optional(),
  profile_image: z.string().optional(),
  cover_image: z.string().optional(),
  socials: z.record(z.string()).optional(),
  major: z.string().optional(),
});
