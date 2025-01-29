const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../modals/users");

const registerUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, bio } = req.body;

    if (!fullName || !phoneNumber || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if a user with the provided email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same email or phone number already exists' });
    }

    // Generate unique serial number and consumer ID
    const serialNumber = generateUniqueSerialNumber();
    const consumerId = generateUniqueConsumerId();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role: 'user',
      fullName,
      phoneNumber,
      email,
      bio,
      password: hashedPassword,
      serialNumber, // Assign generated serial number
      consumerId, // Assign generated consumer ID
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


const generateUniqueSerialNumber = () => {
  // Generate a unique serial number using timestamp and random number
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999

  // Formatting the parts with leading zeros if necessary
  const part1 = ("000" + Math.floor(timestamp / 1000000)).slice(-3); // Get the first three digits of the timestamp
  const part2 = ("00" + Math.floor((timestamp % 1000000) / 1000)).slice(-2); // Get the middle two digits of the timestamp
  const part3 = ("000" + randomNumber).slice(-3); // Ensure the random number has three digits

  return `${part1}.${part2}.${part3}`;
};


const generateUniqueConsumerId = () => {
  // Generate a unique consumer ID using timestamp and random number
  const timestamp = Date.now().toString(); // Current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 9000 + 1000).toString(); // Random number between 1000 and 9999
  return `${timestamp}${randomNum}`;
};



const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.sttus(400).json({ error: 'Email/Phone and password are required' });
    }

    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }] });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email/phone or password' });
    }

    // Compare the plain text password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email/phone or password' });
    }

    // Generate and send access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res.status(200).json({ accessToken, refreshToken, userId: user._id, userRole: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


const generateAccessToken = (user) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);
  return refreshToken;
};


module.exports = {
  registerUser,
  loginUser,
};
