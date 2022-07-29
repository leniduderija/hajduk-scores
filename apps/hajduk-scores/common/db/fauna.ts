/* eslint-disable @typescript-eslint/no-var-requires */
import { environment } from '../../environments/environment';

const { Ref } = require('faunadb');
const faunadb = require('faunadb');
const secret = environment.FAUNADB_SECRET;

export const faunaClient = new faunadb.Client({
  secret,
  domain: 'db.eu.fauna.com',
  port: 443,
  scheme: 'https',
});
