document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const role = document.getElementById("archetypeSelect").value;

            if (!role) {
                alert("Please select a role.");
                return;
            }

            switch (role) {
                case "student":
                    window.location.href = "student.html";
                    break;
                case "super_admin":
                    window.location.href = "admin.html";
                    break;
                case "counselor":
                    window.location.href = "counselor/counselor.html";
                    break;
                case "consultant":
                case "app_associate":
                case "content_writer":
                case "lrt_specialist":
                    window.location.href = "staff.html";
                    break;
                default:
                    alert("Invalid role selected.");
            }
        });
    }
});
