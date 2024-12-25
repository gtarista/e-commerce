const addCartBtn = document.querySelectorAll('.add-to-cart-btn');
const itemOnStore = document.getElementById('item');
const table = document.querySelector('table');

function productObj (itemName, itemDescription, itemQuantity, itemPrice, itemImage) {
    return {
        name: itemName,
        description: itemDescription,
        quantity: itemQuantity,
        price: parseFloat(itemPrice.replace("$","")),
        image: itemImage
    }
};



function onAddItemCart(e) {
    e.preventDefault(); // prevent form submission

    const itemImage = e.target.parentElement.children[0].src; // navigate the DOM to find img source attribute
    const itemName = e.target.parentElement.children[1].textContent; // navigate the DOM to find h3 text content
    const itemDescription = e.target.parentElement.children[2].textContent; // navigate the DOM
    const itemPrice = e.target.parentElement.children[3].textContent; // navigate the DOM to find 
    const itemQuantity = 2;
    
    const product = productObj(itemName, itemDescription, itemQuantity, itemPrice, itemImage); //
    
    //console.log(product);
    addCartToStorage(product) // add string to storage
    addCartToDOM(product); // add to DOM

}

function getCartFromStorage() {
    let cartFromStorage; // assign a variable to contain array

    if (localStorage.getItem('cart') === null) {
        console.log("empty");
        cartFromStorage = [];  // returns an empty array 
    } else  {   
        cartFromStorage = JSON.parse(localStorage.getItem('cart')); // convert local storage data (string) to array and store to variable
    }
    return cartFromStorage; //returns array
}

function addCartToStorage(item) { 
    const itemOnCart = getCartFromStorage(); // an array of cart from storage
    itemOnCart.push(item); // push string to array of cart
    localStorage.setItem('cart', JSON.stringify(itemOnCart)); // convert to string before storing
}

function addCartToDOM(item) { // arg accepts a string

    const tr = document.createElement('tr'); // create table row element

    itemTotal = `$${item.quantity * item.price}`;

    rowData = [item.name, item.quantity, item.price, itemTotal];         // create array of data to be stored 

    rowData.forEach(data => {                // iterate over each data
        td = document.createElement('td');   // create a table data to insert each data
        td.textContent = data;               // insert text content of each data
        tr.appendChild(td);                  // append table data to table row
    });


    table.appendChild(tr);                   // append table row to table itself
    
    
}

addCartBtn.forEach(cartBtn => {
    cartBtn.addEventListener('click', onAddItemCart);
})
