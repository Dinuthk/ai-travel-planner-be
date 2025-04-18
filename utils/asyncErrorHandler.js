export const asyncErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            res.status(400).json({
                status: "fail",
                message: err.message,
                stackTrace: err.stack,
                isOperational: true,
            });
        });
    };
};
