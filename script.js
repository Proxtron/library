const library = [];

function Book(title, author, read, pages) {
    if(!new.target) {
        throw new Error("Must use new keyword to create book objects");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.read = read;
    this.pages = pages;
}

function addBookToLibrary(title, author, read, pages) {
    const newBook = new Book(title, author, read, pages);
    library.push(newBook);
}

addBookToLibrary("No Longer Human", "Osamu Dazai", true, 177);
addBookToLibrary("Atomic Habits", "James Clear", false, 319);
addBookToLibrary("1984", "George Orwell", false, 368);

const booksContainer = document.getElementById("books-container")
const modalElement = document.getElementById("modal");
const formElement = document.getElementById("add-book-form");

function displayBooks() {
    booksContainer.innerHTML = "";
    for(let i = 0; i < library.length; i++) {
        const book = library[i];
        booksContainer.innerHTML += `
        <div class="book-card">
            <h2 class="book-title-text">${book.title}</h2>
            <p class="author-text card-sub-text">${book.author}</p>
            <p class="card-sub-text">${book.pages} page(s)</p>
            <p class="card-sub-text">${book.read ? "Read" : "Not read yet"}</p>
            <button data-id="${book.id}" class="delete-book-btn" type="button"><img src="trashcan.svg" width="30" height="30"></button>
        </div>
        `;
    }

    attachDeleteListeners();
    
}

function attachDeleteListeners() {
    const deleteBookBtns = document.querySelectorAll("[data-id]");
    deleteBookBtns.forEach((button) => {
        button.addEventListener("click", () => {
            searchAndDeleteBook(button);
            displayBooks();
        });
    });
}

function searchAndDeleteBook(button) {
    for(let i = 0; i < library.length; i++) {
        if(library[i].id == button.dataset.id) {
            library.splice(i, 1);
        }
    }
}
function displayAddBookModal() {
    modalElement.showModal();
}

function handleSubmitAddBook(event) {
    event.preventDefault();

    const formData = new FormData(formElement);
    const bookTitle = formData.get("title")
    const bookAuthor = formData.get("author");
    const pageNumber = parseInt(formData.get("page-number"));
    const read = formData.get("read") === "1" ? true : false;
    
    addBookToLibrary(bookTitle, bookAuthor, read, pageNumber)
    displayBooks();

    modalElement.close();
    formElement.reset();
}

document.addEventListener("DOMContentLoaded", () => {
    displayBooks();

    document.getElementById("add-btn").addEventListener("click", displayAddBookModal)
    document.getElementById("close-modal").addEventListener("click", () => {
        modalElement.close();
    });
    document.getElementById("add-book-form").addEventListener("submit", (event) => handleSubmitAddBook(event));
    
});