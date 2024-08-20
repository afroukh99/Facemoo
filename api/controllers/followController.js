import { db } from "../db.js"
import jwt from 'jsonwebtoken'
import moment from 'moment'



export const getRelationships = (req, res) => {

    const q = "SELECT followerId FROM relationships WHERE followedId =?"
    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(user=>user.followerId));
    })

}


export const addRelationship = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q = "INSERT INTO relationships (`followerId`,`followedId`) VALUES (?)"
        const values = [
            userInfo.id,
            req.body.userId
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Followed user successfully");
        })
    })

}


export const deleteRelationship = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        const q = "DELETE FROM relationships WHERE `followerId` =? AND `followedId` =? "
        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollowed user successfully");
        })
    })

}

