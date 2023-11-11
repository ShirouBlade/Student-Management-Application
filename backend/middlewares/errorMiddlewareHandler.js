
const errorMiddlewareHandler = (err, req, res, next) => {
    //set status code

    const errorStatusCode = res.StatusCode === 200 ? 500 :res.StatusCode;

    res.status(errorStatusCode);
    res.json({
        message: err.message,
    });
};

module.exports = {errorMiddlewareHandler}