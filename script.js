let myLibrary = [];

function Book(title, author, pageNum, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNum = parseInt(pageNum);
  this.readStatus = readStatus;
}
const addButton = document.querySelector(".add-book");

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
    <button type="submit">Remove Book</button>
  `;

  document.body.appendChild(form);

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

    // Remove the form after adding the book
    form.remove();
  });
});
