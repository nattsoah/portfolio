export const HERO_DATA = {
  tagline: "Hi, my name is",
  title: 'Natthariga',
  subtitle: "I'm a passionate frontend developer specializing in building exceptional digital experiences. Currently, I'm focused on crafting responsive, accessible, and user-centered web applications.",
  ctaText: 'View My Work',
  ctaLink: '#projects',
  profileImage: '/images/profile.png',
};

export const ABOUT_DATA = {
  title: 'About Me',
  description: [
    "Hello, I'm Natthariga Somit (Noey), a Frontend Developer and a recent Information Technology graduate from Khon Kaen University.",
    "I have a strong passion for front-end development and web design, and I enjoy bringing ideas to life by creating clean, user-friendly interfaces. Throughout my studies and my recent internship at Foxbith Co., Ltd., I’ve gained solid hands-on experience in modern web development.",
    "I had the opportunity to build scalable, modular UIs and work on complex systems, which taught me how to effectively bridge the gap between functionality and design."
  ],
  stats: [
    { label: 'Years Experience', value: 'Recent Grad' },
    { label: 'Projects', value: '5+' },
    { label: 'Technologies Used', value: '5+' },
  ]
};

export const SKILLS_DATA = [
  {
    category: 'Frontend',
    icon: 'DevicesIcon',
    description: 'Creating responsive, interactive, and user-friendly interfaces using modern frameworks and libraries.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Material UI', 'Tailwind CSS', 'Chakra UI', 'Bootstrap']
  },
  {
    category: 'Backend',
    icon: 'StorageIcon',
    description: 'Building robust server-side applications, APIs, and managing databases to power web experiences.',
    skills: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'Python', 'Java']
  },
  {
    category: 'Tools & Others',
    icon: 'BuildIcon',
    description: 'Utilizing essential development tools and platforms to streamline workflow and ensure quality.',
    skills: ['Git', 'GitHub', 'Figma', 'WordPress', 'Vercel']
  }
];

export const PROJECTS_DATA = [
  {
    title: 'Modern Personal Portfolio',
    type: 'Portfolio',
    description: 'A professional portfolio website built with Next.js, TypeScript, and MUI, featuring a responsive design.',
    image: '/images/portfolio.png',
    tags: ['Next.js', 'TypeScript', 'Material-UI', 'Swiper'],
    github: 'https://github.com/nattsoah/portfolio',
    demo: '#',
  },
  {
    title: 'Fake-Hatari',
    type: 'E-commerce',
    description: 'A sleek UI/UX focused project built with Next.js and Swiper for smooth interactions.',
    image: '/images/hatari.png',
    tags: ['Next.js', 'Swiper', 'UI/UX Design'],
    github: 'https://github.com/nattsoah/Fake-Hatari',
    demo: 'https://fake-hatari.vercel.app/',
  },
  {
    title: 'PineApple Island',
    type: 'Landing Page',
    description: 'A modern web application built with Next.js and React, featuring advanced data management with MUI X Data Grid.',
    image: '/images/pineapple.png',
    tags: ['Next.js', 'React', 'Material-UI', 'TypeScript'],
    github: 'https://github.com/nattsoah/test_1-PineAppleIsland',
    demo: 'https://test-1-pine-apple-island.vercel.app/',
  },
  {
    title: 'Questionnaire Form',
    type: 'Web Application',
    description: 'A robust form application focusing on validation and user experience using Formik and Yup.',
    image: '/images/questionnaire.png',
    tags: ['Next.js', 'Formik', 'Yup', 'Material-UI'],
    github: 'https://github.com/nattsoah/test_2-QuestionaireForm',
    demo: 'https://test-2-questionaire-form.vercel.app/',
  },
  {
    title: 'Trigonometry Learning Web App',
    type: 'E-learning',
    description: 'A comprehensive web application designed to support high school trigonometry learning, featuring interactive modules and real-time feedback. (In Development)',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    tags: ['Vite', 'Tailwind CSS', 'PHP', 'MySQL', 'REST API'],
    previewImages: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    title: 'E-Books Website',
    type: 'E-commerce',
    description: 'a responsive e-commerce for browsing and purchasing e-books. Built using HTML, CSS, JavaScript, and Bootstrap for styling and responsive design for desktop and mobile devices.',
    image: '/images/ebooks.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/natthariga/E-books',
    demo: 'https://natthariga.github.io/E-books/',
  },
  {
    title: 'Condo Booking Web App',
    type: 'Web Application',
    description: 'A web application built with Laravel, PHP, MySQL, and Bootstrap. Developed as my Second-Year Project.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    previewImages: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
    ],
  },
];

export const CERTIFICATES_DATA = [
  {
    title: 'Certificate of Co-operative Education',
    issuer: 'Foxbith Co., Ltd.',
    date: 'March 2026',
  },
  {
    title: 'Asia Undergraduate Conference on Computing',
    issuer: 'AUCC',
    date: 'Feb 2026',
    image: '/images/certificate/cer-1.png',
  },
  {
    title: 'Information Technology Professionals Examination',
    issuer: 'NSTDA',
    date: 'Dec 2024',
    image: '/images/certificate/cer-2.jpeg',
  },
];