import User from '../models/user.js';



// create user 
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// all user find
export const getUserController = async (req, res) => {
    try {
      const data = await User.find();
      res.status(200).json({ message: 'Data found successfully', data });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
// single user find
  export const getByIdController = async (req, res) => {
    const { _id } = req.params;
  
    try {
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User found successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
// update user
  export const updateController = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  // delete user

  export const deleteController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };