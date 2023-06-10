let myLibrary = [];

function Book(title, author, pageNum, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNum = parseInt(pageNum);
  this.readStatus = readStatus;
}
//constructor function for book creation

const addButton = document.querySelector(".add-book");
//select the 'Add Book' button

addButton.addEventListener("click", () => {
  const form = document.createElement("form");
  form.classList.add("book-form");

  form.innerHTML = `
    <label for="title">Title:</label>
    <input type="text" id="title" required>
    <label for="author">Author:</label>
    <input type="text" id="author" required>
    <label for="pageNum">Page Numbers:</label>
    <input type="number" id="pageNum" required>
    <label for="readStatus">Read:</label>
    <input type="checkbox" id="readStatus">
    <button type="submit">Add Book</button>
    <button type="submit" class="remove-button">Remove Book</button>
  `;
  const bookFormSpace = document.querySelector(".book-form-space")
  bookFormSpace.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pageNumInput = document.getElementById("pageNum");
    const readStatusInput = document.getElementById("readStatus");

    const title = titleInput.value;
    const author = authorInput.value;
    const pageNum = pageNumInput.value;
    const readStatus = readStatusInput.checked;

    const newBook = new Book(title, author, pageNum, readStatus);

    myLibrary.push(newBook);

    displayBooks();

    form.remove();
  });

  const removeButton = form.querySelector(".remove-button")
  removeButton.addEventListener("click", () => {
    form.remove()
  })
});
//functionality for 'Add Book button.' Basically, when clicked, 'Add Book' creates a variable that 
//creates a form that is appended to bookFormSpace. An Eventlistener is also created for 
//the submit/addbook button of the form, and removebook button to either add the book to displayBook
//or kill the form. 

function displayBooks() {
  
  const booksContainer = document.querySelector(".books-container");
  booksContainer.innerHTML = ""; // Clear previous contents

  myLibrary.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const titleElement = document.createElement("h3");
    titleElement.textContent = `Title: ${book.title}`;
    bookElement.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;
    bookElement.appendChild(authorElement);

    const pageNumElement = document.createElement("p");
    pageNumElement.textContent = `Page Numbers: ${book.pageNum}`;
    bookElement.appendChild(pageNumElement);

    const readStatusElement = document.createElement("p");
    readStatusElement.textContent = `Read: ${book.readStatus ? "Yes" : "No"}`;
    bookElement.appendChild(readStatusElement);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", () => {
      removeBook(index);
    });
    bookElement.appendChild(removeButton);

    booksContainer.appendChild(bookElement);
  });
}
