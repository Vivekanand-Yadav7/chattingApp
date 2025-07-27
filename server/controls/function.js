const user = require("../model/user");
const dcrypt = require("dcryptjs");
const jwt = require("jsonwebtoken");
const chat = require("../model/chat");
const message = require("../model/message");
const secret = '12345';
async function handleSignUp(req, res){
   try{
      const result = await user.findOne({email:req.body.email});
      if(result){
        console.log(result);
        return res.send({
            message: "user already exist",
            success: false
        })
      }
      const incriptedPassword = dcrypt.hash(req.body.password, 10);
      req.body.password = incriptedPassword;
      const newUser = new user(req.body);
      newUser.save();
      res.status(201).send({
        message: "user created succesfully",
        success: true
      })
   }
   catch(err){
     res.send({
        message: "there is an error in creating",
        success: false
     })
   }
}
async function handleLogIn(req, res){
   try{
    const result = await user.findOne({email: req.body.email});
    if(!result){
      return res.send({
        message:"user does not exist",
        success: false
      });
    }
    const isValid = await dcrypt.compare( req.body.password, result.password);
    if(!isValid){
      return res.send({
        message: "invalid password",
        success: false
      })
    }
    const token = jwt.sign({userId: result._id}, secret, {expiresIn: "1d"});
    res.send({
      message:" user logged in successfully",
      success: true,
      token: token
    })

   }
   catch(error){
    res.send({
      message:error.message,
      success: false
    })
   }
} 
async function handleGetUser(req, res){
     try{
        const result = await user.findOne({_id: req.userId});
        res.send({
          message: "user found",
          success: true,
          data: result
        })
     }
     catch(error){
      res.status(400).send({
        message: error.message,
        success: false
      })
     }
}
async function handleGetAllUsers(req, res){
  try{
    const id = req.userId;
     const allUser = await user.find({_id : { $ne : id}});
     res.send({
      message: "all users found successfully",
      success: true,
      data: allUser
     })
  }
  catch(error){
    res.status(400).send({
      message: error.message,
      success: false
    })
  }
  
}
async function handleChat(req, res){
  try{
     const newChat = new chat(req.body);
     const savedChat = await newChat.save();
     res.status(201).send({
      message: "new chat created successfully",
      success: true,
      data: savedChat
     })
  }
  catch(error){
    res.status(400).send({
      message: error.message,
      success: false
    })
  }
 }
async function handleAllChat(req, res){
    try{
      const allChats = await chat.find({members: {$in: req.userId}}).populate("lastMessage").populate("members").sort({"lastMessage:createdAt": -1});
      res.status(200).send({
        message: "all chat fetched",
        success: true,
        data: allChats
      })
    }
    catch(error){
      res.status(400).send({
        message: error.message,
        success: false
      })
    }
}
async function handleMessage(req, res){
  try{
    const newMessage = new message(req.body);
    const savedMessage = await newMessage.save();
    const neChat = await chat.findOneAndUpdate({_id: savedMessage.chatId},{
      lastMessage: savedMessage._id,
      $inc : {unreadMessageCount: 1}
    });
    res.status(201).send({
      message:"message sent successfully",
      success: true,
      data: savedMessage
    })
  }
  catch(error){
    res.status(400).send({
      message: error.message,
      success: false
    })
  }
}
async function handleAllMessage(req, res){
  try{
       const allMessage = await message.find({chatId: req.params.chatId});
       res.status(200).send({
        message:"all message sent",
        success: true,
        data: allMessage
       })
  }
  catch(error){
     res.status(400).send({
      message: error.message,
      success: false
     })
  }
}

async function clrearUnredMessege(req, res){
  try {
     const chatId = req.body.chatId;
     const foundChat = chat.find(chatId);
     if(!chat){
      res.send({
        message: "no chat found with the given chat Id",
        success: false
      });
     }
     const updatedChat = await chat.findByIdAndUpdate(chatId,{unreadMessageCount: 0},
       {new: true}).populate('members').populate('lastMessage');
       await message.updateMany({chatId: chatId, read: false}, {read: true});
       res.send({
        message: "unread message clreared successfully",
        success: true,
        data: updatedChat
       })

  } catch (error) {
    res.send({
      message: error.message,
      success: false
    })
  }
}
module.exports = {
  handleSignUp,
  handleLogIn,
  handleGetUser,
  handleGetAllUsers,
  handleChat,
  handleAllChat,
  handleMessage,
  handleAllMessage,
  clrearUnredMessege
}