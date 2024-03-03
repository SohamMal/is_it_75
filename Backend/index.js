const express=require('express');
const cors=require('cors');
const { ValidUser }=require('./Middlewares/ValidUser');
const {Users, Subjects, AttendanceList}=require('./Models/db');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const { secret } = require('./secret/config');
const app=express();

const port=3000;

app.use(express.json());
app.use(cors());

app.post('/signin', async (req, res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const response=await Users.findOne({
        username,
        password
    });
    
    if(response){
        const jwtToken=jwt.sign({
            user_id:response._id
        }, secret);

        const token="Bearer "+jwtToken;
        res.status(200).json({
            msg:"Logged In",
            token
        })
    }else{
        res.status(404).json({
            msg:"User Not Found"
        })
    }
});

app.post('/signup', async (req, res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const response=await Users.findOne({
        username,
    });
    if(response){
        res.status(409).json({
            msg:"User Already Exists"
        })
    }else{
        try{
            const user=await Users.create({
                username,
                password
            });
            const jwtToken=jwt.sign({
                user_id:user._id
            }, secret);

            const token="Bearer "+jwtToken;
            res.status(200).json({
                msg:"User Created",
                token
            });

        }catch(e){
            res.status(500).json({
                msg:`Error ${e}`
            })
        }
    }
});

app.post('/addclass', ValidUser, async (req, res)=>{
    const userId_string=req.user_id;
    const user_id=new mongoose.Types.ObjectId(userId_string);
    console.log(user_id);
    const subject_name=req.body.subject_name;
    const subject=await Subjects.findOne({
        subject_name
    })
    const subject_id=subject._id;
    const date=req.body.date;
    const present=req.body.present;

    try{
        const newClass=await AttendanceList.create({
            user_id,
            date,
            subject_id,
            present
        })
        res.status(200).json({
            msg:`${subject_name} Class Added`
        })

    }catch(e){
        res.status(500).json({
            msg:`Error`
        })
    }
});

app.get('/percentage', ValidUser, async (req, res)=>{
    const userId_string=req.user_id;
    const user_id=new mongoose.Types.ObjectId(userId_string);
    console.log(user_id);
    const subject_name=req.query.subject_name;
    const subject=await Subjects.findOne({
        subject_name
    });
    const subject_id=subject._id;

    const result=await AttendanceList.aggregate([
        {
            $match: {
                user_id,
                subject_id
            }
        },
        {
            $count : "Count"
        }
    ]);

    if (result.length === 0) {
        return res.status(200).json({
            percentage: 0
        });
    }

    const totalClassCount=result[0].Count;

    const result1=await AttendanceList.aggregate([
        {
            $match: {
                user_id,
                subject_id,
                present:true
            }
        },
        {
            $count : "Count"
        }
    ]);

    if (result1.length === 0) {
        return res.status(200).json({
            percentage: 0 
        });
    }

    const totalPresent=result1[0].Count;

    const percentage=((totalPresent/totalClassCount)*100).toFixed(2);
    
    res.status(200).json({
        percentage
    });
});


app.get('/viewall', ValidUser, async (req, res)=>{
    const userId_string=req.user_id;
    const user_id=new mongoose.Types.ObjectId(userId_string);
    const subject_name=req.query.subject_name;
    const subject=await Subjects.findOne({
        subject_name
    })
    const subject_id=subject._id;
    const list=await AttendanceList.find({
        user_id,
        subject_id,
    })

    const finalList=list.map(e=>{
        return {
            subject_name,
            date:e.date,
            present:e.present
        }
    })

    res.status(200).json({
        finalList
    })
});

app.delete('/delete', ValidUser, async (req, res)=>{
    const subject_name=req.body.subject_name;
    const present=req.body.present;
    const date=req.body.date;
    const subject=await Subjects.findOne({
        subject_name
    });
    const subject_id=subject._id;
    const userId_string=req.user_id;
    const user_id=new mongoose.Types.ObjectId(userId_string);
    try{
        const deleted=await AttendanceList.deleteMany({
            subject_id,
            user_id,
            date,
            present
        })
        if(deleted){
            res.status(200).json({
                msg:"Deleted Successfully"
            })
        }else{
            res.status(403).json({
                msg:'Check Inputs'
            })
        }
    }catch(e){
        res.status(500).json({
            msg:"Interval Server Error"
        })
    }
})

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})