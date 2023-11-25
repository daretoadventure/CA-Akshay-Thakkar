const navBtn = document.getElementById("navBtn");
const navLinks = document.getElementById("navLinksSm");
const navMenu = document.getElementById("navMenu");
navBtn.addEventListener("click", () => {
	console.log("clicked");
	navLinks.classList.toggle("active");
	if (navMenu.classList.contains("fa-bars")) {
		navMenu.classList.remove("fa-bars");
		navMenu.classList.add("fa-xmark");
	} else {
		navMenu.classList.add("fa-bars");
		navMenu.classList.remove("fa-xmark");
	}
});

const form = document.querySelector(".form");
const formData = new FormData(form);
const errorMsg = document.querySelector("#errorMsg");
const submitBtn = document.querySelector("#submit");
const validateField = document.querySelector("#validate");
const result = document.querySelector(".result");
const loader = document.querySelector(".loader");

const formSubmitUrl =
	"https://script.google.com/macros/s/AKfycbx_AO5Elibueh0xN_reLijhyAvhQsTK1TXEKLAWyxmIMeksqlA4YqGmDwnNt29O9CG3/exec";

function validateForm(form) {
	const formData = new FormData(form);
	const nameField = formData.get("Name");
	const phone = formData.get("Phone");
	const email = formData.get("Email");
	const qualification = formData.get("Course");
	console.log(qualification);
	let isValid = true;
	if (!nameField) {
		isValid = false;
		validateField.classList.add("validationError");
	} else if (!email) {
		isValid = false;
		validateField.classList.add("validationError");
	} else if (!phone) {
		isValid = false;
		validateField.classList.add("validationError");
	} else if (!qualification) {
		isValid = false;
		validateField.classList.add("validationError");
	} else {
		validateField.classList.remove("validationError");
	}
	return isValid;
}
form.addEventListener("submit", function (event) {
	event.preventDefault(); // Prevent the default form submission behavior
	let isValid = validateForm(form); // Validate form fields
	if (!isValid) {
		validateField.innerHTML = "All fields are required";
		return false;
	} else {
		validateField.innerHTML = "";
		console.log(...new FormData(form));
		loader.style.display = "block";

		fetch(formSubmitUrl, {
			method: "POST",
			body: new FormData(form),
		})
			.then((response) => {
				loader.style.display = "none";
				return response.json();
			})
			.then((data) => {
				loader.style.display = "none";
				// Display a success message
				result.innerHTML = "Thanks for your interest. We'll get in touch with you soon!";
				form.reset();
				window.location.href = "https://www.akshaythakkarclasses.com/";
			})
			.catch((error) => {
				loader.style.display = "none";
				console.log(error);
			});
	}
});
