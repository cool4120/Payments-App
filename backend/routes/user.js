const express = require('express');
const {User,Accounts}= require('../../db')
const router = express.Router();
const jwt = require('jsonwebtoken');
const zod = require('zod');
const authMiddleware = require('../middleware')
const {JWT_SECRET} = require('../config')

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});
router.post('/signup', async (req,res) => {
    try{
        const {success} = signupSchema.safeParse(req.body);

        console.log(`In signUp`,success)
        if(!success){
            return res.status(400).json({
                message:'Invalid input'
            });
        }
        const user = User.findOne({
            username:req.body.username
        })
        if(user._id){
            return res.status(411).json({
                message:'Email Already Exsists'
            });
        }
        const dbUser = await User.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName: req.body.lastName
        })
        const userId = dbUser._id;
    
        const account =  Accounts.create({
            userId:userId,
            balance: 1+Math.random()*1000
        })
    
        const token = jwt.sign({userId},JWT_SECRET);
    
        return res.json({message:'User created successfully',token:token});
    
    } catch(err) {
        console.log(`ERROR:`,err)
    }
    
});


const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signIn', async (req,res) => {
    const body = req.body;
    const {success} = signInSchema.safeParse(req.body);
    if(!success){
        return res.send({
            message:'Invalid input'
        });
    }
    const user = await User.findOne({
        username:body.username,
        password:body.password
    })
    if(!user || !user._id){
        return res.status(411).json({
            message:'Username Doesnt exsist Please SignUp'
        })
    }
    if(user._id){
        const token = jwt.sign({userId:user._id},JWT_SECRET);
        return res.status(200).json({
            token:token,
            message:'user Signed in Successfully'
        })
    }
    // else{
    //     return res.status(411).json({
    //         message:'Username Doesnt exsist Please SignUp'
    //     })
    // }

})


const userUpdateSchema = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()

})
router.put('/',authMiddleware, async (req,res) => {
    const {success} = userUpdateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:'Error in Updating'
        });
    }
    await User.updateOne({
        id:req.userId
    })
    res.json({
        message:'Updated SuccessFully'
    })


})

router.get('/bulk',async (req,res) => {
    const filter = req.query.filter || '';
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },
            {
                lastName:{
                    "$regex":filter
                }

            }
        ]
    })
    if(!users.length){
        return res.send({
            message:'No users Present'
        })
    }
    res.json({
        users: users.map( user => ({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})
module.exports = router;