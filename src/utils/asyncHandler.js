const asyncHandler = (fn) =>{
    return (req,res,next) =>
    {
    Promise.ressolve(fn(req, res, next)).catch(next);
    }
}

export default asyncHandler;