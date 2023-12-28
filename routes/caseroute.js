import express from 'express';
import Case from '../models/casemodel.js';
import multer from 'multer';


const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(express.json());


const router = express.Router();
router.post('/addcase',upload.single('image'),(req,res)=>{
    const caseData = {
        name: req.body.name,
        total: req.body.total,
        collected: req.body.collected,
        description: req.body.description,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
    }
    Case.create(caseData).then((cas)=>{
        res.json(cas)
    }).catch((err)=>{
        console.log(err);
    })
})

router.put('/updatecase/:id', async (req, res) => {
    const { total, collected } = req.body;
    try {
        // Create a newNote object
        const newCase = {};
        if (total) { newCase.total = total };
        if (collected) { newCase.collected = collected };

        // Find the note to be updated and update it
        let cas = await Case.findById(req.params.id);
        if (!cas) { return res.status(404).send("Not Found") }

        cas = await Case.findByIdAndUpdate(req.params.id, { $set: newCase }, { new: true })
        res.json({ cas });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/getcase',(req,res)=>{
    Case.find().then((cases)=>{
        res.json(cases)
    }).catch((err)=>{
        console.log(err);
    })
})

router.delete('/deletecase/:id',(req,res)=>{
    Case.findByIdAndDelete(req.params.id).then((cas)=>{
        res.json(cas)
    }).catch((err)=>{
        console.log(err);
    })
})


    

export default router;
