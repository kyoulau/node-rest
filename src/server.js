import app from './app'
import mongoose from 'mongoose';

const connectToDatabase = require('./mongo/connection');

connectToDatabase();

app.listen(3333);

