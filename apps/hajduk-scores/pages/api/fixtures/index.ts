import prisma from '../../../common/db/prisma';
import { ApiFixture } from '@hajduk-scores/api-interfaces';

export default async function handle(req, res) {
  const fixtures: ApiFixture[] = await prisma.fixture.findMany();
  res.json(fixtures);
}
