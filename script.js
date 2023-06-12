let myLibrary = [];
//empty array representing our library, to be added to with books

function Book(title, author, pageNum, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.readStatus = readStatus;
  this.removeBook = function () {
    const index = myLibrary.indexOf(this);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  };
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
  const bookFormSpace = document.querySelector(".book-form-space");
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

  const removeButton = form.querySelector(".remove-button");
  removeButton.addEventListener("click", () => {
    form.remove();
  });
});

//functionality for 'Add Book button.' Basically, when clicked, 'Add Book' creates a variable that
//creates a form that is appended to bookFormSpace. An Eventlistener is also created for
//the submit/addbook button of the form, and removebook button to either add the book to displayBook
//or kill the form. We prevent the default behavior of submitting a form to an empty server
//with preventDefault(), where we instead gather the information from the elements within the
//form by their id, which is established on form creation, and pass them through our constructor
//function Book.

function displayBooks() {
  const booksContainer = document.querySelector(".books-container");
  booksContainer.innerHTML = "";

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
    readStatusElement.innerHTML = `Read: <p id="read-status-${index}">${
      book.readStatus ? "Yes" : "No"
    }</p>`;
    bookElement.appendChild(readStatusElement);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", () => {
      book.removeBook();
    });

    const readToggle = document.createElement("button");
    readToggle.textContent = "Toggle Read";
    readToggle.addEventListener("click", () => {
      toggleRead(index);
    });

    bookElement.appendChild(removeButton);
    bookElement.appendChild(readToggle);

    booksContainer.appendChild(bookElement);
  });

  function toggleRead(index) {
    const readStatusElement = document.getElementById(`read-status-${index}`);
    const currentStatus = readStatusElement.textContent;
    const newStatus = currentStatus === "Yes" ? "No" : "Yes";
    readStatusElement.textContent = newStatus;
  }
}
//function to be invoked when a form is submitted from addBook. Basically gets the title, author
//pageNum, and readStatus from the form. Also added removeBook and toggleRead functions in here
//These are invoked when their corresponding buttons are clicked, and pass the current form as
//a parameter through them. In the case of removeBook, it simply splices whichever book it refers
//to out of myLibrary and runs displayBooks again. I actually realized I could add removeBook
//to the original constructor function for Book, so in the latest version I did that and just
// added an eventlistener for it here, where it's invoked when the button is clicked.
// toggleRead has a few more moving parts; it grabs the readStatusElement by its id (assigned  
//to it by its current index on form creation) and accesses its text content, changing it
//
