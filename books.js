// Get references to DOM elements
const addBookButtonElement = document.getElementById('addBook');
const libraryElement = document.getElementById('library');
const bookFormContainer = document.getElementById('bookForm');
const myLibrary = [];
const submitBtn = document.getElementById('submitFormButton')

submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    checkForm();
});
// Book constructor function
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}.`;
    };
}
// Populate library
function populateLibrary(){
    for (const book of myLibrary) {
        let bookTitle = book.title;
        let author = book.author;
        let pages = book.pages;
        let readStatus = book.read;
        createCard(bookTitle, author, pages, readStatus);
    }
}
// Function to handle form submission
function submitForm(){
    // Get form data
    let bookTitle = document.querySelector('#bookTitleInput').value;
    let author = document.querySelector('#authorInput').value;
    let pages = document.querySelector('#pageCountInput').value;
    let readStatus = document.getElementsByName('hasRead');
    let selectedValue = '';
    let bookForm = document.querySelector('#book');
    // Iterate through radio buttons to find the selected value
    for (const radioButton of readStatus) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
}};
    // Create a new Book object and add it to the library
    let newBook = new Book(bookTitle, author, pages, selectedValue);
    myLibrary.push(newBook);
    console.log(myLibrary);
    bookForm.reset();
    bookFormContainer.close();
    // Create a card using the form data
    createCard(bookTitle, author, pages, selectedValue)
};
// Event listener for displaying the book form
addBookButtonElement.addEventListener('click', () => {
    bookFormContainer.showModal();
});
// Placeholder for deleteCard function
function deleteCard(cardElement, title){
    // Remove the card element from its parent
    cardElement.parentNode.removeChild(cardElement);
    deleteBook(title)
}
// Remove the book from the array if the card is deleted
function deleteBook(title){
    const bookIndex = myLibrary.findIndex((book) => book.title === title)
    myLibrary.splice(bookIndex, 1)
}
// Function to create a card for a book and append it to the library
function createCard(bookTitle, author, pages, readStatus){
    // Create HTML elements for the card
    const cardElement = document.createElement('div');
    const titleElementLabel = document.createElement('p');
    const titleElement = document.createElement('p');
    const authorElement = document.createElement('p');
    const pageCountElement = document.createElement('p');
    const readBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    // Add classes to elements for styling
    cardElement.classList.add('card');
    readBtn.classList.add('btn');
    deleteBtn.classList.add('btn');
    // Add id's to elements for positioning
    titleElementLabel.id = 'titleLabel';
    titleElement.id = 'title';
    authorElement.id = 'author';
    pageCountElement.id = 'pgCount';
    readBtn.id = 'readBtn';
    deleteBtn.id = 'deleteBtn';
    // Append child elements to the card
    cardElement.appendChild(titleElementLabel);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(authorElement);
    cardElement.appendChild(pageCountElement);
    cardElement.appendChild(readBtn);
    cardElement.appendChild(deleteBtn);
    // Set text content for each element
    titleElementLabel.textContent = 'Book title: ';
    titleElement.textContent = bookTitle;
    authorElement.textContent = `Author: ${author}`;
    pageCountElement.textContent = `Total pages: ${pages}`;
    // Set text and functionality for the delete button
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        // Call a function to handle the deletion of this specific card
        deleteCard(cardElement, bookTitle);
    });
    // Set text and functionality for the readBtn
    readBtn.textContent = readStatus;
    readBtn.addEventListener('click', () => {
        readButton(readBtn);
    });
    colourCard(readStatus, readBtn)
    // Append the card to the library
    libraryElement.appendChild(cardElement);
}
// Colour the card based on if it has bee read or not
function colourCard(status, button){
    const cardParent = button.parentElement;
    if (status === 'Read'){
        cardParent.style.backgroundColor = 'rgb(86, 223, 132)';
    } else {
        cardParent.style.backgroundColor = 'rgb(255, 139, 139)';
    }
}
// Function to handle readBtn click
function readButton(readBtn){
    const cardParent = readBtn.parentElement;
    const cardBookTitle = cardParent.children[1].textContent;
    const readStatus = readBtn.textContent;
    if (readStatus === 'Read') {
        newStatus = 'Not Read';
        colourCard(newStatus, readBtn);
        updateLibrary(cardBookTitle, newStatus);
        readBtn.textContent = newStatus;
    } else {
        newStatus = 'Read';
        colourCard(newStatus, readBtn);
        updateLibrary(cardBookTitle, newStatus);
        readBtn.textContent = newStatus;
    }
}
// Function to update library with new read status
function updateLibrary(title, newHasReadStatus){
    const bookIndex = myLibrary.findIndex((book) => book.title === title);

    if (bookIndex !== -1) {
        myLibrary[bookIndex].read = newHasReadStatus;
        console.log(`The hasRead status for "${title}" has been updated to ${newHasReadStatus}`);
    } else {
        console.log(`Book with title "${title}" not found in the library`);
    }
}
// Form validation
function checkForm(){
    // Your validation logic here
    let bookTitle = document.querySelector('#bookTitleInput').value;
    let author = document.querySelector('#authorInput').value;
    // let pages = document.querySelector('#pageCountInput').value;
    let readStatus = document.getElementsByName('hasRead');
  
    // Example validation: Check if any required field is empty
    if (!bookTitle) {
        alert('Please fill in the books title.');
        return false;
    }else if(!author){
        alert('Please fill out an author.')
        return false;
    }else if(!getRadioValue(readStatus)){
        alert('Please select if you have read the book or not.')
        return false;
    }
    submitForm();
}
  // Helper function to get the value of a selected radio button
  function getRadioValue(radioNodeList){
    for (const radio of radioNodeList){
      if (radio.checked) {
        return radio.value;
      }}
    return null; // Return null if none are checked
}
  