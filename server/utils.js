import jwt from 'jsonwebtoken';


export const generateToken = (user) => {
    return jwt.sign(        {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        },

        process.env.SECRET_KEY,
        {
            expiresIn: '30d',
        }
    );
};

export const isAuth = (req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }
    else{
        res.status(403).json({message:"Token has been invalid, or expired"})
    }
}