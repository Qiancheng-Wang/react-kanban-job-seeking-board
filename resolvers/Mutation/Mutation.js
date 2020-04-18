const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

const Mutation = {
  Mutation: {
    signUp: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });

      if (user) {
        throw new Error("User Exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await new User({
        username,
        password: hash,
        email,
      }).save();

      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },

    signIn: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("User Not Exist");
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error("Password incorrect");
      }

      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    addJob: async (
      root,
      { title, company, role_level, skill_set, job_description, created_id },
      { Job }
    ) => {
      const newJob = await new Job({
        title,
        company,
        role_level,
        skill_set,
        job_description,
        created_id,
      }).save();
      return newJob;
    },
  },
};

exports.Mutation = Mutation;
