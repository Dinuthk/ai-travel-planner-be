import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    const token = jwt.sign( payload , "mykey")
    return token;
};

export const decodeToken = (token) => {
    const payload = jwt.decode(token);
    return payload;
};

export const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, "mykey");
        return payload;
    } catch (error) {
        console.log(error);
        return false;
    }
}