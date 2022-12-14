const { ObjectId } = require('mongodb');
const { connectDB } = require('./db');
const { errorHandle } = require('./errorHandle');

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
      input._id = course.insertedId;
    } catch (error) {
      errorHandle(error);
    }
    return input;
  },

  createPerson: async (root, { input }) => {
    let db;
    let student;

    try {
      db = await connectDB();
      student = await db.collection('students').insertOne({ ...input });
      input._id = student.insertedId;
    } catch (error) {
      errorHandle(error);
    }
    return input;
  },

  editCourse: async (root, { _id, input }) => {
    let db;
    let course;

    try {
      db = await connectDB();
      await db.collection('courses').updateOne({ _id: ObjectId(_id) }, { $set: input });
      course = await db.collection('courses').findOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandle(error);
    }
    return course;
  },

  editPerson: async (root, { _id, input }) => {
    let db;
    let student;

    try {
      db = await connectDB();
      await db.collection('students').updateOne({ _id: ObjectId(_id) }, { $set: input });
      student = await db.collection('students').findOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandle(error);
    }
    return student;
  },
  addPeople: async (root, { courseID, personID }) => {
    let db;
    let person;
    let course;

    try {
      db = await connectDB();

      course = await db.collection('courses').findOne({ _id: ObjectId(courseID) });

      person = await db.collection('students').findOne({ _id: ObjectId(personID) });

      if (!course || !person) throw new Error('no existen los items');

      await db
        .collection('courses')
        .updateOne({ _id: ObjectId(courseID) }, { $addToSet: { people: ObjectId(personID) } });
    } catch (error) {
      errorHandle(error);
    }
    return course;
  },
};
