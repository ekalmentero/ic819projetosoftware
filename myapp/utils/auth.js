
const usersController = require ('../controllers/usersController');

authUser = async (email, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${email}`)         //passport will populate, user = req.body.username
    console.log(`Value of "Password" in authUser function ----> ${password}`) //passport will popuplate, password = req.body.password

    //let user = await usersController.getUserByEmail(email);

    let authenticated_user = { id: 123, name: "Kyle"}
    return done (null, authenticated_user )
}


module.exports = {
	authUser
}
