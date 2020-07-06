import fireMagic from './asset/fire-magic.wav';
import fireplace from './asset/fireplace.wav';
const cast = () => {
  const particles = document.querySelectorAll('.fire div');
  if (!document.querySelector('.particle--explode')) {
    window.fireSound.pause();
    window.explodeSound.play();
  } else {
    window.fireSound.play();
  }
  particles.forEach((p) => {
    p.classList.toggle('particle--explode');
    setTimeout(() => {
      if (!p.classList.contains('particle--explode')) {
        p.setAttribute('style', '');
      } else {
        p.setAttribute(
          'style',
          `transform: translate(
            ${80 * Math.random() - 40}vw,
            ${80 * Math.random() - 40}vh
          ) scale(0);`
        );
      }
    }, 1);
  });
};

const load = async () => {
  const audio = new Audio(fireplace);
  audio.type = 'audio/wav';
  audio.loop = true;
  window.fireSound = audio;

  const audio2 = new Audio(fireMagic);
  audio2.type = 'audio/wav';
  window.explodeSound = audio2;
  try {
    await audio.play();
    document.querySelector('.content').classList.toggle('content--show');
    document.querySelector('.load-btn').classList.toggle('load-btn--hide');
    console.log('Playing...');
  } catch (err) {
    console.log('Failed to play...' + err);
  }
};

window.load = load;
window.cast = cast;
