import { NextApiRequest, NextApiResponse } from 'next';

// Mock data store
const books: Array<{ id: number; title: string; author: string; image: string; pdfLink: string }> = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(books);
  } else if (req.method === 'POST') {
    const { title, author, image, pdfLink } = req.body;

    // Validate the incoming data
    if (!title || !author || !image || !pdfLink) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new book
    const newBook = {
      id: books.length + 1,
      title,
      author,
      image,
      pdfLink,
    };

    books.push(newBook); // Save to mock data store
    res.status(201).json(newBook);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    // Modify the contents of `books` without reassigning
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.splice(index, 1); // Remove the book at the found index
    }

    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
