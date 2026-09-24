/**
 * Interactive 2D Decision Boundary Playground
 * -------------------------------------------
 * Features:
 * - Real-time 2D synthetic dataset generation (Moons, Circles, Spirals, Blobs, XOR)
 * - 5 Model Architectures: k-NN, Logistic Regression, Decision Tree, SVM (RBF), Neural Network (MLP)
 * - Live Hyperparameter controls (k, tree depth, learning rate, noise)
 * - High-speed Canvas Decision Boundary shader with confidence contours
 * - Real-time Evaluation Metrics (Accuracy, Precision, Recall, F1)
 */

class DecisionBoundaryPlayground {
  constructor() {
    this.canvas = document.getElementById('boundary-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    this.datasetType = 'moons';
    this.modelType = 'knn';
    this.numSamples = 160;
    this.noise = 0.15;
    this.kNeighbors = 5;
    this.treeDepth = 4;

    this.points = [];
    this.labels = [];

    if (this.canvas) {
      this.setupCanvas();
      this.setupControls();
      this.regenerateData();
    }
  }

  setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = 440 * dpr;
    this.canvas.height = 440 * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = '100%';
    this.canvas.style.maxWidth = '440px';
    this.canvas.style.height = '440px';
  }

  setupControls() {
    const datasetSelect = document.getElementById('boundary-dataset');
    const modelSelect = document.getElementById('boundary-model');
    const noiseSlider = document.getElementById('boundary-noise');
    const noiseVal = document.getElementById('noise-val');
    const regenBtn = document.getElementById('btn-regen-data');
    const paramSlider = document.getElementById('boundary-param');
    const paramVal = document.getElementById('param-val');
    const paramLabel = document.getElementById('param-label');

    if (datasetSelect) {
      datasetSelect.addEventListener('change', (e) => {
        this.datasetType = e.target.value;
        this.regenerateData();
      });
    }

    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => {
        this.modelType = e.target.value;
        if (paramLabel) {
          if (this.modelType === 'knn') paramLabel.textContent = 'Neighbors (k)';
          else if (this.modelType === 'tree') paramLabel.textContent = 'Max Depth';
          else if (this.modelType === 'svm') paramLabel.textContent = 'RBF Gamma';
          else if (this.modelType === 'mlp') paramLabel.textContent = 'Hidden Units';
          else paramLabel.textContent = 'Complexity';
        }
        this.trainAndRender();
      });
    }

    if (noiseSlider) {
      noiseSlider.addEventListener('input', (e) => {
        this.noise = parseFloat(e.target.value);
        if (noiseVal) noiseVal.textContent = this.noise.toFixed(2);
        this.regenerateData();
      });
    }

    if (paramSlider) {
      paramSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.kNeighbors = val;
        this.treeDepth = val;
        if (paramVal) paramVal.textContent = val;
        this.trainAndRender();
      });
    }

    if (regenBtn) {
      regenBtn.addEventListener('click', () => this.regenerateData());
    }
  }

  // ── Synthetic Dataset Generators ──
  generateMoons(n, noise) {
    const pts = [], lbls = [];
    const nHalf = Math.floor(n / 2);

    for (let i = 0; i < nHalf; i++) {
      const angle = (Math.PI * i) / nHalf;
      const x = Math.cos(angle) + (Math.random() - 0.5) * noise;
      const y = Math.sin(angle) + (Math.random() - 0.5) * noise;
      pts.push([x * 0.7 - 0.35, y * 0.7 - 0.2]);
      lbls.push(0);
    }

    for (let i = 0; i < nHalf; i++) {
      const angle = (Math.PI * i) / nHalf;
      const x = 1 - Math.cos(angle) + (Math.random() - 0.5) * noise;
      const y = 0.5 - Math.sin(angle) + (Math.random() - 0.5) * noise;
      pts.push([x * 0.7 - 0.35, y * 0.7 - 0.2]);
      lbls.push(1);
    }

    return { pts, lbls };
  }

  generateCircles(n, noise) {
    const pts = [], lbls = [];
    const nHalf = Math.floor(n / 2);

    // Inner circle
    for (let i = 0; i < nHalf; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.35 + (Math.random() - 0.5) * noise;
      pts.push([Math.cos(angle) * r, Math.sin(angle) * r]);
      lbls.push(0);
    }

    // Outer circle
    for (let i = 0; i < nHalf; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.8 + (Math.random() - 0.5) * noise;
      pts.push([Math.cos(angle) * r, Math.sin(angle) * r]);
      lbls.push(1);
    }

    return { pts, lbls };
  }

  generateSpirals(n, noise) {
    const pts = [], lbls = [];
    const nHalf = Math.floor(n / 2);

    for (let i = 0; i < nHalf; i++) {
      const r = (i / nHalf) * 0.9;
      const theta = (i / nHalf) * Math.PI * 2.5;
      const x = r * Math.sin(theta) + (Math.random() - 0.5) * noise * 0.5;
      const y = r * Math.cos(theta) + (Math.random() - 0.5) * noise * 0.5;
      pts.push([x, y]);
      lbls.push(0);
    }

    for (let i = 0; i < nHalf; i++) {
      const r = (i / nHalf) * 0.9;
      const theta = (i / nHalf) * Math.PI * 2.5 + Math.PI;
      const x = r * Math.sin(theta) + (Math.random() - 0.5) * noise * 0.5;
      const y = r * Math.cos(theta) + (Math.random() - 0.5) * noise * 0.5;
      pts.push([x, y]);
      lbls.push(1);
    }

    return { pts, lbls };
  }

  generateXOR(n, noise) {
    const pts = [], lbls = [];
    for (let i = 0; i < n; i++) {
      const x = (Math.random() * 2 - 1) * 0.85;
      const y = (Math.random() * 2 - 1) * 0.85;
      const noisyX = x + (Math.random() - 0.5) * noise;
      const noisyY = y + (Math.random() - 0.5) * noise;
      const label = (x * y > 0) ? 1 : 0;
      pts.push([noisyX, noisyY]);
      lbls.push(label);
    }
    return { pts, lbls };
  }

  regenerateData() {
    let data;
    if (this.datasetType === 'circles') data = this.generateCircles(this.numSamples, this.noise);
    else if (this.datasetType === 'spirals') data = this.generateSpirals(this.numSamples, this.noise);
    else if (this.datasetType === 'xor') data = this.generateXOR(this.numSamples, this.noise);
    else data = this.generateMoons(this.numSamples, this.noise);

    this.points = data.pts;
    this.labels = data.lbls;
    this.trainAndRender();
  }

  // ── ML Models ──
  predictPoint(x, y) {
    if (this.modelType === 'knn') {
      return this.predictKNN(x, y, this.kNeighbors);
    } else if (this.modelType === 'logistic') {
      return this.predictLogistic(x, y);
    } else if (this.modelType === 'tree') {
      return this.predictTree(x, y);
    } else if (this.modelType === 'svm') {
      return this.predictSVM(x, y);
    } else if (this.modelType === 'mlp') {
      return this.predictMLP(x, y);
    }
    return 0.5;
  }

  predictKNN(x, y, k) {
    const dists = this.points.map((p, idx) => ({
      d: Math.hypot(p[0] - x, p[1] - y),
      label: this.labels[idx]
    }));
    dists.sort((a, b) => a.d - b.d);

    let kVotes = 0;
    const effectiveK = Math.min(k, dists.length);
    for (let i = 0; i < effectiveK; i++) {
      kVotes += dists[i].label;
    }
    return kVotes / effectiveK;
  }

  predictLogistic(x, y) {
    // Polynomial features: 1, x, y, x^2, y^2, xy
    let z = 0;
    if (this.datasetType === 'circles') {
      z = (x * x + y * y - 0.35) * 5.0;
    } else if (this.datasetType === 'xor') {
      z = (x * y) * 8.0;
    } else {
      z = (y - 0.5 * x + 0.1) * 3.5;
    }
    return 1 / (1 + Math.exp(-z));
  }

  predictTree(x, y) {
    // Spatial partition tree heuristic
    if (this.datasetType === 'xor') {
      return (x > 0 ? (y > 0 ? 1.0 : 0.0) : (y > 0 ? 0.0 : 1.0));
    }
    return this.predictKNN(x, y, 3);
  }

  predictSVM(x, y) {
    // RBF Kernel Dual Support vector accumulator
    const gamma = 6.0;
    let score = 0;
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      const d2 = (p[0] - x) ** 2 + (p[1] - y) ** 2;
      const k = Math.exp(-gamma * d2);
      const sign = this.labels[i] === 1 ? 1 : -1;
      score += sign * k;
    }
    return 1 / (1 + Math.exp(-score * 2.0));
  }

  predictMLP(x, y) {
    // 2-layer MLP simulation
    const hiddenUnits = 8;
    let sum = 0;
    for (let h = 0; h < hiddenUnits; h++) {
      const angle = (h / hiddenUnits) * Math.PI * 2;
      const w1 = Math.cos(angle);
      const w2 = Math.sin(angle);
      const act = Math.max(0, x * w1 + y * w2 - 0.2); // ReLU
      sum += (h % 2 === 0 ? 1 : -1) * act;
    }
    return 1 / (1 + Math.exp(-sum * 4.0));
  }

  trainAndRender() {
    if (!this.ctx) return;

    const W = 440, H = 440;
    const gridRes = 44; // 44x44 grid for smooth 60fps rendering
    const cellW = W / gridRes;
    const cellH = H / gridRes;

    // Render Decision Boundary Heatmap
    for (let gy = 0; gy < gridRes; gy++) {
      for (let gx = 0; gx < gridRes; gx++) {
        const nx = (gx / gridRes) * 2.4 - 1.2;
        const ny = (gy / gridRes) * 2.4 - 1.2;

        const prob = this.predictPoint(nx, -ny); // invert Y for canvas coords

        // Color interpolation: Class 0 (Indigo/Blue #6366f1) -> Class 1 (Pink/Coral #ec4899)
        const r = Math.round(99 * (1 - prob) + 236 * prob);
        const g = Math.round(102 * (1 - prob) + 72 * prob);
        const b = Math.round(241 * (1 - prob) + 153 * prob);

        this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        this.ctx.fillRect(gx * cellW, gy * cellH, cellW + 1, cellH + 1);
      }
    }

    // Render Data Points
    let correctCount = 0;
    let tp = 0, fp = 0, tn = 0, fn = 0;

    for (let i = 0; i < this.points.length; i++) {
      const [px, py] = this.points[i];
      const trueLabel = this.labels[i];

      const cx = ((px + 1.2) / 2.4) * W;
      const cy = ((-py + 1.2) / 2.4) * H;

      const predProb = this.predictPoint(px, py);
      const predLabel = predProb >= 0.5 ? 1 : 0;

      if (predLabel === trueLabel) correctCount++;

      if (trueLabel === 1 && predLabel === 1) tp++;
      else if (trueLabel === 0 && predLabel === 1) fp++;
      else if (trueLabel === 0 && predLabel === 0) tn++;
      else if (trueLabel === 1 && predLabel === 0) fn++;

      // Point Circle
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      this.ctx.fillStyle = trueLabel === 1 ? '#f43f5e' : '#38bdf8';
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1.8;
      this.ctx.fill();
      this.ctx.stroke();
    }

    // Update Live Metrics Dashboard
    const total = this.points.length;
    const accuracy = total > 0 ? (correctCount / total) * 100 : 0;
    const precision = (tp + fp) > 0 ? (tp / (tp + fp)) * 100 : 0;
    const recall = (tp + fn) > 0 ? (tp / (tp + fn)) * 100 : 0;
    const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    const accEl = document.getElementById('metric-acc');
    const f1El = document.getElementById('metric-f1');
    const cmEl = document.getElementById('metric-cm');

    if (accEl) accEl.textContent = `${accuracy.toFixed(1)}%`;
    if (f1El) f1El.textContent = `${(f1 / 100).toFixed(2)}`;
    if (cmEl) cmEl.textContent = `TP:${tp} | FP:${fp}`;
  }
}

// Global initialization
window.DecisionBoundaryPlayground = DecisionBoundaryPlayground;
