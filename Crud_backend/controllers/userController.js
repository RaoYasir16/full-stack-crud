const {User} = require('../models');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getUsers = async(req,res)=>{
    try {
        const allUsers = await User.findAll({
            order:[["createdAt","DESC"]]
        });
        if(allUsers.length === 0){
            return res.status(404).json({
                message:"No user found"
            })
        }

        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

const getSingleUser = async(req,res)=>{
    const id = req.params.id
    const existuser = await User.findByPk(id);
    if(!existuser){
        return res.status(404).json({
            message:"user not found"
        })
    }
    return res.status(200).json(existuser)
}


const updateUser = async(req,res)=>{
    const id= req.params.id

    const existUser = await User.findByPk(id);
    if(!existUser){
        return res.status(404).json({
            message:"User not found"
        })
    }

    await existUser.update(req.body);

    return res.status(200).json(existUser)
}


const deleteUser = async(req,res)=>{
    const id = req.params.id

    const existUser = await User.findByPk(id);
    if(!existUser){
        return res.status(404).json({
            message:"User not found"
        })
    }

    await existUser.destroy();
    return res.status(200).json({
        message:"User delete successfylly"
    })
}


module.exports = {createUser,getUsers,getSingleUser,updateUser,deleteUser}