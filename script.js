// active nav link on scroll
  const links = document.querySelectorAll('#mainNav a');
  const nav = document.querySelector('#mainNav');
  const navIndicator = document.querySelector('.nav-indicator');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));
  const moveNavIndicator = (link) => {
    if (!nav || !navIndicator || !link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.opacity = '1';
  };
  const setActive = () => {
    let idx = 0;
    const y = window.scrollY + 120;
    sections.forEach((s,i) => { if(s && s.offsetTop <= y) idx = i; });
    links.forEach((l,i) => l.classList.toggle('active', i===idx));
    moveNavIndicator(links[idx]);
  };
  window.addEventListener('scroll', setActive);
  window.addEventListener('resize', setActive);
  setActive();

  links.forEach(link => {
    link.addEventListener('click', () => {
      moveNavIndicator(link);
    });
  });

  const stackRow = document.querySelector('.stack-row');
  if (stackRow && window.gsap) {
    const originalItems = Array.from(stackRow.children);
    const track = document.createElement('div');
    track.className = 'stack-track';

    const group = document.createElement('div');
    group.className = 'stack-group';
    originalItems.forEach(item => group.appendChild(item));

    const clone = group.cloneNode(true);
    track.appendChild(group);
    track.appendChild(clone);

    stackRow.innerHTML = '';
    stackRow.appendChild(track);

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 44,
      ease: 'none',
      repeat: -1,
      force3D: true
    });

    stackRow.addEventListener('mouseenter', () => tween.pause());
    stackRow.addEventListener('mouseleave', () => tween.play());
  }

  const heroCopy = document.querySelector('.hero-copy');
  const heroVisual = document.querySelector('.hero-visual');
  if (window.gsap && window.ScrollTrigger && heroCopy && heroVisual) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(heroCopy, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#home',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from(heroVisual, {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#home',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  const projectsGrid = document.querySelector('#projectsGrid');
  const projectsSwiper = document.querySelector('#projectsSwiper');
  const teamGrid = document.querySelector('#teamGrid');
  let projectSwiper = null;

  const fallbackProjects = [
    { title: 'FitZone — Fitness Website', thumbLabel: 'FitZone', thumbTag: 'Website', thumbClass: 'thumb-1', category: 'Websites', meta: 'React · Node.js · MongoDB', link: '#', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80' },
    { title: 'TaskPro — Project Management App', thumbLabel: 'TaskPro', thumbTag: 'Web App', thumbClass: 'thumb-2', category: 'Web Applications', meta: 'MERN Stack · Tailwind CSS', link: '#', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80' },
    { title: 'UrbanNest — Real Estate Website', thumbLabel: 'UrbanNest', thumbTag: 'Website', thumbClass: 'thumb-3', category: 'Websites', meta: 'HTML · CSS · JavaScript', link: '#', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80' },
    { title: 'ShopEase — E-Commerce Store', thumbLabel: 'ShopEase', thumbTag: 'E-Commerce', thumbClass: 'thumb-4', category: 'E-Commerce', meta: 'React · Stripe · Node.js', link: '#', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80' },
    { title: 'FoodBlog — Blog Platform', thumbLabel: 'FoodBlog', thumbTag: 'Website', thumbClass: 'thumb-5', category: 'Websites', meta: 'React · Sanity CMS', link: '#', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80' },
    { title: 'FoodHub — Food Delivery App', thumbLabel: 'FoodHub', thumbTag: 'Web App', thumbClass: 'thumb-6', category: 'Web Applications', meta: 'MERN Stack · Socket.io', link: '#', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80' },
    { title: 'TravelGo — Travel Website', thumbLabel: 'TravelGo', thumbTag: 'Website', thumbClass: 'thumb-7', category: 'Websites', meta: 'React · Framer Motion', link: '#', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
    { title: 'SaaSify — SaaS Landing Page', thumbLabel: 'SaaSify', thumbTag: 'Landing Page', thumbClass: 'thumb-8', category: 'Landing Pages', meta: 'HTML · CSS · JavaScript', link: '#', image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80' }
  ];

  const fallbackTeam = [
    { name: 'Rohit Sharma', role: 'Founder & CEO', bio: 'Full-stack developer with 8+ years of experience building scalable web applications.', initials: 'RS', image: '', gradient: 'linear-gradient(135deg,#2f5bff,#1d3fd6)', socials: ['in', 'gh', 'tw'] },
    { name: 'Aisha Khan', role: 'UI/UX Designer', bio: 'Designs clean, user-friendly interfaces that create meaningful user experiences.', initials: 'AK', image: '', gradient: 'linear-gradient(135deg,#e2632a,#f7a05a)', socials: ['in', 'gh', 'tw'] },
    { name: 'Arjun Mehta', role: 'Frontend Developer', bio: 'Specializes in React and modern JavaScript to build fast and interactive UIs.', initials: 'AM', image: '', gradient: 'linear-gradient(135deg,#0e7a4e,#1fae74)', socials: ['in', 'gh', 'tw'] },
    { name: 'Neha Verma', role: 'Backend Developer', bio: 'Builds robust server-side logic and APIs with Node.js and Express.', initials: 'NV', image: '', gradient: 'linear-gradient(135deg,#5b3df0,#8f7bff)', socials: ['in', 'gh', 'tw'] }
  ];

  let allProjects = [];

  const initProjectSwiper = () => {
    if (!projectsSwiper || !projectsGrid) return;

    if (projectSwiper) {
      projectSwiper.destroy(true, true);
      projectSwiper = null;
    }

    projectSwiper = new Swiper(projectsSwiper, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      loop: true,
      watchOverflow: true,
      speed: 1200,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1
        },
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1024: {
          slidesPerView: 2,
          slidesPerGroup: 2
        }
      }
    });
  };

  const renderProjects = (items) => {
    if (!projectsGrid || !Array.isArray(items)) return;

    projectsGrid.innerHTML = items.map(project => `
      <div class="swiper-slide">
        <div class="proj-card">
          <div class="proj-thumb ${project.thumbClass || ''}">
            ${project.image ? `<img src="${project.image}" alt="${project.title || project.thumbLabel || 'Project image'}">` : ''}
            <div class="proj-thumb-overlay"></div>
            <div class="proj-thumb-content">${project.thumbLabel || ''}</div>
            <span class="tag">${project.thumbTag || ''}</span>
          </div>
          <div class="proj-body">
            <h4>${project.title || ''}</h4>
            <div class="meta">${project.meta || ''}</div>
            <a href="${project.link || '#'}" class="view">View Project →</a>
          </div>
        </div>
      </div>
    `).join('');

    initProjectSwiper();
  };

  const renderTeam = (items) => {
    if (!teamGrid || !Array.isArray(items)) return;

    const socialIconMap = {
      in: { icon: 'fa-linkedin-in', label: 'LinkedIn' },
      gh: { icon: 'fa-github', label: 'GitHub' },
      tw: { icon: 'fa-x-twitter', label: 'Twitter' },
      linkedin: { icon: 'fa-linkedin-in', label: 'LinkedIn' },
      github: { icon: 'fa-github', label: 'GitHub' },
      twitter: { icon: 'fa-x-twitter', label: 'Twitter' }
    };

    const renderSocial = (social) => {
      const platform = typeof social === 'string'
        ? social
        : String(social?.platform || social?.key || '').toLowerCase();
      const config = socialIconMap[platform] || { icon: 'fa-link', label: platform || 'Social link' };
      const href = typeof social === 'object' && social?.url ? social.url : '#';
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${config.label}"><i class="fa-brands ${config.icon}" aria-hidden="true"></i></a>`;
    };

    teamGrid.innerHTML = items.map(member => `
      <div class="team-card">
        ${member.image ? `
          <div class="avatar avatar-photo" style="background:${member.gradient || 'linear-gradient(135deg,#2f5bff,#1d3fd6)'}">
            <img src="${member.image}" alt="${member.name || 'Team member'}">
            <span class="avatar-fallback">${member.initials || ''}</span>
          </div>
        ` : `
          <div class="avatar" style="background:${member.gradient || 'linear-gradient(135deg,#2f5bff,#1d3fd6)'}">${member.initials || ''}</div>
        `}
        <h4>${member.name || ''}</h4>
        <div class="role">${member.role || ''}</div>
        <p class="bio">${member.bio || ''}</p>
        <div class="socials">${(member.socials || []).map(renderSocial).join('')}</div>
      </div>
    `).join('');

    teamGrid.querySelectorAll('.avatar-photo img').forEach(image => {
      image.addEventListener('error', () => {
        const fallback = image.parentElement?.querySelector('.avatar-fallback');
        image.style.display = 'none';
        if (fallback) fallback.style.display = 'flex';
      });
    });
  };

  Promise.all([
    fetch('projects.json').then(response => response.json()).catch(() => fallbackProjects),
    fetch('teammember.json').then(response => response.json()).catch(() => fallbackTeam)
  ]).then(([projects, teamMembers]) => {
    allProjects = Array.isArray(projects) ? projects : fallbackProjects;
    renderProjects(allProjects);
    renderTeam(teamMembers);
  });

  const contactActions = document.querySelector('#contactActions');
  if (contactActions) {
    fetch('company-links.json')
      .then(response => response.json())
      .then((links) => {
        const items = [
          { key: 'whatsapp', label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: links.whatsapp || '#' },
          { key: 'linkedin', label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: links.linkedin || '#' },
          { key: 'fiverr', label: 'Fiverr', icon: 'fa-solid fa-briefcase', url: links.fiverr || '#' }
        ];

        contactActions.innerHTML = items.map((item) => `
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="contact-action ${item.key}">
            <i class="${item.icon}" aria-hidden="true"></i>
            <span>${item.label}</span>
          </a>
        `).join('');
      })
      .catch(() => {
        contactActions.innerHTML = '';
      });
  }

  const contactForm = document.querySelector('#contactForm');
  const formStatus = document.querySelector('#formStatus');
  const successPopup = document.querySelector('#successPopup');

  const showSuccessPopup = () => {
    if (!successPopup) return;
    successPopup.classList.add('show');
    clearTimeout(showSuccessPopup.timer);
    showSuccessPopup.timer = setTimeout(() => {
      successPopup.classList.remove('show');
    }, 2500);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!window.emailjs) {
        formStatus.textContent = 'Email service is unavailable. Please try again later.';
        return;
      }

      const senderEmail = contactForm.email?.value?.trim() || '';
      const messageText = contactForm.message?.value?.trim() || '';

      const templateParams = {
        reply_to: senderEmail,
        email: senderEmail,
        message: `From: ${senderEmail}\n\n${messageText}`
      };

      formStatus.textContent = 'Sending...';
      try {
        await emailjs.send('service_u1f9fxh', 'template_jccj3me', templateParams);
        formStatus.textContent = 'Message sent! We will reply to your email soon.';
        contactForm.reset();
        showSuccessPopup();
      } catch (error) {
        console.error('EmailJS error:', error);
        formStatus.textContent = 'Something went wrong. Please try again later.';
      }
    });
  }

  // mobile menu toggle
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#mainNav');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuClose = document.querySelector('.menu-close');

  const closeMenu = () => {
    if (!header || !menuToggle) return;
    header.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (header && menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    if (menuOverlay) {
      menuOverlay.addEventListener('click', closeMenu);
    }

    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }

    mainNav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 900) {
          closeMenu();
        }
      });
    });
  }