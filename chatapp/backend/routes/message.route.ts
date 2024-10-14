import express from "express";
const router = express.Router();


router.get('/login',(_,res)=>{
    res.send('mashaAllah login');
})

export default router;