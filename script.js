// Mobile Menu Toggle (existing)
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling (existing)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
    });
});

// Testimonial Slider (existing)
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

setInterval(nextTestimonial, 5000);
showTestimonial(0);

// Form Submission (existing)
const appointmentForm = document.querySelector('.appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Appointment booked successfully! We will contact you shortly.');
        appointmentForm.reset();
    });
}

// Login/Registration System
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const closeBtns = document.querySelectorAll('.close-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const patientDashboard = document.getElementById('patient-dashboard');
const logoutBtn = document.getElementById('logout-btn');
const patientName = document.getElementById('patient-name');

// Sample user data (in a real app, this would be server-side)
const users = [
    { username: 'patient1', email: 'patient1@example.com', password: 'password123', name: 'John Doe' }
];

// Open login modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Switch to registration modal
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
});

// Switch back to login modal
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check credentials
    const user = users.find(u => 
        (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
        // Successful login
        loginModal.style.display = 'none';
        document.querySelector('header').style.display = 'none';
        patientDashboard.style.display = 'block';
        patientName.textContent = user.name;
        
        // Load sample appointments
        const appointmentsList = document.getElementById('appointments-list');
        appointmentsList.innerHTML = `
            <div class="appointment-item">
                <div>
                    <strong>Dr. Smith</strong>
                    <p>Cardiology Checkup</p>
                </div>
                <div>
                    <p>Tomorrow, 10:00 AM</p>
                </div>
            </div>
            <div class="appointment-item">
                <div>
                    <strong>Dr. Lee</strong>
                    <p>Follow-up Visit</p>
                </div>
                <div>
                    <p>June 15, 2:30 PM</p>
                </div>
            </div>
        `;
    } else {
        alert('Invalid username or password');
    }
});

// Registration form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    // Add new user (in a real app, this would be sent to a server)
    users.push({
        username: email.split('@')[0],
        email,
        password,
        name,
        phone
    });
    
    alert('Registration successful! You can now login.');
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
    registerForm.reset();
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    patientDashboard.style.display = 'none';
    document.querySelector('header').style.display = 'block';
});

// Live Chat System
const chatBtn = document.getElementById('chat-btn');
const chatContainer = document.getElementById('chat-container');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Mobile Menu Toggle
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Remove Menu When Clicking Nav Links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    });
});

// Change Header Background on Scroll
window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    
    if(window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    } else {
        document.querySelector('.header').classList.remove('active');
    }
};

// Initialize Header on Load
window.onload = () => {
    if(window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    } else {
        document.querySelector('.header').classList.remove('active');
    }
};

// Smooth Scrolling for All Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
document.querySelector('.book .row form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Appointment booked successfully! We will contact you shortly.');
    this.reset();
});

