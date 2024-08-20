import express from 'express'
import cors from 'cors'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import authRouters from './routes/auth.js'
import postRouters from './routes/post.js'
import commentRouters from './routes/comment.js'
import likeRouters from './routes/like.js'
import userRouters from './routes/user.js'
import relationshipsRouters from './routes/follow.js'


const app = express();
const port = 8800

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  //multer
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post('/api/upload',upload.single("file"),(req,res)=> {
  const file =req.file
  return res.status(200).json(file.filename)
})

app.use('/api/auth', authRouters)
app.use('/api/posts', postRouters)
app.use('/api/comments', commentRouters)
app.use('/api/likes', likeRouters)
app.use('/api/users',userRouters)
app.use('/api/relationships',relationshipsRouters)






app.listen(port, () => {
    console.log(`server running on port ${port}..`)
})