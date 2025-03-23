const User =require("../Model/UserModel");

//display
const getAllUsers=async(req,res,next)=>{
    let users;

    try{
        users=await User.find();

    }catch(err){
        console.log(err);
    }

    //not found
    if(!users){
        return res.status(404).json({Message:"User not found"})
    }

    //display all users
    return res.status(200).json({users});
};

//data insert
const addUsers=async(req,res,next)=>{

    const{name,gmail,age,address}=req.body

    let users;

    try{
        users=new User({name,gmail,age,address});
        await users.save();
    }catch(err){
        console.log(err);
    }

    //not insert users
    if(!users){
        return res.status(404).json({message:"Unable to add users"});
    }
    return res.status(200).json({users});

};

//get by ID
const getById=async(req,res,next)=>{

    const id =req.params.id;

    let user;

    try{
        user=await User.findById(id);
    }catch(err){
        console.log.apply(err);
    }

    //not available users
    if(!users){
        return res.status(404).json({message:"User not available"});
    }
    return res.status(200).json({user});

};

//update user details
const updateUser=async(req,res,next)=>{

    const id =req.params.id;

    const{name,gmail,age,address}=req.body;

    let users;

    try{
        users=await User.findByIdAndUpdate(id,
            {
                name:name,gmail:gmail,age:age,address:address
            }
        );
    }catch(err){
        console.log(err);   
    }

    //
    if(!users){
        return res.status(404).json({message:"Unable to update user details"});
    }
    return res.status(200).json({users});
};


//delete user
const deleteUser=async(req,res,next)=>{

    const id =req.params.id;

    const{name,gmail,age,address}=req.body;

    let user;

    try{
        user=await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);   
    }

    //
    if(!user){
        return res.status(404).json({message:"Unable to delete user details"});
    }
    return res.status(200).json({user});
};


exports.getAllUsers=getAllUsers;
exports.addUsers=addUsers;
exports.getById=getById;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;