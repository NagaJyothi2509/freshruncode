/*const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt=require('jsonwebtoken')
const auth=require("../middlewares/auth")

router.post("/login");
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Checking missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all the required fields" });
  }

  // Name validation
  if (name.length > 25) {
    return res.status(400).json({ error: "Name can be a maximum of 25 characters" });
  }

  // Email validation
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  // Validation of password
  if (password.length <= 6) {
    return res.status(400).json({ error: "Password should be at least 6 characters long" });
  }

  try {
    const doesUserAlreadyExist = await User.findOne({ email });
    if (doesUserAlreadyExist) {
      return res.status(400).json({ error: "A user already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  if(!email,!password)
  return res.status(400)
  .json({error:"please enter all the required fields"});


  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }







  try{
    const doesUserExists=await User.findOne({email});
    if(!doesUserExists) return res.status(400).json({error:"Invalid email or password"});


   const doesPasswordmatch=await bcrypt.compare(password,doesUserExists.password);
   if(!doesPasswordmatch) return res.status(400).json({error:"Invalid email or password"});

   const payload={_id:doesUserExists._id};
   const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h",})
   const user={...doesUserExists._doc,password:undefined};
   return res.status(200).json({token,user})

  }catch(err){
    console.log(err);
    return res.status(500).json({error:err.message});
  }
})

router.get("/me",auth,async(req,res)=>{
  return res.status(200).json({...req.user._doc});
})

router.post("/forget",async(req,res)=>{
  const{email}=req.body;
  res.status(200).json({ message: "Password reset requested for email: " + email });
})
*/
const router = require('express').Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const auth = require("../middlewares/auth");

router.post("/login");
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Checking missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all the required fields" });
  }

  // Name validation
  if (name.length > 25) {
    return res.status(400).json({ error: "Name can be a maximum of 25 characters" });
  }

  // Email validation
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  // Validation of password
  if (password.length <= 6) {
    return res.status(400).json({ error: "Password should be at least 6 characters long" });
  }

  try {
    const doesUserAlreadyExist = await User.findOne({ email });
    if (doesUserAlreadyExist) {
      return res.status(400).json({ error: "A user already exists with this email" });
    }

    const newUser = new User({ name, email, password });

    // Save the user
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all the required fields" });
  }

  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  try {
    const doesUserExists = await User.findOne({ email });
    if (!doesUserExists) return res.status(400).json({ error: "Invalid email or password" });

    // Normally, without bcrypt, you would compare the password directly like this:
    if (password !== doesUserExists.password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const payload = { _id: doesUserExists._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    const user = { ...doesUserExists._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

router.post("/forget", async (req, res) => {
  const { email } = req.body;
  res.status(200).json({ message: "Password reset requested for email: " + email });
});

module.exports = router;










module.exports = router;
