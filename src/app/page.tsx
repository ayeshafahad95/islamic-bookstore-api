"use client";
import { useEffect, useState } from "react";


interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  pdfLink: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Book>>({});
  const [newBookForm, setNewBookForm] = useState<Partial<Book>>({});
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await res.json();
      setBooks(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const updateBook = async (id: number) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        throw new Error("Failed to update book");
      }

      const updatedBook = await res.json();

      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? updatedBook : book))
      );

      setEditingBookId(null);
      setEditForm({});
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error: any) {
        console.error("Error adding book:", error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewBookInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const addNewBook = async () => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBookForm),
      });

      if (!res.ok) {
        throw new Error("Failed to add new book");
      }

      const addedBook = await res.json();
      setBooks((prevBooks) => [...prevBooks, addedBook]);

      setNewBookForm({});
      setIsAddingBook(false);
    } catch (error: any) {
        console.error("Error adding book:", error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-cover bg-center bg-gray-200">

    <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center"> Islamic Book Collections</h1>
      
      <button
        onClick={() => setIsAddingBook((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        {isAddingBook ? "Cancel" : "Add New Book"}
      </button>

      {isAddingBook && (
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBookForm.title || ""}
            onChange={handleNewBookInputChange}
            className="block w-full px-4 py-2 mb-4 border rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBookForm.author || ""}
            onChange={handleNewBookInputChange}
            className="block w-full px-2 py-1 mb-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newBookForm.image || ""}
            onChange={handleNewBookInputChange}
            className="block w-full px-2 py-1 mb-2 border rounded"
          />
          <input
            type="text"
            name="pdfLink"
            placeholder="PDF Link"
            value={newBookForm.pdfLink || ""}
            onChange={handleNewBookInputChange}
            className="block w-full px-2 py-1 mb-2 border rounded"
          />
          <button
            onClick={addNewBook}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
          >
            Add Book
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            {editingBookId === book.id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editForm.title || ""}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mb-4 border rounded"
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={editForm.author || ""}
                  onChange={handleInputChange}
                  className="block w-full px-2 py-1 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={editForm.image || ""}
                  onChange={handleInputChange}
                  className="block w-full px-2 py-1 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="pdfLink"
                  placeholder="PDF Link"
                  value={editForm.pdfLink || ""}
                  onChange={handleInputChange}
                  className="block w-full px-2 py-1 mb-2 border rounded"
                />
                <button
                  onClick={() => updateBook(book.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingBookId(null);
                    setEditForm({});
                  }}
                  className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-700">{book.author}</p>
                <a
                  href={book.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => {
                    setEditingBookId(book.id);
                    setEditForm(book);
                  }}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
