  // SCRIPT 01
  // Reveal animations using Intersection Observer
const els = document.querySelectorAll('.reveal');
const ob = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('vis'),i*60);
      ob.unobserve(e.target);
    }
  });
},{threshold:0.08});
els.forEach(el=>ob.observe(el));

// SCRIPT 02
// Horizontal scroll drag for projects rows
document.querySelectorAll('.projects-scroll-wrap').forEach(wrap => {
  let isDown = false, startX, scrollLeft;
  let hasMoved = false; // Track if a real drag occurred

  wrap.addEventListener('mousedown', e => {
    isDown = true;
    hasMoved = false; // Reset on every new click
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
    // REMOVED: wrap.classList.add('is-dragging') from here
  });

  wrap.addEventListener('mouseleave', () => { 
    isDown = false; 
    wrap.classList.remove('is-dragging'); 
  });

  wrap.addEventListener('mouseup', () => { 
    isDown = false; 
    // Small timeout ensures the click event fires before the class drops
    setTimeout(() => {
      wrap.classList.remove('is-dragging'); 
    }, 50);
  });

  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    
    const x = e.pageX - wrap.offsetLeft;
    const walk = x - startX;

    // Only treat it as a drag if they move the mouse more than 5 pixels
    if (Math.abs(walk) > 5) {
      hasMoved = true;
      wrap.classList.add('is-dragging');
      e.preventDefault();
      wrap.scrollLeft = scrollLeft - walk * 1.2;
    }
  });

  // If they dragged, stop the link from opening. If they just clicked, let it go through!
  wrap.addEventListener('click', e => {
    if (hasMoved) {
      e.preventDefault();
    }
  });
});

  // SCRIPT 03
  // Select all elements with the card number class
document.querySelectorAll('.github-card-num,.exp-cell-num,.award-n').forEach((el, index) => {

  if (index % 2 === 0) {
    // Even index (1st, 3rd, 5th items...) -> Bright Bluish
    el.style.color = 'var(--accent-light)'; 
  } else {
    // Odd index (2nd, 4th, 6th items...) -> Dark Bluish
    el.style.color = 'var(--accent)'; 
  }
});

  // SCRIPT 3.2
  document.querySelectorAll('.github-card-num, .exp-cell-row, .award-cell').forEach((el, index) => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    const link = el.getAttribute('data-link');
    if (link) window.open(link, '_blank');
  });
});
// SCRIPT 04
// Simple email protection
  document.querySelectorAll('.contact-link .cl-handle').forEach(el => {
    const link = el.closest('.contact-link');
    const text = el.textContent;
    
    if (text.includes('@')) {
      link.href = `mailto:${text}`;
    } else if (text.startsWith('+')) {
      link.href = `https://wa.me/${text.substring(1)}`;
    }
  });