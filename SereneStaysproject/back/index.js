const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const User = require('./models/User');
const Place = require('./models/Place');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const fs = require('fs');
const path = require('path');
const Booking = require('./models/booking');

require('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'bwbwfhwufhiuwefyfnvkjnwuvhw';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    function getUserDataFromReq(req) {
      return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
          if (err) return reject(err);
          resolve(userData);
        });
      });
    }

    app.get('/test', (req, res) => {
      res.json('test ok');
    });

    app.post('/register', async (req, res) => {
      const { name, email, password } = req.body;
      try {
        const userDoc = await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
      } catch (e) {
        res.status(422).json(e);
      }
    });

    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        const userDoc = await User.findOne({ email });
        if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
          jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
          });
        } else {
          res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
      }
    });

    app.get('/profile', (req, res) => {
      const { token } = req.cookies;
      if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) return res.status(403).json({ status: 'error', message: 'Invalid token' });
          const user = await User.findById(userData.id);
          if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
          const { name, email, _id } = user;
          res.json({ name, email, _id });
        });
      } else {
        res.json(null);
      }
    });

    app.post('/logout', (req, res) => {
      res.cookie('token', '').json(true);
    });

    app.post('/upload-by-link', async (req, res) => {
      const { link } = req.body;
      const newName = 'photo' + Date.now() + '.jpg';
      try {
        await imageDownloader.image({
          url: link,
          dest: path.join(__dirname, '/uploads', newName),
        });
        res.json(newName);
      } catch (e) {
        res.status(500).json({ status: 'error', message: 'Error downloading image' });
      }
    });

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
      }
    });

    const upload = multer({ storage: storage });

    app.post('/upload', upload.array('photos', 100), (req, res) => {
      const uploadFiles = req.files.map(file => file.filename);
      res.json(uploadFiles);
    });

    app.post('/places', async (req, res) => {
      const { token } = req.cookies;
      const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

      try {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;

          const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
          });

          res.json(placeDoc);
        });
      } catch (error) {
        console.error('Error creating place:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
      }
    });

    app.get('/user-places', async (req, res) => {
      const { token } = req.cookies;
      try {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) return res.status(403).json({ status: 'error', message: 'Invalid token' });
          const places = await Place.find({ owner: userData.id });
          res.json(places);
        });
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
      }
    });

    app.get('/places/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const place = await Place.findById(id);
        if (!place) return res.status(404).json({ status: 'error', message: 'Place not found' });
        res.json(place);
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
      }
    });

    app.put('/places/:id', async (req, res) => {
      const { token } = req.cookies;
      const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

      try {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) return res.status(403).json({ status: 'error', message: 'Invalid token' });
          const placeDoc = await Place.findById(req.params.id);
          if (userData.id !== placeDoc.owner.toString()) return res.status(403).json({ status: 'error', message: 'Unauthorized' });

          placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
          });

          await placeDoc.save();
          res.json('ok');
        });
      } catch (error) {
        console.error('Error updating place:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
      }
    });

    app.get('/places', async (req, res) => {
      res.json(await Place.find());
    });

    app.post('/bookings', async (req, res) => {
      try {
        const userData = await getUserDataFromReq(req);
        const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

        const booking = await Booking.create({
          place,
          checkIn,
          checkOut,
          numberOfGuests,
          name,
          phone,
          price,
          user: userData.id,
        });

        res.json(booking);
      } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
      }
    });

    app.get('/bookings', async (req, res) => {
      try {
        const userData = await getUserDataFromReq(req);
        const bookings = await Booking.find({ user: userData.id }).populate('place');
        res.json(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
      }
    });

    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

startServer();
