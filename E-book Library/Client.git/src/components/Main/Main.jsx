import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5); // Number of books per page

  useEffect(() => {
    // Mock data for E-books (replace with API call)
    const mockBooks = [
      { id: 1, title: "Book 1", author: "Author 1" },
      { id: 2, title: "Book 2", author: "Author 2" },
      { id: 3, title: "Book 3", author: "Author 3" },
      { id: 4, title: "Book 4", author: "Author 4" },
      { id: 5, title: "Book 5", author: "Author 5" },
      { id: 6, title: "Book 6", author: "Author 6" },
      { id: 7, title: "Book 7", author: "Author 7" },
      { id: 8, title: "Book 8", author: "Author 8" },
      { id: 9, title: "Book 9", author: "Author 9" },
      { id: 10, title: "Book 10", author: "Author 10" },
    ];

    // Set the books state
    setBooks(mockBooks);
  }, []); // Empty dependency array means this runs only once

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Welcome EBook Site</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.library_section}>
        <h2>E-Book Library</h2>
        <ul className={styles.book_list}>
          {currentBooks.map((book) => (
            <li key={book.id} className={styles.book_item}>
              <div>
                <span className={styles.book_icon}>📖</span>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <button className={styles.read_btn}>Read</button>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? styles.active_page : styles.page_button}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;