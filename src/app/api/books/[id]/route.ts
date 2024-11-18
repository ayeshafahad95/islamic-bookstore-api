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

// PUT: Update a book
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const bookId = parseInt(params.id, 10);
    const body: Partial<Book> = await request.json();

    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    books[bookIndex] = { ...books[bookIndex], ...body };
    return NextResponse.json(books[bookIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update book." }, { status: 500 });
  }
}

// DELETE: Remove a book
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
):Promise<Response> {
  try {
    const bookId = parseInt(params.id, 10);
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    const deletedBook = books.splice(bookIndex, 1);
    return NextResponse.json(deletedBook[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete book." }, { status: 500 });
  }
}
