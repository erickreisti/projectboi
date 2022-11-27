"strict mode";

requestValid = document.querySelector(".info-message");
btnRequest = document.querySelector(".btnSubmit");

// Funcionando

function SendMail() {
  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    date: document.getElementById("date").value,
    persons: document.getElementById("persons").value,
    message: document.getElementById("message").value,
  };

  if (Object.values(params).some((e) => !e)) {
    console.log("error");
  } else {
    emailjs.send("gmailmessage", "template_b8qw9ks", params).then(function () {
      requestValid.classList.remove("hidden");
      console.log("SUCCESS!");
    });
  }
}

btnRequest.addEventListener("click", SendMail);

// VAIDAÇÃO DE FORMULARIO
(() => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
