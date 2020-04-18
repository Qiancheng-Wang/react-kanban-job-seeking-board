const Query = {
  Query: {
    validateService: async (root, args, { Job }) => {
      return await "graphql server connected.";
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      const user = User.findOne({ username: currentUser.username });

      return user;
    },

    getJobsByUserId: async (root, { _id }, { Job }) => {
      const jobs = await Job.find({
        created_id: _id,
      });
      return jobs;
    },
  },
};

exports.Query = Query;
