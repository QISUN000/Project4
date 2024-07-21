/********f************
    
	Project 4 
	Name: QI SUN
    Date: JULY 20, 2024
	Description:

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	let errorFlag = false;
	const regexPatterns = {
		phone: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
		email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	};
	
	// Text validation
	let requiredFields = ["name", "phone", "email"];

	function formFieldHasInput(element) {
		if (element.value == null || element.value.trim() == "") {
			return false;
		}
		return true;
	}

	for (let i = 0; i < requiredFields.length; i++) {
		let textField = document.getElementById(requiredFields[i]);
		if (!formFieldHasInput(textField)) {
			document.getElementById(requiredFields[i] + "_error")
				.style.display = "block";
			
			if (!errorFlag) {
				textField.focus();
				textField.select();
			}
			errorFlag = true;
		}
	}

	// Phone validation
	let phoneNum = document.getElementById("phone").value;

	if (phoneNum !== "") {
		if (!regexPatterns.phone.test(phoneNum)) {
			document.getElementById("invalidPhone_error")
				.style.display = "block";
			
			if (!errorFlag) {
				document.getElementById("phone").focus();
				document.getElementById("phone").select();
			}

			errorFlag = true;
		}
	}

	// Email validation
	let emailAddress = document.getElementById("email").value;
	if (emailAddress !== "") {
		if (!regexPatterns.email.test(emailAddress)) {
			document.getElementById("emailformat_error")
				.style.display = "block";
			
			if (!errorFlag) {
				document.getElementById("email").focus();
				document.getElementById("email").select();
			}

			errorFlag = true;
		}
	}
	
	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting its display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {
	// Call a function called hideErrors() that will hide all the error messages. 
	hideErrors();

	// Add event listener for the form submit
	document.getElementById("surveyForm").addEventListener("submit", validate);

	// Add event listener for the form reset
	document.getElementById("surveyForm").addEventListener("reset", resetForm);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
