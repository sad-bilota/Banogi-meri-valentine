// ============= ELEMENTS =============
// Audio
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");

// Containers
const signupContainer = document.getElementById("signup-container");
const envelopeContainer = document.getElementById("envelope-container");
const page1Container = document.getElementById("page1-container");
const page2Container = document.getElementById("page2-container");
const page3Container = document.getElementById("page3-container");
const letterContainer = document.getElementById("letter-container");

// Signup elements
const nameInput = document.getElementById("name-input");
const signupBtn = document.getElementById("signup-btn");
const errorMessage = document.getElementById("error-message");

// User name displays
const userName1 = document.getElementById("user-name-1");
const userName3 = document.getElementById("user-name-3");

// Page 1 buttons (static)
const page1Yes = document.getElementById("page1-yes");
const page1No = document.getElementById("page1-no");

// Page 2 buttons (static)
const page2Yes = document.getElementById("page2-yes");
const page2No = document.getElementById("page2-no");

// Page 3 buttons (teleporting NO)
const page3Yes = document.getElementById("page3-yes");
const page3No = document.getElementById("page3-no");

// Replay button
const replayBtn = document.getElementById("replay-btn");

// ============= VARIABLES =============
let userNameValue = "";

// ============= MUSIC FUNCTIONS =============
function playMusic1() {
    music2.pause();
    music2.currentTime = 0;
    music1.volume = 0.5;
    music1.play().catch(err => console.log("Audio autoplay prevented:", err));
}

function playMusic2() {
    music1.pause();
    music1.currentTime = 0;
    music2.volume = 0.5;
    music2.play().catch(err => console.log("Audio play prevented:", err));
}

// ============= PAGE TRANSITION HELPERS =============
function hideAllContainers() {
    signupContainer.style.display = "none";
    envelopeContainer.style.display = "none";
    page1Container.style.display = "none";
    page2Container.style.display = "none";
    page3Container.style.display = "none";
    letterContainer.style.display = "none";
}

function showContainer(container, isEnvelope = false) {
    hideAllContainers();
    
    if (isEnvelope) {
        container.style.display = "flex";
    } else {
        container.style.display = "flex";
    }
    
    const letterWindow = container.querySelector(".letter-window");
    if (letterWindow) {
        setTimeout(() => {
            letterWindow.classList.add("open");
        }, 50);
    }
}

// ============= SIGNUP LOGIC =============
function handleSignup() {
    const name = nameInput.value.trim();
    
    if (!name) {
        errorMessage.textContent = "Please enter your name! 😺";
        return;
    }
    
    userNameValue = name;
    userName1.textContent = name;
    userName3.textContent = name;
    localStorage.setItem("valentineName", name);
    errorMessage.textContent = "";
    
    // Show envelope
    showContainer(envelopeContainer, true);
    
    // Play first music
    playMusic1();
}

signupBtn.addEventListener("click", handleSignup);

nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSignup();
    }
});

// ============= ENVELOPE CLICK =============
envelopeContainer.addEventListener("click", () => {
    showContainer(page1Container);
});

// ============= PAGE 1 LOGIC (Static buttons) =============
// YES button - go to success
page1Yes.addEventListener("click", () => {
    playMusic2();
    showFinalSuccess();
});

// NO button - go to page 2 (no movement, just click)
page1No.addEventListener("click", () => {
    showContainer(page2Container);
});

// ============= PAGE 2 LOGIC (Static buttons) =============
// YES button - go to page 3
page2Yes.addEventListener("click", () => {
    showContainer(page3Container);
});

// NO button - go to success
page2No.addEventListener("click", () => {
    playMusic2();
    showFinalSuccess();
});

// ============= PAGE 3 LOGIC (Teleporting NO button) =============
// NO button moves away on hover
page3No.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    page3No.style.transition = "transform 0.3s ease";
    page3No.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// NO button also moves on click
page3No.addEventListener("click", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    page3No.style.transition = "transform 0.3s ease";
    page3No.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES button - ONLY way to go to success
page3Yes.addEventListener("click", () => {
    playMusic2();
    showFinalSuccess();
});

// ============= FINAL SUCCESS FUNCTION =============
function showFinalSuccess() {
    showContainer(letterContainer);
    const letterWindow = letterContainer.querySelector(".letter-window");
    letterWindow.classList.add("final");
}

// ============= REPLAY LOGIC =============
replayBtn.addEventListener("click", () => {
    // Reset everything
    localStorage.removeItem("valentineName");
    nameInput.value = "";
    userNameValue = "";
    errorMessage.textContent = "";
    
    // Reset No button position on page 3
    page3No.style.transform = "";
    
    // Reset letter windows
    const letterWindows = document.querySelectorAll(".letter-window");
    letterWindows.forEach(window => {
        window.classList.remove("open", "final");
    });
    
    // Stop music 2 and play music 1
    playMusic1();
    
    // Show signup page
    hideAllContainers();
    signupContainer.style.display = "flex";
});

// ============= INITIALIZE =============
// Check if name is already saved
const savedName = localStorage.getItem("valentineName");
if (savedName) {
    nameInput.value = savedName;
    userNameValue = savedName;
    userName1.textContent = savedName;
    userName3.textContent = savedName;
}

// Try to autoplay music1 on first user interaction
document.addEventListener("click", function initAudio() {
    if (signupContainer.style.display !== "none") {
        playMusic1();
    }
    document.removeEventListener("click", initAudio);
}, { once: true });