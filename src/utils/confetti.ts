import confetti from 'canvas-confetti';

export function fireCompletionConfetti() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.85 },
    colors: ['#6366f1', '#10b981', '#38bdf8', '#fbbf24'],
    ticks: 200,
    gravity: 1.2,
    scalar: 0.8,
  });
}

export function fireMilestoneConfetti() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#6366f1', '#10b981', '#818cf8', '#34d399', '#f59e0b']
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
