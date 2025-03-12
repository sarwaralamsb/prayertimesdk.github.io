document.addEventListener("DOMContentLoaded", function () {
    const prayerTimesContainer = document.getElementById("prayer-times");
    const dateContainer = document.getElementById("current-date");
    const translateBtn = document.getElementById("translate-btn");
    const pageTitle = document.getElementById("page-title");

    let selectedCity = "Copenhagen"; // Default city
    let selectedCountry = "DK"; // Default country
    let isDanish = true; // Default language is Danish

    // Function to fetch and display prayer times
    async function fetchPrayerTimes(city, country) {
        try {
            // Get today's date
            const today = new Date();
            const formattedDate = today.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            dateContainer.textContent = formattedDate;

            // Fetch prayer times from Aladhan API
            const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`);
            const data = await response.json();

            // Extract prayer times
            const timings = data.data.timings;
            const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

            // Clear existing content
            prayerTimesContainer.innerHTML = "";

            // Insert new prayer times
            prayers.forEach(prayer => {
                const prayerRow = document.createElement("dl");
                prayerRow.innerHTML = `
                    <dd class="prayer-name">${prayer}</dd>
                    <dt>${timings[prayer]}</dt>
                `;
                prayerTimesContainer.appendChild(prayerRow);
            });

        } catch (error) {
            console.error("Error fetching prayer times:", error);
            prayerTimesContainer.innerHTML = "<p>Failed to load prayer times. Please try again later.</p>";
        }
    }

    // Load default city on page load (Copenhagen)
    fetchPrayerTimes(selectedCity, selectedCountry);

    // Automatically select Copenhagen
    document.getElementById("copenhagen-name").classList.add("selected-city");

    // Add event listener to all city buttons
    document.querySelectorAll(".city-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent page reload
            selectedCity = this.getAttribute("data-city");
            selectedCountry = this.getAttribute("data-country");

            // Remove the 'selected-city' class from all cities
            document.querySelectorAll(".city-btn").forEach(link => {
                link.querySelector("strong").classList.remove("selected-city");
            });

            // Add the 'selected-city' class to the clicked city
            this.querySelector("strong").classList.add("selected-city");

            // Fetch prayer times for the selected city
            fetchPrayerTimes(selectedCity, selectedCountry);

            // Update the page title based on selected city
            pageTitle.textContent = `Prayer Times`;

            // Keep the language choice (don't toggle on city click)
            updateCityNamesAndPrayers();
        });
    });

    // Function to update city names and prayer names based on language
    function updateCityNamesAndPrayers() {
        if (isDanish) {
            pageTitle.textContent = "Bøn Tider"; // Translate title to Danish
            translateBtn.textContent = "English";

            // Translate city names
            document.querySelectorAll(".city-btn").forEach(button => {
                if (button.dataset.city === "Copenhagen") {
                    button.querySelector("strong").innerHTML = "København";
                } else if (button.dataset.city === "Aarhus") {
                    button.querySelector("strong").innerHTML = "Århus";
                } else if (button.dataset.city === "Odense") {
                    button.querySelector("strong").innerHTML = "Odense";
                } else if (button.dataset.city === "Malmo") {
                    button.querySelector("strong").innerHTML = "Malmö";
                }
            });

            // Translate prayer names
            document.querySelectorAll(".prayer-name").forEach(prayer => {
                if (prayer.textContent === "Fajr") {
                    prayer.textContent = "Fajr";
                } else if (prayer.textContent === "Sunrise") {
                    prayer.textContent = "Shuruk";
                } else if (prayer.textContent === "Dhuhr") {
                    prayer.textContent = "Dhuhr";
                } else if (prayer.textContent === "Asr") {
                    prayer.textContent = "Asr";
                } else if (prayer.textContent === "Maghrib") {
                    prayer.textContent = "Maghrib";
                } else if (prayer.textContent === "Isha") {
                    prayer.textContent = "Isha";
                }
            });
        } else {
            pageTitle.textContent = "Prayer Times"; // Translate title back to English
            translateBtn.textContent = "Dansk";

            // Translate city names back to English
            document.querySelectorAll(".city-btn").forEach(button => {
                if (button.dataset.city === "Copenhagen") {
                    button.querySelector("strong").innerHTML = "Copenhagen";
                } else if (button.dataset.city === "Aarhus") {
                    button.querySelector("strong").innerHTML = "Aarhus";
                } else if (button.dataset.city === "Odense") {
                    button.querySelector("strong").innerHTML = "Odense";
                } else if (button.dataset.city === "Malmo") {
                    button.querySelector("strong").innerHTML = "Malmo";
                }
            });

            // Translate prayer names back to English
            document.querySelectorAll(".prayer-name").forEach(prayer => {
                if (prayer.textContent === "Fajr") {
                    prayer.textContent = "Fajr";
                } else if (prayer.textContent === "Shuruk") {
                    prayer.textContent = "Sunrise";
                } else if (prayer.textContent === "Dhuhr") {
                    prayer.textContent = "Dhuhr";
                } else if (prayer.textContent === "Asr") {
                    prayer.textContent = "Asr";
                } else if (prayer.textContent === "Maghrib") {
                    prayer.textContent = "Maghrib";
                } else if (prayer.textContent === "Isha") {
                    prayer.textContent = "Isha";
                }
            });
        }
    }

    // Translate button functionality
    translateBtn.addEventListener("click", function () {
        isDanish = !isDanish;

        // Update city names and prayer names based on the new language setting
        updateCityNamesAndPrayers();
    });
});
