// Middleware to check if the user has the 'user' role
const checkUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
      return next(); // User is authorized, proceed to the route
    } else {
      return res.status(403).json({ message: 'Access denied' }); // Unauthorized
    }
  };
  
  // Middleware to check if the user has the 'admin' role
  const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next(); // Admin is authorized, proceed to the route
    } else {
      return res.status(403).json({ message: 'Access denied' }); // Unauthorized
    }
  };
  
  // Middleware to check if the user has the 'vendor' role
  const checkVendor = (req, res, next) => {
    if (req.user && req.user.role === 'vendor') {
      return next(); // Vendor is authorized, proceed to the route
    } else {
      return res.status(403).json({ message: 'Access denied' }); // Unauthorized
    }
  };
  
  module.exports = {
    checkUser,
    checkAdmin,
    checkVendor,
  };