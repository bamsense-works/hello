// ===========================
// BAMSense Works - AI Chat Assistant (Gemini Integration)
// ===========================

// ⚠️ SECURITY WARNING ⚠️
// This demo stores the API key in the frontend code, which is NOT SECURE for production.
//
// FOR PRODUCTION USE:
// 1. Create a backend API endpoint (e.g., /api/chat)
// 2. Store your Gemini API key in environment variables on the server
// 3. Have your frontend call your backend endpoint
// 4. Your backend proxies the request to Gemini API
//
// Example backend (Node.js/Express):
//   app.post('/api/chat', async (req, res) => {
//     const apiKey = process.env.GEMINI_API_KEY;
//     const response = await fetch(GEMINI_URL + `?key=${apiKey}`, ...);
//     res.json(await response.json());
//   });
//
// Then update this file to call: fetch('/api/chat', { method: 'POST', ... })

// For demo purposes only - REPLACE with environment variable or backend call
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // ⚠️ DO NOT commit real API keys
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// BAMSense Works Company Knowledge Base
const COMPANY_KNOWLEDGE = `
You are a helpful AI assistant for BAMSense Works, an education-focused AI technology company.

COMPANY INFORMATION:
- Company Name: BAMSense Works
- Mission: To empower academic institutions with practical, intelligent, and adaptive AI solutions that remove manual effort, improve learning outcomes, and modernize the entire educational journey.
- Vision: A world where every educational institution uses AI-driven systems to enhance student success, optimize faculty effort, streamline operations, personalize learning, and future-proof their academic ecosystem.
- Tagline: "Intelligence that powers education" / "AI that makes sense for education — and works"

CONTACT INFORMATION:
- Email: bamsense.works@gmail.com
- Address: Vyas Building, Shilpa Housing Society, Rambaug Colony, Kothrud, Pune, Maharashtra 411038, India
- Google Maps: https://maps.app.goo.gl/DhrmqyqrymeT7oGC6

PRODUCTS:
1. BAMSense StudentOS - Unified student lifecycle management platform
   - Features: Admission & onboarding, attendance tracking, performance analytics, personalized learning recommendations

2. BAMSense Faculty Assist - AI assistant that reduces faculty workload by 60-80%
   - Features: Automated grading, question paper generation, plagiarism detection, student progress analysis

3. BAMSense Recruit+ - AI-powered academic HR and recruitment
   - Features: Candidate shortlisting, credential verification, interview question generation, selection analytics

4. BAMSense Exam Intelligence - Next-generation assessment platform
   - Features: Skill-based question generation, automated evaluation, AI proctoring, Bloom's taxonomy alignment

5. BAMSense Docs - Digital document management system
   - Features: Blockchain-secured verification, credential management, automated workflows, compliance & audit trails

6. BAMSense CampusFlow - End-to-end campus operations automation
   - Features: Venue booking, budget approvals, hostel & transport management, event workflows

KEY BENEFITS:
- Built specifically for education (not generic ERP)
- Reduces manual work by 60-80%
- Data-driven decision making
- Student-centric design
- Enterprise-grade scalability
- Future-proof technology

Your role is to:
- Answer questions about BAMSense Works products and services
- Help visitors understand how our solutions can benefit their institution
- Provide contact information when requested
- Schedule demo requests by directing to bamsense.works@gmail.com
- Be friendly, professional, and knowledgeable about education technology

Always maintain a helpful and professional tone. If you don't know something, admit it and offer to connect them with the team via email.
`;

// Chat Elements
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Chat State
let conversationHistory = [];
let isProcessing = false;

// ===========================
// Chat Toggle Functionality
// ===========================
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.add('open');
        chatToggle.style.display = 'none';
        chatInput.focus();
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        chatToggle.style.display = 'flex';
    });
}

