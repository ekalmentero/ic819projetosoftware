document.addEventListener("DOMContentLoaded", function() {
    var statusSelects = document.querySelectorAll(".status");

    statusSelects.forEach(function(select) {
        select.addEventListener("change", function() {
            var selectedOption = this.value;
            var targetClass = this.options[this.selectedIndex].dataset.target;

            var allDetails = document.querySelectorAll(".status-details");
            allDetails.forEach(function(detail) {
                detail.style.display = "none";
            });

            var detailsToShowElements = document.querySelectorAll(targetClass);
            detailsToShowElements.forEach(function(detail) {
                detail.style.display = "block";
            });
        });
    });
});