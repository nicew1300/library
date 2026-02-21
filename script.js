const myLibrary = []
const addBtn = document.querySelector(".add")
const modal = document.querySelector("dialog")
const content = document.querySelector(".content")

addBtn.addEventListener("click", () => {
    modal.showModal()
})

// close the modal if clicked outside, i got this from web dev simplified dialog element tutorial
modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

const form = document.querySelector("form")

form.addEventListener("submit", createBook)

function Book(titleInput, authorInput, pagesInput) {
    this.title = titleInput;
    this.author = authorInput;
    this.pages = pagesInput;
    this.id = crypto.randomUUID()
}


function createBook(e) {
    // prevent page refresh
    e.preventDefault();

    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    const pagesInput = document.querySelector('#pages').value;

    const book = new Book(titleInput, authorInput, pagesInput);
    myLibrary.push(book)
    
    displayBook(book)
 
    document.querySelector('form').reset(); // Clears the inputs
    modal.close();

}

function displayBook(book) {
    const bookDiv = document.createElement("div")
    bookDiv.classList.add("book")

    const bookTitleDiv = document.createElement("div")
    bookTitleDiv.classList.add("book-title")
    bookTitleDiv.textContent = book.title
    bookDiv.appendChild(bookTitleDiv)

    const bookAuthorDiv = document.createElement("div")
    bookAuthorDiv.classList.add("book-author")
    bookAuthorDiv.textContent = `by ${book.author}`
    bookDiv.appendChild(bookAuthorDiv)

    const bookPagesDiv = document.createElement("div")
    bookPagesDiv.classList.add("book-pages")
    bookPagesDiv.textContent = `${book.pages} pages`
    bookDiv.appendChild(bookPagesDiv)

    content.appendChild(bookDiv)

    console.log(myLibrary)
}