const hireMeButton = document.querySelector("#hire-me");
const navMenuButton = document.querySelector("#nav");
const form = document.querySelector("#my-form");

function navMenu() {
  if (navMenuButton.style.display === "block") {
    navMenuButton.style.display = "none";
  } else {
    navMenuButton.style.display = "block";
  }
}

function goToContactForm() {
  location.href = "#contact";
}

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.querySelector("#my-form-status");
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
