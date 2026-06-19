import express from 'express';
import User from '../models/user.js';
import Book from '../models/book.js';
import Summary from '../models/summaries.js';
import { verifyToken, isAdmin } from '../auth/auth.js';

const router = express.Router();


router.use(verifyToken);
router.use(isAdmin);


router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});


router.get('/books', async (req, res) => {
  try {
    const books = await Book.find()
      .populate("uploadedBy", "name email");
    res.json(books);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch books' });
  }
});


router.get('/summaries', async (req, res) => {
  try {

    const summaries = await Summary
      .find()
      .populate({
        path: "bookId",
        select: "title uploadedBy",
        populate: {
          path: "uploadedBy",
          select: "name email"
        }
      });

    res.json(summaries);

  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch summaries' });
  }
});



// Delete user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
});

// Delete book by ID
router.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete book' });
  }
});

// Delete summary by ID
router.delete('/summaries/:id', async (req, res) => {
  try {
    await Summary.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete summary' });
  }
});

export default router;