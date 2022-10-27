const { ObjectId } = require('mongodb');
const { connectDB } = require('./db');

module.exports = {
  getCourses: async () => {
    let db,
      courses = [];
    try {
      db = await connectDB();
      courses = await db.collection('courses').find().toArray();
    } catch (error) {
      console.error(error);
    }
    return courses;
  },
  getCourse: async (_, { id }) => {
    let db, course;
    try {
      db = await connectDB();
      course = await db.collection('courses').findOne({ _id: ObjectId(id) });
    } catch (error) {
      console.error(error);
    }
    return course;
  },
};
