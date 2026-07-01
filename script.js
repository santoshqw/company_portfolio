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

  const projectsGrid = document.querySelector('#projectsGrid');
  const projectFilters = document.querySelector('#projectFilters');
  const teamGrid = document.querySelector('#teamGrid');

  const fallbackProjects = [
    { title: 'FitZone — Fitness Website', thumbLabel: 'FitZone', thumbTag: 'Website', thumbClass: 'thumb-1', category: 'Websites', meta: 'React · Node.js · MongoDB', link: '#' },
    { title: 'TaskPro — Project Management App', thumbLabel: 'TaskPro', thumbTag: 'Web App', thumbClass: 'thumb-2', category: 'Web Applications', meta: 'MERN Stack · Tailwind CSS', link: '#' },
    { title: 'UrbanNest — Real Estate Website', thumbLabel: 'UrbanNest', thumbTag: 'Website', thumbClass: 'thumb-3', category: 'Websites', meta: 'HTML · CSS · JavaScript', link: '#' },
    { title: 'ShopEase — E-Commerce Store', thumbLabel: 'ShopEase', thumbTag: 'E-Commerce', thumbClass: 'thumb-4', category: 'E-Commerce', meta: 'React · Stripe · Node.js', link: '#' },
    { title: 'FoodBlog — Blog Platform', thumbLabel: 'FoodBlog', thumbTag: 'Website', thumbClass: 'thumb-5', category: 'Websites', meta: 'React · Sanity CMS', link: '#' },
    { title: 'FoodHub — Food Delivery App', thumbLabel: 'FoodHub', thumbTag: 'Web App', thumbClass: 'thumb-6', category: 'Web Applications', meta: 'MERN Stack · Socket.io', link: '#' },
    { title: 'TravelGo — Travel Website', thumbLabel: 'TravelGo', thumbTag: 'Website', thumbClass: 'thumb-7', category: 'Websites', meta: 'React · Framer Motion', link: '#' },
    { title: 'SaaSify — SaaS Landing Page', thumbLabel: 'SaaSify', thumbTag: 'Landing Page', thumbClass: 'thumb-8', category: 'Landing Pages', meta: 'HTML · CSS · JavaScript', link: '#' }
  ];

  const fallbackTeam = [
    { name: 'Rohit Sharma', role: 'Founder & CEO', bio: 'Full-stack developer with 8+ years of experience building scalable web applications.', initials: 'RS', image: '', gradient: 'linear-gradient(135deg,#2f5bff,#1d3fd6)', socials: ['in', 'gh', 'tw'] },
    { name: 'Aisha Khan', role: 'UI/UX Designer', bio: 'Designs clean, user-friendly interfaces that create meaningful user experiences.', initials: 'AK', image: '', gradient: 'linear-gradient(135deg,#e2632a,#f7a05a)', socials: ['in', 'gh', 'tw'] },
    { name: 'Arjun Mehta', role: 'Frontend Developer', bio: 'Specializes in React and modern JavaScript to build fast and interactive UIs.', initials: 'AM', image: '', gradient: 'linear-gradient(135deg,#0e7a4e,#1fae74)', socials: ['in', 'gh', 'tw'] },
    { name: 'Neha Verma', role: 'Backend Developer', bio: 'Builds robust server-side logic and APIs with Node.js and Express.', initials: 'NV', image: '', gradient: 'linear-gradient(135deg,#5b3df0,#8f7bff)', socials: ['in', 'gh', 'tw'] }
  ];

  let allProjects = [];
  let activeProjectCategory = 'All';

  const renderProjectFilters = (items) => {
    if (!projectFilters || !Array.isArray(items)) return;
    const categories = ['All', ...new Set(items.map(project => project.category).filter(Boolean))];
    projectFilters.innerHTML = categories.map(category => `
      <button type="button" class="filter-pill${category === activeProjectCategory ? ' active' : ''}" data-category="${category}">${category}</button>
    `).join('');

    projectFilters.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        activeProjectCategory = pill.dataset.category || 'All';
        renderProjectFilters(allProjects);
        renderProjects(allProjects);
      });
    });
  };

  const renderProjects = (items) => {
    if (!projectsGrid || !Array.isArray(items)) return;
    const filteredItems = activeProjectCategory === 'All'
      ? items
      : items.filter(project => project.category === activeProjectCategory);

    projectsGrid.innerHTML = filteredItems.map(project => `
      <div class="proj-card">
        <div class="proj-thumb ${project.thumbClass || ''}">${project.thumbLabel || ''}<span class="tag">${project.thumbTag || ''}</span></div>
        <div class="proj-body">
          <h4>${project.title || ''}</h4>
          <div class="meta">${project.meta || ''}</div>
          <a href="${project.link || '#'}" class="view">View Project →</a>
        </div>
      </div>
    `).join('');
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
      const key = String(social || '').toLowerCase();
      const config = socialIconMap[key] || { icon: 'fa-link', label: key || 'Social link' };
      return `<a href="#" aria-label="${config.label}"><i class="fa-brands ${config.icon}" aria-hidden="true"></i></a>`;
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
    renderProjectFilters(allProjects);
    renderProjects(projects);
    renderTeam(teamMembers);
  });

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

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 900) closeMenu();
      });
    });
  }