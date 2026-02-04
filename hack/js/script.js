// Countdown Timer
const countdownDate = new Date("March 15, 2026 08:00:00").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

  if (distance < 0) {
    clearInterval(countdownInterval);
    const container = document.querySelector(".countdown-container");
    if (container) {
        container.innerHTML = '<h2 style="font-size: 36px; color: var(--primary);">🎉 Event is Live!</h2>';
    }
  }
};

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Multi-step Form
let currentStep = 1;

function nextStep(step) {
  // Update progress dots
  document.querySelectorAll(".progress-dot").forEach((dot, index) => {
    if (index < step) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Show correct step
  document
    .querySelectorAll(".form-step")
    .forEach((s) => s.classList.remove("active"));
  const stepEl = document.getElementById("step" + step);
  if (stepEl) stepEl.classList.add("active");

  currentStep = step;

  // Scroll to top of form
  const formContainer = document.querySelector(".form-container");
  if (formContainer) {
      formContainer.scrollIntoView({ behavior: "smooth" });
  }
}

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    const isActive = item.classList.contains("active");

    // Close all items
    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
      const ans = i.querySelector(".faq-answer");
      if (ans) ans.style.maxHeight = null;
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active");
      const answer = item.querySelector(".faq-answer");
      if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Form Submission
const regForm = document.getElementById("registrationForm");
if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
    
      // Show success message
      const formContainer = document.querySelector(".form-container");
      if (formContainer) {
          formContainer.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 24px;">🎉</div>
                    <h3 style="font-size: 28px; font-weight: 700; color: var(--gray-900); margin-bottom: 16px;">Registration Successful!</h3>
                    <p style="font-size: 16px; color: var(--gray-600); margin-bottom: 32px;">
                        Check your email for confirmation and payment details. We can't wait to see you at InnoHack 2026!
                    </p>
                    <a href="#" class="btn btn-primary">Join Discord Community</a>
                </div>
            `;
        
          // Scroll to success message
          formContainer.scrollIntoView({ behavior: "smooth" });
      }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Easter Egg - Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let kPosition = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[kPosition] || e.key === konamiCode[kPosition].toLowerCase()) {
        kPosition++;
        if (kPosition === konamiCode.length) {
            activateEasterEgg();
            kPosition = 0;
        }
    } else {
        kPosition = 0;
    }
});

function activateEasterEgg() {
    // Toggle Dark Theme
    document.body.classList.toggle('dark-theme');

    // Confetti
    if (typeof confetti !== 'undefined') {
        const duration = 3000;
        const end = Date.now() + duration;
        // GDSC Colors
        const colors = ['#4285F4', '#EA4335', '#34A853', '#FBBC04'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

// --- Hacker Terminal Logic ---
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.querySelector('.terminal-body');

if (terminalInput) {
    // Focus input on click
    const termWindow = document.querySelector('.terminal-window');
    if (termWindow) {
        termWindow.addEventListener('click', () => {
             terminalInput.focus();
        });
    }

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const rawInput = this.value.trim();
            const args = rawInput.toLowerCase().split(/\s+/);
            const command = args[0];
            
            // Add command line to output
            const cmdLine = document.createElement('div');
            cmdLine.className = 'command-line';
            cmdLine.innerHTML = `<span class="prompt">➜  ~</span> <span class="command">${escapeHtml(this.value)}</span>`;
            terminalOutput.appendChild(cmdLine);
            
            // Process command
            const response = document.createElement('div');
            response.className = 'response';
            
            if (command) {
                switch(command) {
                    case 'help':
                        response.innerHTML = 'Available commands: <br> - help: Show this list <br> - about: About InnoHack <br> - tracks: List 2026 tracks <br> - register: Registration link <br> - clear: Clear terminal <br> - whoami: Current user info';
                        break;
                    case 'about':
                        response.innerHTML = 'InnoHack 2026 is the largest student-run hackathon in the region. 36 hours. 500+ hackers. Infinite possibilities.';
                        break;
                    case 'tracks':
                        response.innerHTML = '1. HealthTech <br> 2. EdTech <br> 3. FinTech <br> 4. Sustainability <br> 5. Open Innovation';
                        break;
                    case 'register':
                    case 'join':
                        response.innerHTML = 'Redirecting to registration...';
                        setTimeout(() => {
                            const reg = document.getElementById('register');
                            if(reg) reg.scrollIntoView({ behavior: 'smooth' });
                        }, 1000);
                        break;
                    case 'clear':
                    case 'cls':
                        terminalOutput.innerHTML = `
                            <div class="command-line">
                                <span class="prompt">➜  ~</span> <span class="command">welcome</span>
                            </div>
                            <div class="response">
                                Welcome to InnoHack 2026 Terminal v1.0.0<br>
                                Type 'help' to see available commands or 'register' to join.
                            </div>
                        `;
                        response.remove(); // Don't append empty response
                        break;
                    case 'whoami':
                        response.innerHTML = 'guest@innohack-2026';
                        break;
                    case 'ls':
                    case 'dir':
                        response.innerHTML = 'index.html  css/  js/  assets/  README.md';
                        break;
                    case 'sudo':
                        response.innerHTML = 'Permission denied: you are not root. Try "admin"?';
                        break;
                    case 'date':
                        response.innerHTML = new Date().toString();
                        break;
                    case 'exit':
                        response.innerHTML = 'Closing session... (just kidding, stay a while!)';
                        break;
                    default:
                        response.innerHTML = `zsh: command not found: ${escapeHtml(command)}`;
                }
                
                if (command !== 'clear' && command !== 'cls') {
                    terminalOutput.appendChild(response);
                }
            } else {
                // Empty input
                response.remove();
            }
            
            // Clear input and scroll
            this.value = '';
            // Delay scroll slightly to ensure DOM update
            setTimeout(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }, 10);
        }
    });

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