// ===========================
// Send Message Function
// ===========================
async function sendMessage(message) {
    if (!message.trim() || isProcessing) return;

    isProcessing = true;

    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    try {
        // Get AI response
        const response = await getGeminiResponse(message);

        // Remove typing indicator
        typingIndicator.remove();

        // Add AI response to chat
        addMessageToChat(response, 'bot');

    } catch (error) {
        console.error('Error getting AI response:', error);
        typingIndicator.remove();

        // User-friendly error message
        let errorMessage = "I apologize, but I'm having trouble connecting right now. ";

        if (error.message.includes('API')) {
            errorMessage += "The AI service is temporarily unavailable. ";
        } else if (error.message.includes('network') || error.message.includes('Failed to fetch')) {
            errorMessage += "Please check your internet connection. ";
        }

        errorMessage += "Here's what I can help with based on your question:";

        // Show error message with fallback
        addMessageToChat(errorMessage, 'bot');

        // Fallback response
        const fallbackResponse = getFallbackResponse(message);
        addMessageToChat(fallbackResponse, 'bot');
    } finally {
        isProcessing = false;
    }

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===========================
// Get Gemini AI Response
// ===========================
async function getGeminiResponse(userMessage) {
    // Check if API key is set
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        return getFallbackResponse(userMessage);
    }

    // Build conversation context
    const systemInstruction = {
        parts: [{
            text: COMPANY_KNOWLEDGE
        }]
    };

    // Build message history
    const contents = [
        {
            parts: [{
                text: userMessage
            }]
        }
    ];

    const payload = {
        systemInstruction,
        contents,
        generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 500,
        }
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            return aiResponse;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        return getFallbackResponse(userMessage);
    }
}

// ===========================
// Fallback Response (Rule-Based)
// ===========================
function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Product inquiries
    if (lowerMessage.includes('studentos') || lowerMessage.includes('student management')) {
        return "BAMSense StudentOS is our comprehensive student lifecycle management platform. It handles everything from admission and onboarding to performance analytics and personalized learning recommendations. Would you like to know more about specific features or schedule a demo?";
    }

    if (lowerMessage.includes('faculty') || lowerMessage.includes('teacher')) {
        return "BAMSense Faculty Assist is our AI-powered assistant that reduces faculty workload by 60-80%! It automates grading, generates question papers, detects plagiarism, and provides deep insights into student progress. This lets educators focus on what matters most - teaching and innovation.";
    }

    if (lowerMessage.includes('recruit') || lowerMessage.includes('hiring') || lowerMessage.includes('hr')) {
        return "BAMSense Recruit+ transforms academic hiring with AI-powered candidate matching, automated credential verification, and data-driven selection analytics. It makes hiring faster, fairer, and more effective. Interested in learning how it works?";
    }

    if (lowerMessage.includes('exam') || lowerMessage.includes('assessment') || lowerMessage.includes('test')) {
        return "BAMSense Exam Intelligence is our next-generation assessment platform with adaptive question generation, automated evaluation, AI proctoring, and comprehensive learning gap analysis. It's aligned with Bloom's taxonomy for educational best practices.";
    }

    if (lowerMessage.includes('docs') || lowerMessage.includes('document')) {
        return "BAMSense Docs provides blockchain-secured, tamper-proof digital document management for your entire institution. It handles transcripts, certificates, credentials, and workflows with complete audit trails and compliance.";
    }

    if (lowerMessage.includes('campus') || lowerMessage.includes('operations') || lowerMessage.includes('workflow')) {
        return "BAMSense CampusFlow automates end-to-end campus operations - from venue booking to budget approvals, hostel management to event coordination. AI intelligently routes approvals, predicts delays, and optimizes processes.";
    }

    // Contact and demo
    if (lowerMessage.includes('demo') || lowerMessage.includes('try') || lowerMessage.includes('test')) {
        return "I'd be happy to help you schedule a demo! Please email us at bamsense.works@gmail.com or visit our contact section. Our team will set up a personalized demonstration of our products tailored to your institution's needs.";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
        return `You can reach us at:\n\n📧 Email: bamsense.works@gmail.com\n📍 Address: Vyas Building, Shilpa Housing Society, Rambaug Colony, Kothrud, Pune, Maharashtra 411038\n\nFeel free to reach out anytime - we'd love to hear from you!`;
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        return "Our pricing is customized based on your institution's size, needs, and selected products. Please contact us at bamsense.works@gmail.com for a detailed quote tailored to your requirements. We offer flexible plans for institutions of all sizes!";
    }

    if (lowerMessage.includes('location') || lowerMessage.includes('office') || lowerMessage.includes('address')) {
        return `We're located at:\n\nVyas Building, Shilpa Housing Society\nRambaug Colony, Kothrud\nPune, Maharashtra 411038, India\n\nView on Google Maps: https://maps.app.goo.gl/DhrmqyqrymeT7oGC6`;
    }

    // Products overview
    if (lowerMessage.includes('products') || lowerMessage.includes('solutions') || lowerMessage.includes('what do you')) {
        return "BAMSense Works offers 6 comprehensive AI solutions for education:\n\n1. StudentOS - Student lifecycle management\n2. Faculty Assist - AI teaching assistant\n3. Recruit+ - Academic HR & recruitment\n4. Exam Intelligence - Assessment platform\n5. Docs - Digital document management\n6. CampusFlow - Campus operations automation\n\nWhich product interests you most?";
    }

    // Company info
    if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('company')) {
        return "BAMSense Works is an AI technology company specializing in intelligent solutions for educational institutions. Our mission is to empower academic institutions with practical AI that removes manual effort, improves learning outcomes, and modernizes the educational journey. We're building the AI Operating System for Education!";
    }

    // Benefits
    if (lowerMessage.includes('benefit') || lowerMessage.includes('why') || lowerMessage.includes('advantage')) {
        return "BAMSense Works stands out because we're:\n\n✓ Built specifically for education (not generic ERP)\n✓ Reduce workload by 60-80%\n✓ Data-driven decision making\n✓ Student-centric design\n✓ Enterprise-grade & scalable\n✓ Future-proof technology\n\nOur solutions are intelligence-first and education-focused from the ground up!";
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! 👋 Welcome to BAMSense Works! I'm here to help you learn about our AI solutions for education. Whether you're interested in student management, faculty assistance, or campus automation, I can provide information. What would you like to know?";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "You're welcome! If you have any more questions about BAMSense Works or our products, feel free to ask. I'm here to help! 😊";
    }

    // Default response
    return "Thank you for your question! I'm here to help you learn about BAMSense Works and our AI solutions for education. You can ask me about:\n\n• Our 6 products (StudentOS, Faculty Assist, Recruit+, etc.)\n• Scheduling a demo\n• Contact information\n• Benefits for your institution\n\nWhat would you like to know?";
}

