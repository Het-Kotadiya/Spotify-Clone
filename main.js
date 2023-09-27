// Create an object to store audio elements
const audioElements = {};
const current_time = document.getElementsByClassName('current-time')[0];
const total_time = document.getElementsByClassName('total-time')[0];
const progressBar = document.getElementsByClassName('progress-bar')[0];
const progressSlider = document.getElementsByClassName('progress-bar')[0]; // Add the progress slider element

// Function to format time in minutes and seconds
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Get all elements with the class "play-pause"
const playPauseElements = document.querySelectorAll(".play-pause");

playPauseElements.forEach((playPauseElement, index) => {
    // Add a click event listener for each play-pause element
    playPauseElement.addEventListener("click", (event) => {
        // Get the clicked element
        const clickedElement = event.target;

        // Find the associated audio source from the data attribute
        const audioSrc = clickedElement.getAttribute("data-audio-src");

        // Check if the audio element already exists, if not, create it
        if (!audioElements[audioSrc]) {
            console.log('src created')
            audioElements[audioSrc] = new Audio(audioSrc);

            // Handle audio ending for this specific audio element
            audioElements[audioSrc].addEventListener("ended", () => {
                console.log('src song ended')
                clickedElement.classList.remove("pause");
            });

            audioElements[audioSrc].addEventListener("loadedmetadata", () => {
                // Update the total time
                const audioPlayer = audioElements[audioSrc];
                total_time.innerHTML = formatTime(audioPlayer.duration);

                // Update the progress slider's max value to match the audio duration
                progressSlider.max = audioPlayer.duration;
            });

            // Add a timeupdate event listener to update the current time in real time
            audioElements[audioSrc].addEventListener("timeupdate", () => {
                const audioPlayer = audioElements[audioSrc];
                current_time.innerHTML = formatTime(audioPlayer.currentTime);

                // Update the progress slider's value to match the current time
                progressSlider.value = audioPlayer.currentTime;
            });

            // Add an input event listener to allow seeking by dragging the progress slider
            progressSlider.addEventListener("input", () => {
                // Set the audio playback position based on the slider value
                audioPlayer.currentTime = progressSlider.value;
            });
        }

        const audioPlayer = audioElements[audioSrc];

        // Update the current time
        current_time.innerHTML = formatTime(audioPlayer.currentTime);

        if (audioPlayer.paused) {
            console.log('played')
            console.log(audioSrc)
            audioPlayer.play();
            clickedElement.classList.add("pause");
        } else {
            console.log('paused')
            audioPlayer.pause();
            // audioPlayer.currentTime = 0; // Reset the audio to the beginning
            clickedElement.classList.remove("pause");
        }
    });
});
