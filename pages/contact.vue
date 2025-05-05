<template>
  <div class="contact-page">
    <div class="container">
      <h1 class="page-title">Contact Us</h1>
      <p class="page-subtitle">Get in touch with our team</p>
      
      <div class="contact-container">
        <div class="contact-info">
          <h2>Contact Information</h2>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          
          <div class="contact-method">
            <div class="contact-icon">✉️</div>
            <div>
              <h3>Email</h3>
              <a href="mailto:contact@aitoolsdirectory.com">contact@aitoolsdirectory.com</a>
            </div>
          </div>
          
          <div class="contact-method">
            <div class="contact-icon">📍</div>
            <div>
              <h3>Location</h3>
              <p>123 AI Street<br>San Francisco, CA 94107</p>
            </div>
          </div>
          
          <div class="social-links">
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">GitHub</a>
          </div>
        </div>
        
        <form class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Your name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" required>
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" placeholder="How can we help?">
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your message here..."></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  padding: 2rem 0 4rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.page-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.contact-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.contact-method h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.contact-method a {
  color: #3b82f6;
  text-decoration: none;
}

.contact-method a:hover {
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  color: #3b82f6;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: #3b82f6;
  color: white;
}

.contact-form {
  background: #f9fafb;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #2563eb;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    margin-bottom: 2rem;
  }
}
</style>
