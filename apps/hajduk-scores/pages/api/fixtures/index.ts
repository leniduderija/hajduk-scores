import prisma from '../../../common/db/prisma';
import { ApiFixture } from '@hajduk-scores/api-interfaces';

export default async function handle(req, res) {
  const fixtures: Omit<ApiFixture, 'user'>[] = await prisma.fixture.findMany();
  res.json(fixtures);
}