// ===========================
// Add Message to Chat
// ===========================
function addMessageToChat(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

    const content = document.createElement('div');
    content.className = 'message-content';

    const text = document.createElement('p');
    text.textContent = message;

    content.appendChild(text);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatMessages.appendChild(messageDiv);

    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageDiv;
}

// ===========================
// Typing Indicator
// ===========================
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.setAttribute('aria-label', 'AI assistant is typing');

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.innerHTML = '<i class="fas fa-robot"></i>';

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = '<p><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>';

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    chatMessages.appendChild(typingDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typingDiv;
}

// ===========================
// Event Listeners
// ===========================
if (chatSend) {
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
        }
    });
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
            }
        }
    });
}

// ===========================
// Suggestion Chips
// ===========================
window.sendSuggestion = function(suggestion) {
    chatInput.value = suggestion;
    sendMessage(suggestion);
};

// ===========================
// Initialize Chat
// ===========================
console.log('%c💬 BAMSense AI Chat initialized', 'color: #0066FF; font-weight: bold;');

// Show initial greeting after short delay
setTimeout(() => {
    if (chatMessages.children.length <= 1) {
        // Initial message is already in HTML
    }
}, 500);

// ===========================
// API Key Check
// ===========================
if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('%c⚠️ Gemini API key not configured. Using fallback responses.', 'color: #ffbd2e; font-weight: bold;');
    console.log('%cTo enable AI responses, replace YOUR_GEMINI_API_KEY_HERE with your actual Gemini API key in chat.js', 'color: #7B8CA3;');
}

// ===========================
// Close chat on ESC key
// ===========================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
        chatToggle.style.display = 'flex';
    }
});
