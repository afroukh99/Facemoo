import { db } from "../db.js"
import jwt from 'jsonwebtoken'
import moment from 'moment'



export const getPosts = (req, res) => {
    const userId = req.query.userId
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q = userId!=="undefined"
            ?
            `SELECT p.*,u.id AS userid,name,profilePic FROM posts p JOIN users u ON p.userId=u.id WHERE p.userId = ?`
            : `SELECT p.*,u.id AS userid,name,profilePic FROM posts p JOIN users u ON (p.userId=u.id)
                    LEFT JOIN relationships r ON r.followedId=p.userId WHERE r.followerId= ? OR p.userid= ?
                    ORDER BY p.createdAt DESC
        `

        const values = userId!=="undefined" ? [userId] : [userInfo.id, userInfo.id]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })

}




export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q =  "DELETE FROM posts WHERE id=?  AND userId=?"
        db.query(q, [req.params.id,userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if(data.affectedRows>0) return res.status(200).json("Post deleted successfully")
            return res.status(403).json("You can delete only your post!")
        })
    })

}


export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q = "INSERT INTO posts (`desc`,`img`,`createdAt` ,`userId`) VALUES (?)"
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created successfully");
        })
    })

}