import { z } from 'zod';

export const UserSchema = z.object({
  uid: z.string().nonempty(), // Firebase UID
  email: z.string().email(),
  wave: z.number(),
  student_number: z.number(),
  type: z.enum(['foreigner', 'student', 'graduate']),
  birth_date: z.date(),
  phone: z.string().optional(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  profile_picture: z.string().optional(),
  orgs: z.array(z.string()).optional(), // Reference to orgs name
  major: z.string().optional(),
  instagram_handle: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
