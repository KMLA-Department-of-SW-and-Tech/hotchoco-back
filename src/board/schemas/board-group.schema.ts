import { z } from 'zod';
import { BoardSchema } from './board.schema';
import { GroupSchema } from '../../group/schemas/group.schema';

export const BoardGroupSchema = z.object({
  boardId: BoardSchema.shape.id,
  groupId: GroupSchema.shape.id,
  role: z.enum(['reader', 'writer', 'admin']),
});

export type BoardGroup = z.infer<typeof BoardGroupSchema>;
