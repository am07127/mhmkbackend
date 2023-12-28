import express from 'express';
import Story from '../models/stories.js';
import multer from 'multer';


const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(express.json());


const router = express.Router();
router.post('/addstory',upload.single('image'),(req,res)=>{
    const storyData = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
        url: req.body.url
    }
    Story.create(storyData).then((story)=>{
        res.json(story)
    }).catch((err)=>{
        console.log(err);
    }) 
})

router.get('/getstories',(req,res)=>{
    Story.find().then((stories)=>{
        res.json(stories)
    }).catch((err)=>{
        console.log(err);
    })
})

router.delete('/deletestory/:id',(req,res)=>{
    Story.findByIdAndDelete(req.params.id).then((story)=>{
        res.json(story)
    }).catch((err)=>{
        console.log(err);
    })
})
    

export default router;
