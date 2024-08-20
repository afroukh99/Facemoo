import { db } from "../db.js"
import jwt from 'jsonwebtoken'
import moment from 'moment'



export const getComments = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q = `SELECT c.*,u.id AS userid,name,profilePic FROM comments c JOIN users u ON c.userId=u.id
                    WHERE c.postId= ? ORDER BY c.createdAt DESC
        `
        db.query(q, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })

}

export const addComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q = "INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?)"
        const values = [
            req.body.desc,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
            req.body.postId
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created successfully");
        })
    })

}