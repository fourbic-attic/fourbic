function loadDOM() {
  const menus = [...document.querySelectorAll(".nav_scroll li a")];

  // style active menu item
  menus.forEach((menu) => {
    const activeMenu = menu.dataset?.nav;
    if (activeMenu) {
      menu.classList.add("active");
    }
  });

  function handleSubscriptionForm(e) {
    e.preventDefault();
    const email = $("#sub-email").val();
    if (email.trim().length > 5 && email.includes("@")) {
      $(".form-message")
        .addClass("alert alert-info py-2")
        .text("Submitting email");
      $.ajax({
        type: "POST",
        url: "./mail.php?subscribe=true",
        dataType: "json",
        data: { email },
      })
        .then((res) => {
          $(".form-message")
            .addClass("alert alert-success py-2")
            .text(res.responseText);
          setTimeout(
            () =>
              $(".form-message")
                .removeClass("alert alert-success py-2")
                .text(""),
            3000
          );
        })
        .catch((error) => {
          $(".form-message")
            .addClass("alert alert-danger py-2")
            .text(error.responseText);
          setTimeout(
            () =>
              $(".form-message")
                .removeClass("alert alert-danger py-2")
                .text(""),
            3000
          );
        });
    } else {
      alert("Enter a valid email address.");
    }
  }

  function handleContactForm(e) {
    e.preventDefault();

    let errors = [];
    // extract values from form
    const message = $("#message").val();
    const name = $("#name").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const website = $("#website").val();
    const status = $("#status");
    // validation
    if (message.trim().length < 10) {
      errors.push("message");
    }
    if (name.trim().length < 3) {
      errors.push("name");
    }

    if (phone.trim().length < 7) {
      errors.push("phone");
    }
    if (email.trim().length < 7 && !email.includes("@")) {
      errors.push("email");
    }

    if (errors.length > 0) {
      $.each(errors, function (i) {
        const el = errors[i];
        $(`#error-${el}`).remove();
        $(`#${el}`).after(
          `<small id="error-${el}" class="text-danger ml-2 my-2 py-2">${el} is required</small>`
        );

        setTimeout(() => {
          $.each(errors, function (i) {
            const el = errors[i];
            $(`#error-${el}`).remove();
          });
        }, 3000);
      });
    } else {
      // send to server
      $("#status").addClass("alert alert-info py-2").text("Submitting details");
      $.ajax({
        type: "POST",
        url: "./mail.php?webform=true",
        dataType: "json",
        data: { message, name, email, phone, website },
      })
        .then((res) => {
          $("#status")
            .addClass("alert alert-success py-2")
            .text(res.responseText);
          //$("#contact-form").reset();
          setTimeout(() => {
            $("#status").removeClass("alert alert-success py-2").text("");
            document.getElementById("contact-form")?.reset();
          }, 3000);
        })
        .catch((error) => {
          $("#status")
            .addClass("alert alert-danger py-2 ")
            .text(error.responseText);

          setTimeout(
            () => $("#status").removeClass("alert alert-danger py-2").text(""),
            5000
          );
        });
    }
  }

  // contact form
  $("#contact-form").submit(handleContactForm);

  // subscribe news letter
  $("#contact_form").submit(handleSubscriptionForm);

  // footer year
  $("#year").text(new Date().getFullYear());
}

addEventListener("DOMContentLoaded", loadDOM);
