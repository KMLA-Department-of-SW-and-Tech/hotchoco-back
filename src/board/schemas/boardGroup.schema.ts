import { z } from 'zod';
import { BoardSchema } from './board.schema';
import { GroupSchema } from 'src/user/schemas/group.schema';

const BoardGroupSchema = z.object({
  boardId: BoardSchema.shape.id,
  groupId: GroupSchema.shape.id,
  role: z.enum(['user', 'manager']),
});

export type BoardGroup = z.infer<typeof BoardGroupSchema>;
