import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';

export const ES_LOCATIONS_INDEX = process.env.ES_LOCATIONS_INDEX || 'gis-locations';

export const esClient = new Client({
  node: ELASTICSEARCH_NODE,
});
