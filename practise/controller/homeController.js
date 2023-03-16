const User = require("../modals/schema");
const Post = require("../modals/PostSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret_key = "fdfd4545fdfdsgtht";
var test;
module.exports.login = async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, secret_key, {
          expiresIn: "20m",
        });
        test = token;
        return res.json({
          message: true,
          user,
          token,
        });
      } else {
        console.log("passwrd not match");
        return res.json({
          message: false,
        });
      }
    } else {
      console.log("user not find");
      return res.json({
        message: false,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.register = async function (req, res) {
  const { name, email, password, company, confirmPass } = req.body;
  const encryptPassword = await bcrypt.hash(password, 11);
  console.log("crypted", encryptPassword);
  if (password !== confirmPass) {
    return res.json({
      message: false,
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      await User.create({
        name,
        email,
        password: encryptPassword,
        company,
      });
      return res.json({
        message: true,
      });
    } else {
      console.log("already exits");
      return res.json({
        message: false,
      });
    }
  } catch (err) {
    console.log("in catch");
    return res.json({
      message: false,
    });
  }
};

module.exports.dashboard = async function (req, res) {
  const user = await jwt.verify(test, secret_key, (err, res) => {
    if (err) {
      return "expired";
    } else {
      return res;
    }
  });

  if (user == "expired") {
    return res.json({
      message: false,
    });
  }
  console.log("wewewewee", user);
  const userid = user.userId;

  const getUser = await User.findById(userid);
  const getPost = await Post.find({}).populate("user");
  // console.log("all post", getPost);
  if (getUser) {
    return res.json({
      message: true,
      getUser,
      getPost,
    });
  } else {
    return res.json({
      message: false,
    });
  }
};

module.exports.post = async function (req, res) {
  const { content, userId } = req.body;
  const post = await Post.create({
    content,
    user: userId,
  });

  console.log("rererer", post);

  return res.json({
    message: true,
    data: post,
  });
};

module.exports.deletePost = async function (req, res) {
  const postId = req.params.id;
  await Post.findByIdAndDelete(postId);
  const getPost = await Post.find({}).populate("user");
  return res.json({
    message: true,
    getPost,
  });
};
