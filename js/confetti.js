export const launchConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
  
    (function frame() {
      confetti({
        particleCount: 5,
        spread: 100,
        origin: { y: 0.6 },
      });
  
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };  