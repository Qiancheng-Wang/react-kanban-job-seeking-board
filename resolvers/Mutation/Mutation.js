const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

const Mutation = {
  Mutation: {
    signupUser: async (root, { username, email, password }, { User }) => {
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
  },
};

exports.Mutation = Mutation;
