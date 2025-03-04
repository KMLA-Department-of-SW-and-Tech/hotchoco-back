import { z } from 'zod';

export const UserSchema = z.object({
  uid: z.string().nonempty(), // Firebase UID
  email: z.string().email(),
  wave: z.number(),
  student_number: z.number(),
  type: z.enum(['foreigner', 'student', 'graduate']),
  birth_date: z.date(),
  phone: z.number().optional(), // Phone number (without "-" or " ")
  name: z.string().nonempty(),
});

export type User = z.infer<typeof UserSchema>;
