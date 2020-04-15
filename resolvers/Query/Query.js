const Query = {
  Query: {
    getAllJobs: async (root, args, { Job }) => {
      return await Job.find();
    },
  },
};

exports.Query = Query;
