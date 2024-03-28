"use strict";
console.log("HEEEJ");
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-courseid');
            fetch(`/delete-course/${courseId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    window.location.reload(); // Ladda om sidan om kursen raderas framgångsrikt
                } else {
                    alert('Något gick fel när kursen skulle tas bort.');
                }
            });
        });
    });
});