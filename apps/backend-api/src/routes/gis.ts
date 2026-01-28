import express from 'express';
import { ObjectId } from 'mongodb';
import { esClient, ES_LOCATIONS_INDEX } from '../config/elasticsearch';
import { getLocationsCollection } from '../models/Location';

const router = express.Router();

const parseNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

router.get('/locations', async (req, res, next) => {
  try {
    const { type, status, limit } = req.query;
    const collection = getLocationsCollection();
    const filter: Record<string, string> = {};
    if (typeof type === 'string' && type) {
      filter.type = type;
    }
    if (typeof status === 'string' && status) {
      filter.status = status;
    }

    const locations = await collection
      .find(filter)
      .sort({ updatedAt: -1 })
      .limit(parseNumber(limit, 25))
      .toArray();

    res.json({ locations });
  } catch (error) {
    next(error);
  }
});

router.get('/locations/search', async (req, res, next) => {
  try {
    const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!query) {
      res.json({ total: 0, results: [] });
      return;
    }

    const result = await esClient.search({
      index: ES_LOCATIONS_INDEX,
      query: {
        multi_match: {
          query,
          fields: ['name^3', 'type', 'status', 'region', 'tags', 'notes'],
        },
      },
      size: 10,
    });

    const hits = result.hits.hits.map((hit) => ({
      id: hit._id,
      ...(hit._source as Record<string, unknown>),
    }));

    res.json({ total: result.hits.total, results: hits });
  } catch (error) {
    next(error);
  }
});

router.post('/locations', async (req, res, next) => {
  try {
    const { name, type, status, region, latitude, longitude, tags, notes } = req.body;

    if (!name || !type || !status || !region) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    const now = new Date();
    const location = {
      name,
      type,
      status,
      region,
      coordinates: {
        latitude: parseNumber(latitude, 0),
        longitude: parseNumber(longitude, 0),
      },
      tags: Array.isArray(tags)
        ? tags.map((tag) => String(tag)).filter(Boolean)
        : String(tags || '')
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
      notes,
      createdAt: now,
      updatedAt: now,
    };

    const collection = getLocationsCollection();
    const insertResult = await collection.insertOne(location);

    await esClient.index({
      index: ES_LOCATIONS_INDEX,
      id: insertResult.insertedId.toString(),
      document: {
        name: location.name,
        type: location.type,
        status: location.status,
        region: location.region,
        coordinates: location.coordinates,
        tags: location.tags,
        notes: location.notes,
        createdAt: location.createdAt,
        updatedAt: location.updatedAt,
      },
    });

    res.status(201).json({
      id: insertResult.insertedId,
      ...location,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/insights', async (req, res, next) => {
  try {
    const collection = getLocationsCollection();
    const [total, byStatus, byType] = await Promise.all([
      collection.countDocuments(),
      collection
        .aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
        .toArray(),
      collection
        .aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }])
        .toArray(),
    ]);

    res.json({
      total,
      byStatus: byStatus.map((entry) => ({ status: entry._id, count: entry.count })),
      byType: byType.map((entry) => ({ type: entry._id, count: entry.count })),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/locations/:id', async (req, res, next) => {
  try {
    const collection = getLocationsCollection();
    const location = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!location) {
      res.status(404).json({ message: 'Location not found' });
      return;
    }
    res.json({ location });
  } catch (error) {
    next(error);
  }
});

export default router;
