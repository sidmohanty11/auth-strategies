module.exports.isAuth = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ message: "Unauthorized" });
};

module.exports.isAdmin = (req, res, next) => {
  req.user.admin ? next() : res.status(401).json({ message: "Unauthorized" });
};
