import express from 'express';

const userController = express.Router();

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
userController.get('/', (req, res) => {
    res.status(200).json({
      data: "test-get",
  });
});

/**
 * POST
 * Add a new User to your database
 */
userController.post('/add-user', (req, res) => {
    ress.status(200).json({
        data: "test-post"
    })
});

userController.get('/', (req, res) => {
  res.status(200).json({
    status: 'user Controller API call successfully',
  });
});

export default userController;
