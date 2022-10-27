const { connectDB } = require('./db');

module.exports = {
  createCourse: async (root, { input }) => {
    let db;
    let course;
    const defaults = {
      teacher: '',
      topic: '',
    };

    try {
      db = await connectDB();
      course = await db.collection('courses').insertOne({ ...defaults, ...input });
      console.log(course);
      input._id = course.insertedId;
    } catch (error) {
      console.error(error);
    }
    return input;
  },
};
