/**
 * view-onboarding.js
 * Modal d'onboarding affiché uniquement au premier lancement
 */

class ViewOnboarding extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <div class="onboarding-modal">
          <button class="onboarding-close" aria-label="Fermer l'onboarding">×</button>
          
          <div class="onboarding-content">
            <h2 id="onboarding-title">👋 Bienvenue sur StudyMate !</h2>
            
            <p class="onboarding-intro">
              Votre compagnon d'apprentissage. 
              Révisez efficacement avec des quiz, flashcards et fiches de révision.
            </p>

            <div class="onboarding-features">
              <div class="feature-item">
                <span class="feature-icon">📝</span>
                <div class="feature-text">
                  <strong>Quiz interactifs</strong>
                  <p>Modes entraînement, examen et révision d'erreurs</p>
                </div>
              </div>

              <div class="feature-item">
                <span class="feature-icon">🃏</span>
                <div class="feature-text">
                  <strong>Flashcards</strong>
                  <p>Apprentissage par répétition espacée</p>
                </div>
              </div>

              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <div class="feature-text">
                  <strong>Dashboard & Stats</strong>
                  <p>Suivez votre progression en temps réel</p>
                </div>
              </div>

              <div class="feature-item">
                <span class="feature-icon">📚</span>
                <div class="feature-text">
                  <strong>Thèmes personnalisés</strong>
                  <p>Importez vos propres questions (JSON ou PDF)</p>
                </div>
              </div>
            </div>

            <div class="onboarding-offline">
              <div class="offline-badge">
                <span>⚡</span>
                <strong>Application PWA</strong>
              </div>
              <p>
                <strong>Fonctionne 100% hors-ligne</strong> après la première visite. 
                Vos données restent privées et stockées localement sur votre appareil.
              </p>
              <p class="install-hint">
                💡 Installez l'application sur votre écran d'accueil pour une expérience optimale !
              </p>
            </div>

            <button class="btn primary onboarding-cta">
              C'est parti ! 🚀
            </button>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const closeBtn = this.querySelector('.onboarding-close');
    const ctaBtn = this.querySelector('.onboarding-cta');
    const overlay = this.querySelector('.onboarding-overlay');

    const closeOnboarding = () => {
      this.classList.add('closing');
      setTimeout(() => {
        this.hidden = true;
        this.classList.remove('closing');
        // Marquer l'onboarding comme vu
        localStorage.setItem('studymate_onboarding_seen', 'true');
      }, 300);
    };

    closeBtn?.addEventListener('click', closeOnboarding);
    ctaBtn?.addEventListener('click', closeOnboarding);
    
    // Fermer en cliquant sur l'overlay (pas sur le modal)
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOnboarding();
      }
    });

    // Fermer avec Échap
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !this.hidden) {
        closeOnboarding();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  /**
   * Vérifier si l'onboarding doit être affiché
   * @returns {boolean}
   */
  static shouldShow() {
    return !localStorage.getItem('studymate_onboarding_seen');
  }

  /**
   * Réinitialiser l'onboarding (pour debug)
   */
  static reset() {
    localStorage.removeItem('studymate_onboarding_seen');
  }
}

// Enregistrer le composant
customElements.define('view-onboarding', ViewOnboarding);
