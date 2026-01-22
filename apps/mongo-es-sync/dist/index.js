"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp?replicaSet=rs0';
const ES_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const esClient = new elasticsearch_1.Client({ node: ES_NODE });
async function run() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        // MongoDB Change Stream (Requires Replica Set)
        const db = mongoose_1.default.connection.db;
        if (!db) {
            throw new Error('MongoDB connection successful but db is undefined');
        }
        // Check if the collection exists before watching it
        const collections = await db.listCollections({ name: 'users' }).toArray();
        if (collections.length === 0) {
            await db.createCollection('users');
        }
        const userCollection = db.collection('users');
        const changeStream = userCollection.watch();
        console.log('Watching MongoDB Change Stream for collection "users"...');
        changeStream.on('change', async (change) => {
            console.log('Change detected:', change.operationType);
            if (change.operationType === 'insert') {
                const doc = change.fullDocument;
                await esClient.index({
                    index: 'users',
                    id: doc._id.toString(),
                    document: {
                        username: doc.username,
                        email: doc.email,
                        role: doc.role,
                    },
                });
                console.log(`Indexed user: ${doc.username}`);
            }
            if (change.operationType === 'update') {
                const id = change.documentKey._id.toString();
                const updatedFields = change.updateDescription.updatedFields;
                await esClient.update({
                    index: 'users',
                    id,
                    doc: updatedFields,
                });
                console.log(`Updated user: ${id}`);
            }
            if (change.operationType === 'delete') {
                const id = change.documentKey._id.toString();
                await esClient.delete({
                    index: 'users',
                    id,
                });
                console.log(`Deleted user: ${id}`);
            }
        });
    }
    catch (err) {
        console.error('Sync Service Error:', err);
    }
}
run();
