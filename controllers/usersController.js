const express = require("express");
const router = express.Router();
//const users = require("../users");

const User = require('../models').User
const Fruit = require('../models').Fruit


// Homepage ==> server.js
// router.get("/", (req, res) => {
//     res.render("users/index.ejs")
// });

// router.get("/", (req, res) => {
//   User.findAll().then((users) => {
//     res.render("users/index.ejs", {
//       users: users,
//     });
//   });
// });

// //GET Signup Page
// router.get('/signup', function(req, res){
// 	res.render('users/signup.ejs');
// });

// //GET Login 
// router.get('/login', (req,res) =>{
//     res.render('users/login.ejs');
// });

// //Post Login Possibly add if statement
// // router.post('/login',(req,res)=> {
// //     let index = users.findByPk(
// //         (user)=> 
// //         user.username === req.body.username && user.password === req.body.password
// //     );
// //     res.redirect(`/users/profile/${index}`);
// // });

// router.post("/login", (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username,
//       password: req.body.password,
//     },
//   }).then((foundUser) => {
//     res.redirect(`/users/profile/${foundUser.id}`);
//   });
// });

// // POST Signup Form
// // router.post("/", (req, res) => {
// //     users.push(req.body);
// //     res.redirect(`/users/profile/${users.length - 1}`);
// //   });
// router.post("/", (req, res) => {
//   User.create(req.body).then((newUser) => {
//     res.redirect(`/users/profile/${newUser.id}`);
//   });
// });


// Get User Profile
// router.get("/profile/:index", (req, res) => {
//     res.render("users/profile.ejs", {
//       user: users[req.params.index],
//       index: req.params.index,
//     });
//   });

  // GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  // IF USER ID FROM TOKEN MATCHES THE REQUESTED ENDPOINT, LET THEM IN
  if (req.user.id == req.params.id) {
    User.findByPk(req.params.id, {
      include: [
        {
          model: Fruit,
          attributes: ["id", "name"],
        },
      ],
    }).then((userProfile) => {
      res.render("users/profile.ejs", {
        user: userProfile,
      });
    });
  } else {
    // res.json("unauthorized");
    res.redirect("/");
  }
});

// Edit Profile 
// router.put("/profile/:index", (req, res) => {
//     users[req.params.index] = req.body;
//     res.redirect(`/users/profile/${req.params.index}`);
//   });
router.put("/profile/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  }).then((updatedUser) => {
    res.redirect(`/users/profile/${req.params.id}`);
  });
});
  
// Delete
// router.delete("/:index", (req, res) => {
//     users.splice(req.params.index, 1); 
//     res.redirect("/users"); 
//   });

router.delete("/:id", (req, res) => {
  User.destroy({where: {id: req.params.id} }).then(() =>{
    res.redirect("/");
  });
  });
module.exports = router;