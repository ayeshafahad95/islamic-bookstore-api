import { NextResponse } from "next/server";
interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  pdfLink: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Sahih al-Bukhari",
    author: "Imam Bukhari",
    image: "/images/sahih-bukhari.jpg",
    pdfLink: "https://d1.islamhouse.com/data/en/ih_books/single/en_Sahih_Al-Bukhari.pdf",
  },
  {
    id: 2,
    title: "Sahih Muslim",
    author: "Imam Muslim",
    image: "/images/sahih-muslim.jpg",
    pdfLink: "https://archive.org/details/sahih-muslim-english-vol-1/sahih-muslim-english-vol-1/",
  },
  {
    id: 3,
    title: "Tafseer Ibn Kathir",
    author: "Ibn Kathir",
    image: "/images/tafsir-ibn-kathir.jpg",
    pdfLink: "https://www.emaanlibrary.com/wp-content/uploads/2015/04/1.-Tafsir-Ibn-Kathir-all-10-volumes.pdf",
  },
  {
    id: 4,
    title: "Al-Muwatta",
    author: "Imam Malik",
    image: "/images/al-muwatta.jpg",
    pdfLink: "https://www.islamiclibrary.com/Viewer/Pdf.html?file=text-pdfs/EN4053.pdf",
  },
  {
    id: 5,
    title: "Riyad as-Salihin",
    author: "Imam Nawawi",
    image: "/images/riyad-as-salihin.jpg",
    pdfLink: "https://archive.org/details/riyad-as-salihin-english/page/n13/mode/2up",
  },
];

// GET: Retrieve all books
export async function GET() {
  try {
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books." }, { status: 500 });
  }
}

// POST: Add a new book
export async function POST(request: Request): Promise<Response> {
  try {
    const body: Partial<Book> = await request.json();
    
    // Ensure all necessary fields are provided
    const { title, author, image, pdfLink } = body;

    if (!title || !author || !image || !pdfLink) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Create a new book with a unique ID
    const newBook = {
      id: books.length + 1, // Generate a new unique ID
      title,
      author,
      image,
      pdfLink,
    };

    // Add the new book to the array
    books.push(newBook);

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add a new book." }, { status: 500 });
  }
}
