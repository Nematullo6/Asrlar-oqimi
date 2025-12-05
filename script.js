document.addEventListener("DOMContentLoaded",()=>{
  // Theme toggle with localStorage and SVG icons
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "dark";
  root.classList.toggle("light-mode", savedTheme === "light");
  
  // SVG icons
  const sunSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const moonSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  
  themeToggle.innerHTML = savedTheme === "light" ? sunSvg : moonSvg;
  
  themeToggle.addEventListener("click", ()=>{
    const isLightMode = root.classList.toggle("light-mode");
    const newTheme = isLightMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    themeToggle.innerHTML = isLightMode ? sunSvg : moonSvg;
  });

  // Set year in footer
  const yearEl=document.getElementById("year");if(yearEl)yearEl.textContent=new Date().getFullYear();

  // Toggle details
  document.querySelectorAll(".timeline-card").forEach(card=>{
    const btn=card.querySelector(".card-more");
    btn.addEventListener("click",()=>{
      const isOpen=card.classList.toggle("open");
      btn.textContent=isOpen? "Yopish" : "Batafsil";
      if(isOpen){
        document.querySelectorAll(".timeline-card.open").forEach(other=>{
          if(other!==card) {
            other.classList.remove("open");
            other.querySelector(".card-more").textContent="Batafsil";
          }
        })
      }
    });
  });

  // Keyboard accessibility: Enter on focused card-more
  document.addEventListener("keydown",e=>{
    if(e.key==="Enter"){
      const active=document.activeElement;
      if(active && active.classList && active.classList.contains("card-more")) active.click();
    }
  });

  // Simple scroll reveal
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{if(en.isIntersecting) en.target.classList.add("reveal");})
  },{threshold:0.12});
  document.querySelectorAll(".timeline-card").forEach(c=>obs.observe(c));

  // Smooth scroll for primary CTA with gentle offset for header
  const cta = document.querySelector(".cta");
  if(cta){
    cta.addEventListener("click", function(e){
      const href = this.getAttribute("href");
      if(!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if(!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector(".site-header")?.offsetHeight || 24;
      const targetY = target.getBoundingClientRect().top + window.scrollY - Math.min(headerHeight + 12, 96);
      window.scrollTo({top: targetY, behavior: "smooth"});
      // small focus for accessibility after scrolling
      setTimeout(()=>{ target.setAttribute("tabindex","-1"); target.focus({preventScroll:true}); }, 600);
    });
  }
});
