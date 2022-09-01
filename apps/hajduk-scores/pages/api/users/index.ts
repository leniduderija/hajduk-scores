import prisma from '../../../common/db/prisma';
import { User } from '@hajduk-scores/api-interfaces';

export default async function handle(req, res) {
  const users: User[] = await prisma.user.findMany();
  res.json(users);
}
