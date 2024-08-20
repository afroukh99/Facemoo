import { db } from "../db.js"
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'


export const register = (req, res) => {
    //CHECK IF USER EXISTS
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User aleardy exist!")
        if(!validator.isStrongPassword(req.body.password)) 
            return res.status(403).json("Password must be strong!")
        // CREATE NEW USER
        //HASHING PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const query = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.name
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User created successfully!")
        })
    })

}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const isPasswordValid = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordValid) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({ id: data[0].id }, "secretKey")

        const {password, ...others} = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others)
    })

}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };