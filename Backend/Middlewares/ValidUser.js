const jwt=require('jsonwebtoken');
const {secret}=require('../secret/config')
const ValidUser=(req, res, next)=>{
    const token=req.headers.token;

    const arr=token.split(" ");

    const jwtToken=arr[1];

    try{
        const value = jwt.verify(jwtToken, secret);
        if (value) {
            req.user_id = value.user_id;
            next();
        } else {
            res.status(403).json({ msg: "Not Signed In" });
        }
    }catch(e){
        res.status(403).json({
            msg:`Not Signed In`
        })
    }
}

module.exports={
    ValidUser
}
