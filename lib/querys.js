const { ObjectId } = require('mongodb');
const { connectDB } = require('./db');
const { errorHandle } = require('./errorHandle');
module.exports = {
  getCourses: async () => {
    let db,
      courses = [];
    try {
      db = await connectDB();
      courses = await db.collection('courses').find().toArray();
    } catch (error) {
      errorHandle(error);
    }
    return courses;
  },
  getCourse: async (_, { id }) => {
    let db, course;
    try {
      db = await connectDB();
      course = await db.collection('courses').findOne({ _id: ObjectId(id) });
    } catch (error) {
      errorHandle(error);
    }
    return course;
  },

  getPeople: async () => {
    let db,
      students = [];
    try {
      db = await connectDB();
      students = await db.collection('students').find().toArray();
    } catch (error) {
      errorHandle(error);
    }
    return students;
  },

  getPerson: async (_, { id }) => {
    let db, course;
    try {
      db = await connectDB();
      course = await db.collection('courses').findOne({ _id: ObjectId(id) });
    } catch (error) {
      errorHandle(error);
    }
    return course;
  },
};