// Review Stars Animation
document.querySelectorAll('.review .box-container .box .stars i').forEach(star => {
    star.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.3)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    star.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
// AI Assistant Functionality
document.addEventListener('DOMContentLoaded', function() {
    const aiBtn = document.getElementById('ai-assistant-btn');
    const chatContainer = document.querySelector('.ai-chat-container');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // Toggle chat window
    aiBtn.addEventListener('click', function() {
        chatContainer.style.display = 'flex';
    });
    
    closeBtn.addEventListener('click', function() {
        chatContainer.style.display = 'none';
    });
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        
        // Simulate typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-message ai-message-bot';
        typingIndicator.innerHTML = '<p class="typing"><span>.</span><span>.</span><span>.</span></p>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Process message after a short delay
        setTimeout(() => {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Get AI response
            const response = getAIResponse(message);
            addMessage(response, 'bot');
        }, 1500);
    }
    
    // Send message on button click or Enter key
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${sender}`;
        
        // Format links and lists in responses
        let formattedText = text;
        if (sender === 'bot') {
            // Convert markdown-like links to HTML
            formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
            // Convert newlines to paragraphs
            formattedText = formattedText.split('\n').join('</p><p>');
            formattedText = `<p>${formattedText}</p>`;
        }
        
        messageDiv.innerHTML = formattedText;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // AI response logic
    function getAIResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // Website information responses
        if (lowerMsg.includes('website') || lowerMsg.includes('healthmate') || lowerMsg.includes('service')) {
            if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
                return "You can book appointments through our website by visiting the 'Book Now' section. We offer both virtual and in-person consultations. [Book an appointment now](#book)";
            }
            if (lowerMsg.includes('doctor') || lowerMsg.includes('specialist')) {
                return "We have over 140 specialists available across various fields. You can view our specialists in the 'Doctors' section. [Meet our specialists](#doctors)";
            }
            if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
                return "HealthMate offers:\n- Video consultations\n- Symptom analysis\n- Medication management\n- Health record storage\n- Bill payment integration\nLearn more in our [Services section](#services)";
            }
            if (lowerMsg.includes('contact') || lowerMsg.includes('reach')) {
                return "You can contact us via:\nPhone: +123-456-7890\nEmail: info@healthmate.com\nOr visit our contact information in the footer for more options.";
            }
            return "HealthMate is a digital health platform providing AI-assisted health assessments and virtual care services. We help patients connect with doctors, manage medications, and access health information easily.";
        }
        
        // Health-related responses
        if (lowerMsg.includes('headache')) {
            return "Headaches can have many causes including stress, dehydration, or underlying conditions. For mild headaches:\n- Drink water\n- Rest in a quiet room\n- Apply a cool compress\nIf severe or persistent, consult a doctor.";
        }
        
        if (lowerMsg.includes('fever') || lowerMsg.includes('temperature')) {
            return "Normal body temperature is around 98.6°F (37°C). For adults, seek medical attention if:\n- Fever above 103°F (39.4°C)\n- Fever lasts more than 3 days\n- Accompanied by severe symptoms\nFor children, consult a doctor for any fever in infants under 3 months.";
        }
        
        if (lowerMsg.includes('cold') || lowerMsg.includes('flu')) {
            return "Common cold and flu symptoms include cough, sore throat, and congestion. Recommendations:\n- Get plenty of rest\n- Stay hydrated\n- Use over-the-counter meds for symptoms\n- Consider a flu shot for prevention\nIf symptoms worsen or persist, consult a doctor.";
        }
        
        if (lowerMsg.includes('covid') || lowerMsg.includes('coronavirus')) {
            return "COVID-19 symptoms may include fever, cough, and difficulty breathing. If you suspect COVID-19:\n- Isolate yourself\n- Get tested\n- Monitor symptoms\n- Seek emergency care for severe symptoms like trouble breathing\nFor current guidelines, visit [CDC website](https://www.cdc.gov)";
        }
        
        if (lowerMsg.includes('pain')) {
            if (lowerMsg.includes('chest')) {
                return "Chest pain can be serious. Seek immediate medical attention if you experience:\n- Pressure or squeezing in chest\n- Pain spreading to arm/jaw\n- Shortness of breath\n- Nausea or dizziness";
            }
            if (lowerMsg.includes('stomach') || lowerMsg.includes('abdominal')) {
                return "Abdominal pain can result from many causes. See a doctor if:\n- Pain is severe\n- Lasts more than a few days\n- Accompanied by fever/vomiting\n- Blood in stool\nFor mild cases, try rest and hydration.";
            }
            return "For persistent or severe pain, please consult a healthcare provider. I can help with general information but cannot diagnose specific conditions.";
        }
        
        if (lowerMsg.includes('emergency')) {
            return "For medical emergencies, please call your local emergency number immediately. This AI assistant cannot provide emergency services.";
        }
        
        // Default responses
        const defaultResponses = [
            "I'm an AI assistant and can provide general health information, but I can't diagnose conditions. For specific medical advice, please consult with one of our doctors.",
            "I recommend speaking with a healthcare professional about that. Would you like help booking an appointment?",
            "That's an important health question. Our specialists would be happy to discuss this with you in a consultation.",
            "I can provide general information, but for personal medical advice, please schedule a consultation with one of our doctors.",
            "HealthMate offers video consultations with qualified doctors who can better address your specific concerns."
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});
// Auth System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const switchForms = document.querySelectorAll('.switch-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginUserForm = document.getElementById('loginUser');
    const registerUserForm = document.getElementById('registerUser');
    const registerRole = document.getElementById('register-role');
    const doctorFields = document.getElementById('doctor-fields');
    const userMenu = document.querySelector('.user-menu');
    
    // Sample user data storage (in a real app, this would be server-side)
    let users = JSON.parse(localStorage.getItem('healthmate_users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('healthmate_currentUser')) || null;
    
    // Check if user is logged in on page load
    if (currentUser) {
        updateUserUI(currentUser);
    }
    
    // Modal toggle
    authBtn.addEventListener('click', function() {
        if (currentUser) {
            userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
        } else {
            authModal.style.display = 'block';
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    });
    
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
        if (!event.target.closest('.user-controls') && userMenu.style.display === 'block') {
            userMenu.style.display = 'none';
        }
    });
    
    // Switch between login and register forms
    switchForms.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Show/hide doctor fields on registration
    registerRole.addEventListener('change', function() {
        doctorFields.style.display = this.value === 'doctor' ? 'block' : 'none';
    });
    
    // Login form submission
    loginUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;
        
        // Find user
        const user = users.find(u => u.email === email && u.role === role);
        
        if (user && user.password === password) {
            currentUser = user;
            localStorage.setItem('healthmate_currentUser', JSON.stringify(currentUser));
            updateUserUI(currentUser);
            authModal.style.display = 'none';
            alert(`Welcome back, ${user.name}!`);
        } else {
            alert('Invalid credentials or user not found. Please try again.');
        }
    });
    
    // Registration form submission
    registerUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const role = document.getElementById('register-role').value;
        const specialization = document.getElementById('register-specialization').value;
        const license = document.getElementById('register-license').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Check if user already exists
        if (users.some(u => u.email === email)) {
            alert('User with this email already exists!');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            role,
            ...(role === 'doctor' && { specialization, license }),
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('healthmate_users', JSON.stringify(users));
        
        // Auto-login the new user
        currentUser = newUser;
        localStorage.setItem('healthmate_currentUser', JSON.stringify(currentUser));
        updateUserUI(currentUser);
        authModal.style.display = 'none';
        
        alert(`Registration successful! Welcome to Healthmate, ${name}!`);
        registerUserForm.reset();
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });
    
    // Logout functionality
    const logoutBtn = document.querySelector('.user-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentUser = null;
            localStorage.removeItem('healthmate_currentUser');
            updateUserUI(null);
            userMenu.style.display = 'none';
            alert('You have been logged out successfully.');
        });
    }
    
    // Update UI based on login state
    function updateUserUI(user) {
        if (user) {
            authBtn.innerHTML = `<i class="fas fa-user"></i> ${user.name.split(' ')[0]}`;
            
            // Update dashboard links based on user role
            const dashboardLink = document.querySelector('.user-dashboard');
            if (dashboardLink) {
                dashboardLink.href = `${user.role}-dashboard.html`;
                dashboardLink.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`;
            }
        } else {
            authBtn.innerHTML = '<i class="fas fa-user"></i> Login/Register';
        }
    }
    
    // Sample admin user for demonstration
    if (!users.some(u => u.role === 'admin')) {
        users.push({
            id: 'admin1',
            name: 'Admin User',
            email: 'admin@healthmate.com',
            password: 'admin123',
            role: 'admin',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('healthmate_users', JSON.stringify(users));
    }
});
// Auth System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const switchForms = document.querySelectorAll('.switch-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerRole = document.getElementById('register-role');
    const doctorFields = document.getElementById('doctor-fields');
    const userMenu = document.querySelector('.user-menu');
    
    // Sample user data storage
    let users = JSON.parse(localStorage.getItem('healthmate_users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('healthmate_currentUser')) || null;
    
    // Check if user is logged in on page load
    if (currentUser) {
        updateUserUI(currentUser);
    }
    
    // Modal toggle
    authBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        if (currentUser) {
            userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
        } else {
            authModal.style.display = 'block';
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
        if (!event.target.closest('.user-controls') && userMenu.style.display === 'block') {
            userMenu.style.display = 'none';
        }
    });
    
    // Switch between login and register forms
    switchForms.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Show/hide doctor fields on registration
    registerRole.addEventListener('change', function() {
        doctorFields.style.display = this.value === 'doctor' ? 'block' : 'none';
    });
    
    // Update UI based on login state
    function updateUserUI(user) {
        if (user) {
            authBtn.innerHTML = `<i class="fas fa-user"></i> ${user.name.split(' ')[0]}`;
            
            // Update dashboard links based on user role
            const dashboardLink = document.querySelector('.user-dashboard');
            if (dashboardLink) {
                dashboardLink.href = `${user.role}-dashboard.html`;
                dashboardLink.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`;
            }
        } else {
            authBtn.innerHTML = '<i class="fas fa-user"></i> Login/Register';
        }
    }
    
    // Close user menu when clicking elsewhere
    document.addEventListener('click', function() {
        if (userMenu.style.display === 'block') {
            userMenu.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements we need
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const switchForms = document.querySelectorAll('.switch-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerRole = document.getElementById('register-role');
    const doctorFields = document.getElementById('doctor-fields');
    const loginUserForm = document.getElementById('loginUser');
    const registerUserForm = document.getElementById('registerUser');
    const userMenu = document.querySelector('.user-menu');

    // Sample user data storage
    let users = JSON.parse(localStorage.getItem('healthmate_users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('healthmate_currentUser')) || null;

    // Check if user is logged in on page load
    if (currentUser) {
        updateUserUI(currentUser);
    }

    // Toggle auth modal or user menu
    authBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (currentUser) {
            // Toggle user menu if logged in
            userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
        } else {
            // Show auth modal if not logged in
            authModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (!e.target.closest('.user-controls') && userMenu.style.display === 'block') {
            userMenu.style.display = 'none';
        }
    });

    // Switch between login and register forms
    switchForms.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });

    // Show/hide doctor fields on registration
    registerRole.addEventListener('change', function() {
        doctorFields.style.display = this.value === 'doctor' ? 'block' : 'none';
    });

    // Login form submission
    loginUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;
        
        // Find user
        const user = users.find(u => u.email === email && u.role === role);
        
        if (user && user.password === password) {
            currentUser = user;
            localStorage.setItem('healthmate_currentUser', JSON.stringify(currentUser));
            updateUserUI(currentUser);
            authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            alert(`Welcome back, ${user.name}!`);
        } else {
            alert('Invalid credentials or user not found. Please try again.');
        }
    });

    // Registration form submission
    registerUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const role = document.getElementById('register-role').value;
        const specialization = document.getElementById('register-specialization').value;
        const license = document.getElementById('register-license').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Check if user already exists
        if (users.some(u => u.email === email)) {
            alert('User with this email already exists!');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            role,
            ...(role === 'doctor' && { specialization, license }),
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('healthmate_users', JSON.stringify(users));
        
        // Auto-login the new user
        currentUser = newUser;
        localStorage.setItem('healthmate_currentUser', JSON.stringify(newUser));
        updateUserUI(currentUser);
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        alert(`Registration successful! Welcome to Healthmate, ${name}!`);
        registerUserForm.reset();
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    // Logout functionality
    const logoutBtn = document.querySelector('.user-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentUser = null;
            localStorage.removeItem('healthmate_currentUser');
            updateUserUI(null);
            userMenu.style.display = 'none';
            alert('You have been logged out successfully.');
        });
    }

    // Update UI based on login state
    function updateUserUI(user) {
        if (user) {
            authBtn.innerHTML = `<i class="fas fa-user"></i> ${user.name.split(' ')[0]}`;
            
            // Update dashboard links based on user role
            const dashboardLink = document.querySelector('.user-dashboard');
            if (dashboardLink) {
                dashboardLink.href = `${user.role}-dashboard.html`;
                dashboardLink.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`;
            }
        } else {
            authBtn.innerHTML = '<i class="fas fa-user"></i> Login/Register';
        }
    }

    // Sample admin user for demonstration
    if (!users.some(u => u.role === 'admin')) {
        users.push({
            id: 'admin1',
            name: 'Admin User',
            email: 'admin@healthmate.com',
            password: 'admin123',
            role: 'admin',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('healthmate_users', JSON.stringify(users));
    }
});