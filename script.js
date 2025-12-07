// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    const windowHeight = window.innerHeight;

    sections.forEach(sec => {
        let top = window.scrollY;
        let secTop = sec.offsetTop;
        let secHeight = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // calculate when 60% of section is visible
        let triggerPoint = secTop + secHeight * 0.50 - windowHeight;

        if(top >= triggerPoint && top < secTop + secHeight) {
            // active navbar links
            navLinks.forEach(links => links.classList.remove('active'));
            document.querySelector(`header nav a[href*=${id}]`).classList.add('active');

            // add animation class
            sec.classList.add('show-animate');
        } else {
            // remove animation if you want it to repeat
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);
}


const form = document.getElementById("contactForm");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone-number");
const subjectField = document.getElementById("subject");
const messageField = document.getElementById("message");
const responseDiv = document.getElementById("responseMessage");

// Show error
function showError(inputField, message) {
    responseDiv.textContent = message;
    responseDiv.style.color = "red";
    inputField.style.border = "2px solid red";
}

// Remove error
function removeError(inputField) {
    responseDiv.textContent = "";
    inputField.style.border = "";
}

// Validate Name
function validateName() {
    const value = nameField.value.trim();
    const pattern = /^[A-Za-z\s]{3,}$/;
    if (!pattern.test(value)) {
        showError(nameField, "Enter valid name (min 3 letters).");
        return false;
    }
    removeError(nameField);
    return true;
}

// Validate Email
function validateEmail() {
    const value = emailField.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) {
        showError(emailField, "Enter a valid email.");
        return false;
    }
    removeError(emailField);
    return true;
}

// Validate Phone
function validatePhone() {
    const value = phoneField.value.trim();
    const pattern = /^(97|98)\d{8}$/; // Nepal numbers, 10 digits
    if (!pattern.test(value)) {
        showError(phoneField, "Enter valid phone (starts with 97/98).");
        return false;
    }
    removeError(phoneField);
    return true;
}

// Validate Subject
function validateSubject() {
    const value = subjectField.value.trim();
    if (value.length < 5) {
        showError(subjectField, "Subject must be at least 5 characters.");
        return false;
    }
    removeError(subjectField);
    return true;
}

// Validate Message
function validateMessage() {
    const value = messageField.value.trim();
    if (value.length < 10) {
        showError(messageField, "Message must be at least 10 characters.");
        return false;
    }
    removeError(messageField);
    return true;
}

// Event listeners (blur)
nameField.addEventListener("blur", validateName);
emailField.addEventListener("blur", validateEmail);
phoneField.addEventListener("blur", validatePhone);
subjectField.addEventListener("blur", validateSubject);
messageField.addEventListener("blur", validateMessage);

// Reset error on input
[nameField, emailField, phoneField, subjectField, messageField].forEach(field => {
    field.addEventListener("input", () => removeError(field));
});

// Submit handler
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const valid =
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateSubject() &&
        validateMessage();

    if (valid) {
        const formData = new FormData(form);

        fetch("https://formspree.io/f/xnnbjkqe", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                responseDiv.innerHTML = "<p style='color:#00f56c;'>Message sent successfully!</p>";
                form.reset();
            } else {
                responseDiv.innerHTML = "<p style='color:red;'>Error sending message. Try again.</p>";
            }
        })
        .catch(error => {
            responseDiv.innerHTML = "<p style='color:red;'>Error: " + error.message + "</p>";
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const month = today.getMonth() + 1; // JS months are 0–11
  const day = today.getDate();        

  // Change this date (example: August 30)
  const specialMonth = 12; 
  const specialDay = 9;  

  if (month === specialMonth && day === specialDay) {
    // Play background song (looping)
    const song = document.getElementById("birthdaySong");
    song.play().catch(err => {
      console.log("Autoplay blocked. User must click to start music.");
    });

    // Only run confetti if the library is loaded
    if (typeof confetti === "function") {
      setInterval(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { x: 1, y: Math.random() }
        });
      }, 1000);

      setInterval(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { x: 0.6, y: Math.random() }
        });
      }, 1000);
    }

    const banner = document.createElement("div");
    banner.className = "birthday-banner";
    banner.innerHTML = `<span class="birthday-banner-inner">🎉 Happy Birthday 🎉</span>`;
    document.body.appendChild(banner);
  }
}
);
