import { db } from "../db.js"
import jwt from 'jsonwebtoken'
import moment from 'moment'



export const getLikes = (req,res)=>{
    const q = "SELECT userId FROM likes WHERE postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(like=>like.userId));
    });
}

export const addLike = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)"
        const values = [
            userInfo.id,
            req.body.postId
        ]
        db.query(q, [values], (err, data) => {
            if (err) console.log(err)
            return res.status(200).json("Like has been added successfully");
        })
    })

}

export const deleteLike = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        const q = "DELETE FROM likes WHERE userId=? AND postId= ? "
        db.query(q, [userInfo.id,req.query.postId], (err, data) => {
            if (err) return res.staus(500).json(err)
            return res.status(200).json("like removed");
        })
    })

}


