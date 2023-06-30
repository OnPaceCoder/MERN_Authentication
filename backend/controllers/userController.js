import asyncHandler from 'express-async-handler'
// @desc   Auth  user/settoken
// route   POST  /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    res.status(401);
    throw new Error("Some thing went wrong")
    // res.status(200).json({ message: "Auth User 3" })
})



//@desc Register a new user
//route POST /api/users/auth
// access Public

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Register User' })
})


//@desc Logout user
//route POST /api/users/logout
//@access Public

const logout = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logout user' })
})

//@desc Get user profile
//route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User profile" })
})


//@desc Update user profile
//route PUT /api/users/logout
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: " Update user profile" })
})



export {
    authUser,
    registerUser,
    logout,
    getUserProfile,
    updateUserProfile
}