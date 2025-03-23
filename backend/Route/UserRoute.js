const express = require("express");
const router=express.Router();

//Insert Model
const User = require("../Model/UserModel")

//Insert User Controller
const UserControllers=require("../Controlers/UserControllers")

router.get("/",UserControllers.getAllUsers);
router.post("/",UserControllers.addUsers);
router.get("/id",UserControllers.getById);
router.put("/",UserControllers.updateUser);
router.delete("/",UserControllers.deleteUser);

//export
module .exports=router;