// Cart Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart Counter
function updateCartCount() {

const count = document.getElementById("cartCount");

if(count){

count.innerText = cart.length;

}

}

// Add to Cart
function addToCart(name, price) {

cart.push({

name:name,

price:price

});

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

alert(name + " added to cart!");

}

// Search Products
function searchProducts() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const searchTerm = input.value.trim();

    if (searchTerm === "") {
        alert("Please enter a product name.");
        return;
    }

    // If already on products.html, search immediately
    if (window.location.pathname.includes("products")) {

        filterSearchResults(searchTerm);

    } else {

        // From Home/About/Contact/etc. go to products page
        window.location.href =
            "products.html?search=" + encodeURIComponent(searchTerm);
    }
}


function filterSearchResults(searchTerm) {

    const term = searchTerm.toLowerCase().trim();

    const products = document.querySelectorAll(".product-card");

    let found = 0;

    products.forEach(product => {

        // Search all text inside product card
        const productText =
            product.textContent.toLowerCase();

        if (productText.includes(term)) {

            product.style.display = "";

            found++;

        } else {

            product.style.display = "none";
        }

    });


    // Remove old message if it exists
    const oldMessage =
        document.getElementById("noSearchResults");

    if (oldMessage) {
        oldMessage.remove();
    }


    // Show message if nothing matched
    if (found === 0) {

        const message =
            document.createElement("div");

        message.id = "noSearchResults";

        message.innerHTML =
            `<h2>No products found for "${searchTerm}"</h2>
             <p>Try another product name.</p>`;

        message.style.textAlign = "center";
        message.style.padding = "40px 20px";
        message.style.width = "100%";

        const productContainer =
            document.querySelector(".products-container") ||
            document.querySelector(".product-container") ||
            document.querySelector(".products-grid");

        if (productContainer) {

            productContainer.appendChild(message);

        } else {

            document.body.appendChild(message);
        }
    }
}


// Check URL when products.html opens
window.addEventListener("load", function () {

    const params =
        new URLSearchParams(window.location.search);

    const searchTerm =
        params.get("search");

    if (searchTerm) {

        const input =
            document.getElementById("searchInput");

        if (input) {
            input.value = searchTerm;
        }

        filterSearchResults(searchTerm);
    }

});

updateCartCount();
// Load Cart

function loadCart(){

let container=document.getElementById("cartItems");

if(!container) return;

container.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total+=item.price;

container.innerHTML+=`

<div class="cart-item">

<div>

<h3>${item.name}</h3>

<p>₹${item.price}</p>

</div>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

document.getElementById("totalPrice").innerText=total;

}

// Remove Item

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

loadCart();

}

// Checkout

function checkout() {

    // Get cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // FIRST: Don't allow checkout with an empty cart
    if (cart.length === 0) {
        alert("Your cart is empty. Please add an item before checkout.");
        return;
    }

    // SECOND: Check login
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        localStorage.setItem("redirectAfterLogin", "checkout.html");
        alert("Please login before checkout.");
        window.location.href = "login.html";
        return;
    }

    // BOTH conditions passed
    window.location.href = "checkout.html";
}

loadCart();
// Filter Products

function filterProducts(category){

let products=document.querySelectorAll(".product-card");

products.forEach(product=>{

if(category==="all"){

product.style.display="block";

}

else{

if(product.dataset.category===category){

product.style.display="block";

}

else{

product.style.display="none";

}

}

});

}
// Wishlist

function toggleWishlist(button){

const icon=button.querySelector("i");

if(icon.classList.contains("fa-regular")){

icon.classList.remove("fa-regular");

icon.classList.add("fa-solid");

icon.style.color="red";

}

else{

icon.classList.remove("fa-solid");

icon.classList.add("fa-regular");

icon.style.color="#555";

}

}
// DARK MODE//

function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

localStorage.setItem(
"theme",
document.body.classList.contains("dark-mode")
? "dark"
: "light"
);

}

window.onload=function(){

if(localStorage.getItem("theme")=="dark"){

document.body.classList.add("dark-mode");

}

updateCartCount();

loadCart();

updateLoginUI();

updateProfileLink();

}
// SHOW PASSWORD

function togglePassword(){

let pass=document.getElementById("password");

if(pass.type==="password"){

pass.type="text";

}

else{

pass.type="password";

}

}
// REGISTER PAGE

function toggleRegisterPassword(){

let pass=document.getElementById("regPassword");

if(pass.type==="password"){

pass.type="text";

}else{

pass.type="password";

}

}
function registerUser(){

const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("regPassword").value
};

localStorage.setItem("threadUser", JSON.stringify(user));

alert("Account Created Successfully!");
window.location.href = "login.html";
return false;
}
// LOGIN

function loginUser(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let savedUser=JSON.parse(localStorage.getItem("threadUser"));

if(savedUser==null){

alert("No account found. Please register first.");

return false;

}

if(email === savedUser.email && password === savedUser.password){

    localStorage.setItem("loggedIn","true");

    alert("Login Successful!");

const redirectPage = localStorage.getItem("redirectAfterLogin");

if (redirectPage) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirectPage;
} else {
    window.location.href = "account.html";
}
}else{

    alert("Incorrect Email or Password");

}

return false;

}
function showUser(){

const userName=document.getElementById("userName");

if(!userName) return;

let user=JSON.parse(localStorage.getItem("threadUser"));

if(localStorage.getItem("loggedIn")=="true" && user){

userName.innerText=user.name;

}

}

showUser();


function logoutUser(){

    localStorage.removeItem("loggedIn");

    // Optional: remove saved user account
    // Uncomment the next line if you want the user to register again after logout
    // localStorage.removeItem("threadUser");

    alert("Logged out successfully!");

    window.location.href="index.html";
}



function placeOrder(){

    localStorage.removeItem("cart");

    window.location.href="order-success.html";

    return false;
}

// Back To Top Button

let mybutton=document.getElementById("topBtn");

window.onscroll=function(){

if(document.body.scrollTop>300 || document.documentElement.scrollTop>300){

mybutton.style.display="block";

}else{

mybutton.style.display="none";

}

};

// Scroll to Top

function topFunction(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

// Fade Animation

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
});

// Account Page

function loadAccount() {

    const name = document.getElementById("accountName");
    const email = document.getElementById("accountEmail");

    if (!name || !email) return;

    const loggedIn = localStorage.getItem("loggedIn");
    const user = JSON.parse(localStorage.getItem("threadUser"));

    if (loggedIn === "true" && user) {
        name.innerText = user.name;
        email.innerText = user.email;
    } else {
        window.location.href = "login.html";
    }

}

// Logout Button

function updateLoginUI() {

    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    if (localStorage.getItem("loggedIn") === "true") {
        logoutBtn.style.display = "inline-block";
    } else {
        logoutBtn.style.display = "none";
    }

}

// Load everything

window.addEventListener("load", () => {
    loadAccount();
    updateLoginUI();
});


function updateProfileLink(){

    const profileLink = document.getElementById("profileLink");

    if(!profileLink) return;

    if(localStorage.getItem("loggedIn") === "true"){
        profileLink.href = "account.html";
    }else{
        profileLink.href = "login.html";
    }

}

function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
}