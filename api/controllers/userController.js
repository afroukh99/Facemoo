import { db } from "../db.js"
import jwt from 'jsonwebtoken'
import moment from 'moment'



export const getUser = (req, res) => {
    const q = "SELECT * FROM users WHERE id =?"
    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...infos } = data[0]
        return res.status(200).json(infos);
    })

}

export const getUsers = (req, res) => {
    const q = "SELECT * FROM users "
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...infos } = data
        return res.status(200).json(infos);
    })

}


export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in.");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token.")
        console.log( req.body.coverPic,
            req.body.profilepic)
        const q = "UPDATE users SET `email`=?,`name`=?, `coverPic`=? ,`profilepic`=?, `city`=? ,`website`=? WHERE id=? "
        const values = [
            req.body.email,
            req.body.name,
            req.body.coverPic,
            req.body.profilepic,
            req.body.city,
            req.body.website,
            userInfo.id
        ]
        db.query(q, values, (err, data) => {
            if (err) console.log(err)
            if (data.affectedRows > 0) return res.status(200).json("User infos updated successfully");
            return res.status(403).json("You can update only your informations!")
        })
    })

}