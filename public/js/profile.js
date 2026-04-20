document.addEventListener("DOMContentLoaded", function () {

    const editBtn = document.getElementById("editProfileBtn");

    editBtn.addEventListener("click", function () {
        window.location.href = "edit-profile.html";
    });

});
function goToCertificate() {
  window.location.href = "../student/certificate.html";
}
