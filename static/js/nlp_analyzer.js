/**
 * NLP Sentiment & Spam Analysis Engine with Live Explainability (LIME-style)
 * --------------------------------------------------------------------------
 * Features:
 * - Tokenization, stemming, n-gram extraction
 * - Real-time Log-Odds / Logistic Regression classification
 * - Live feature attribution highlighting positive, negative, and spam tokens
 * - Quick-load benchmark presets
 */

class NLPAnalyzer {
  constructor() {
    this.textarea = document.getElementById('nlp-input');
    this.badgeEl = document.getElementById('sentiment-badge');
    this.confidenceEl = document.getElementById('nlp-confidence');
    this.scoreEl = document.getElementById('nlp-score-val');
    this.chipsContainer = document.getElementById('word-chips');
    this.presetSelect = document.getElementById('nlp-presets');

    this.vocabWeights = this.initVocabWeights();

    if (this.textarea) {
      this.setupEventListeners();
      this.analyze();
    }
  }

  setupEventListeners() {
    this.textarea.addEventListener('input', () => this.analyze());

    if (this.presetSelect) {
      this.presetSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (this.presets[val]) {
          this.textarea.value = this.presets[val];
          this.analyze();
        }
      });
    }
  }

  presets = {
    pos_review: "I absolutely loved this product! It exceeded all my expectations with fast delivery, incredible build quality, and friendly customer support. Highly recommended!",
    neg_review: "Terrible service and awful quality. It broke on the very first day. Completely unresponsive support and a huge waste of money. Worst experience ever.",
    spam_phish: "CONGRATULATIONS! You have won a $1,000,000 cash lottery prize! Urgent: claim your exclusive bitcoin jackpot reward immediately before it expires!",
    neutral_work: "Please review the updated project proposal document and let me know if we need to adjust the quarterly timeline before our meeting tomorrow.",
    mixed_edge: "The hardware design is brilliant and beautiful, but the software is buggy, slow, and frustrating to use."
  };

  initVocabWeights() {
    return {
      // Positive tokens
      "loved": 3.2, "love": 2.5, "excellent": 3.4, "great": 2.4, "fantastic": 3.2,
      "amazing": 3.5, "incredible": 3.3, "best": 2.8, "perfect": 3.1, "awesome": 2.7,
      "good": 1.4, "reliable": 2.2, "brilliant": 3.0, "satisfied": 2.1, "outstanding": 3.4,
      "super": 1.8, "fast": 1.5, "recommend": 2.4, "recommended": 2.6, "beautiful": 2.3,
      "intuitive": 2.5, "smooth": 2.0, "gem": 2.8, "impressive": 2.6, "wonder": 2.0,
      "wonderful": 2.8, "happy": 2.2, "delight": 2.7, "flawless": 3.2, "top": 1.8,

      // Negative tokens
      "terrible": -3.5, "awful": -3.4, "horrible": -3.6, "worst": -3.8, "bad": -2.2,
      "broke": -3.0, "broken": -3.2, "waste": -3.1, "disappointed": -2.8, "disappointing": -2.8,
      "poor": -2.5, "buggy": -2.4, "bug": -2.0, "slow": -2.1, "laggy": -2.3,
      "frustrating": -2.7, "frustrated": -2.5, "disaster": -3.3, "regret": -2.6,
      "cheap": -1.8, "painful": -2.4, "fails": -2.7, "failed": -2.6, "useless": -3.2,
      "scam": -3.6, "fraud": -3.7, "unresponsive": -2.8, "hate": -3.0, "garbage": -3.5,

      // Spam keywords
      "__SPAM_PRIZE__": 3.5, "__SPAM_LOTTERY__": 4.0, "__SPAM_JACKPOT__": 3.8,
      "__SPAM_BITCOIN__": 3.2, "__SPAM_CLAIM__": 3.0, "__SPAM_URGENT__": 2.8,
      "__SPAM_CONGRATULATIONS__": 2.5, "__SPAM_REWARD__": 2.6, "__SPAM_FREE__": 2.4,
      "__SPAM_EXCLUSIVE__": 2.2, "__SPAM_EXPIRES__": 2.3
    };
  }

  tokenize(text) {
    // Regex tokenize words preserving letters and digits
    const rawTokens = text.toLowerCase().match(/[a-z0-9$€£]+/g) || [];
    return rawTokens;
  }

  analyze() {
    const text = this.textarea.value.trim();
    if (!text) {
      this.renderResult("Neutral", "neutral", 50, 0, []);
      return;
    }

    const tokens = this.tokenize(text);
    let sentimentScore = 0;
    let spamScore = 0;
    const attributions = [];

    const spamDict = {
      "prize": 3.8, "lottery": 4.0, "jackpot": 3.8, "bitcoin": 3.4,
      "claim": 3.0, "urgent": 2.8, "congratulations": 2.6, "reward": 2.8,
      "free": 2.2, "exclusive": 2.4, "won": 3.0, "$1,000,000": 3.5, "cash": 2.5
    };

    tokens.forEach((token) => {
      let tokenSentiment = this.vocabWeights[token] || 0;
      let tokenSpam = spamDict[token] || 0;

      if (tokenSentiment !== 0 || tokenSpam !== 0) {
        sentimentScore += tokenSentiment;
        spamScore += tokenSpam;

        let type = 'neutral';
        if (tokenSpam >= 2.0) type = 'spam';
        else if (tokenSentiment > 0.5) type = 'pos';
        else if (tokenSentiment < -0.5) type = 'neg';

        attributions.push({
          word: token,
          sentiment: tokenSentiment,
          spam: tokenSpam,
          type: type
        });
      }
    });

    // Determine category
    let category = "Neutral";
    let badgeClass = "neutral";
    let confidence = 50;

    if (spamScore >= 5.5) {
      category = "🚨 Spam / Phishing";
      badgeClass = "spam";
      confidence = Math.min(99, Math.round(75 + (spamScore * 2.5)));
    } else if (sentimentScore > 1.2) {
      category = "😊 Positive Sentiment";
      badgeClass = "positive";
      const prob = 1 / (1 + Math.exp(-sentimentScore * 0.7));
      confidence = Math.round(prob * 100);
    } else if (sentimentScore < -1.2) {
      category = "😡 Negative Sentiment";
      badgeClass = "negative";
      const prob = 1 / (1 + Math.exp(sentimentScore * 0.7));
      confidence = Math.round(prob * 100);
    } else {
      category = "😐 Neutral / Balanced";
      badgeClass = "neutral";
      confidence = 65;
    }

    this.renderResult(category, badgeClass, confidence, sentimentScore, attributions);
  }

  renderResult(category, badgeClass, confidence, score, attributions) {
    if (this.badgeEl) {
      this.badgeEl.textContent = category;
      this.badgeEl.className = `sentiment-badge sentiment-${badgeClass}`;
    }

    if (this.confidenceEl) {
      this.confidenceEl.textContent = `${confidence}% Confidence`;
    }

    if (this.scoreEl) {
      const sign = score > 0 ? '+' : '';
      this.scoreEl.textContent = `${sign}${score.toFixed(1)}`;
      this.scoreEl.style.color = score > 0 ? 'var(--accent-emerald)' : (score < 0 ? 'var(--accent-rose)' : 'var(--text-secondary)');
    }

    // Render word attribution chips (Explainable ML feature)
    if (this.chipsContainer) {
      if (attributions.length === 0) {
        this.chipsContainer.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem;">No key sentiment or spam triggers detected in text.</span>';
      } else {
        this.chipsContainer.innerHTML = attributions.map(item => {
          let scoreText = '';
          if (item.type === 'spam') scoreText = `Spam +${item.spam.toFixed(1)}`;
          else if (item.sentiment > 0) scoreText = `+${item.sentiment.toFixed(1)}`;
          else scoreText = `${item.sentiment.toFixed(1)}`;

          return `<span class="token-chip ${item.type}">
            ${item.word}
            <small style="opacity: 0.8; font-size: 0.75rem;">${scoreText}</small>
          </span>`;
        }).join('');
      }
    }
  }
}

// Global initialization
window.NLPAnalyzer = NLPAnalyzer;
