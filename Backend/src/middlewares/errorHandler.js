export default function errorHandler(err, req, res, next) {
  console.error(err); // log server-side for debugging

  // If controller already set res.status, use that; otherwise default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });

}