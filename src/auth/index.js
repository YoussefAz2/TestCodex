// Placeholder for OAuth and Guest Mode implementation

exports.authenticateGuest = (req, res, next) => {
  // Future guest mode logic
  next();
};

exports.authenticateOAuth = (provider) => (req, res, next) => {
  // Future OAuth logic for provider (Google, Apple, Facebook)
  next();
};
