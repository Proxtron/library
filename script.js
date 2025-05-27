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

function displayBooks() {
    const booksContainer = document.getElementById("books-container")
    for(let i = 0; i < library.length; i++) {
        const book = library[i];
        booksContainer.innerHTML += `
        <div class="book-card">
            <h2 class="book-title-text">${book.title}</h2>
            <p class="author-text card-sub-text">${book.author}</p>
            <p class="card-sub-text">${book.pages} page(s)</p>
            <p class="card-sub-text">${book.read ? "Read" : "Not read yet"}</p>
        </div>
        `;
    }    
}

const modalElement = document.getElementById("modal");
function displayAddBookModal() {
    modalElement.showModal();
}

document.addEventListener("DOMContentLoaded", () => {
    displayBooks();

    document.getElementById("add-btn").addEventListener("click", displayAddBookModal)
    document.getElementById("close-modal").addEventListener("click", () => {
        modalElement.close();
    });
});