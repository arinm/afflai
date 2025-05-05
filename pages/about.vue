<template>
  <div class="about-page">
    <div class="container">
      <h1 class="page-title">About AI Tools Directory</h1>
      <p class="page-subtitle">Your trusted source for discovering the best AI tools and resources</p>
      
      <div class="about-content">
        <section class="about-section">
          <h2>Our Mission</h2>
          <p>
            At AI Tools Directory, we're dedicated to helping individuals and businesses discover and leverage
            the power of artificial intelligence through carefully curated tools and resources.
          </p>
        </section>

        <section class="about-section">
          <h2>What We Do</h2>
          <p>
            We provide comprehensive, unbiased reviews of AI tools across various categories, helping you make
            informed decisions about which solutions best fit your needs.
          </p>
          <ul class="feature-list">
            <li>Comprehensive tool listings</li>
            <li>Detailed comparisons</li>
            <li>User reviews and ratings</li>
            <li>Latest AI trends and news</li>
          </ul>
        </section>

        <section class="about-section">
          <h2>Our Team</h2>
          <div class="team-grid">
            <div class="team-member">
              <!-- <img src="/images/placeholder-avatar.jpg" alt="Team Member" class="team-avatar" /> -->
              <h3>John Doe</h3>
              <p class="role">Founder & CEO</p>
            </div>
            <div class="team-member">
              <!-- <img src="/images/placeholder-avatar.jpg" alt="Team Member" class="team-avatar" /> -->
              <h3>Jane Smith</h3>
              <p class="role">AI Research Lead</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 2rem 0;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.page-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
}

.about-section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1.25rem;
  color: #1a1a1a;
}

p {
  line-height: 1.7;
  color: #4a4a4a;
  margin-bottom: 1.5rem;
}

.feature-list {
  list-style: disc;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
}

.feature-list li {
  margin-bottom: 0.5rem;
  color: #4a4a4a;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-member {
  text-align: center;
}

.team-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #f0f0f0;
}

.team-member h3 {
  margin: 0.5rem 0 0.25rem;
  font-size: 1.25rem;
}

.role {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .team-member {
    margin-bottom: 2rem;
  }
}
</style>
