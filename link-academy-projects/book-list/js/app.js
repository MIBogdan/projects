import {Store} from "../modules/Store.js"
import {Book} from "../modules/Book.js"
 
import {UI} from "../modules/UI.js"


 

 document.addEventListener('DOMContentLoaded', Store.displayBooks);
 

 document.getElementById('book-form').addEventListener('submit', function(e) {
 

   const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value
 

   
   const book = new Book(title, author, isbn);
 

   const ui = new UI();
 

   if(title === "" || author === "" || isbn === ""){

     ui.showAlert('Please fill in all fields', 'error');
   } else {

     ui.addBookToList(book);
 
     
     Store.addBook(book);
 

     ui.showAlert('Book Added', 'success');
 

     ui.clearFields();
   }
   
   e.preventDefault();
 });
 

 document.getElementById('book-list').addEventListener('click', function(e){
   

   const ui = new UI();
   

   ui.deleteBook(e.target);
 

   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 

   ui.showAlert('Book Removed!', 'success');
 
   e.preventDefault();
 });

let year = new Date().getFullYear();
document.getElementById('year').innerHTML = `&copy ${year} Marius Bogdan. All rights reserved.`;