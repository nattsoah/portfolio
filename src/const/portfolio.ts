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
    skills: ['Git', 'GitHub', 'Figma', 'WordPress', 'Vercel', 'Claude Code', 'Gemini CLI']
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
    title: 'B2B Platform',
    type: 'Asset Management System',
    description: 'Internship: Bright platform monorepo including webs and APIs used across 4 countries. Responsible for developing and fixing bugs, such as creating data mappings of country locations and more..',
    tags: ['React', 'Javascript', 'Material-UI', 'Algolia', 'Express.js'],
  },
  {
    title: 'Personnel management system for academic institutions',
    type: 'HRMS & Asset Management System',
    description: 'Internship: Responsible for developing features and fixing bugs, such as create profile pages, employee search filters, handling file formatting, validating form inputs, and more.',
    tags: ['Next.js', 'Typescript', 'Internal Library'],
  },
  {
    title: 'A personal care product brand',
    type: 'E-commerce & OMS-CMS',
    description: 'Internship: Responsible for developing responsive homepage designs and fixing bugs such as data mapping accuracy, input validation, and improving overall UX performance.',
    tags: ['Next.js', 'Typescript'],
  },
  {
    title: 'Cibes',
    type: 'E-commerce & CMS',
    description: 'Internship: A home elevator product showcase platform. Responsible for converting HTML files into a wordpress theme, using Tailwind CSS for layout design and PHP to integrate dynamic content through Advanced Custom Fields (ACF).',
    tags: ['Wordpress', 'PHP', 'ACF', 'Tailwind CSS'],
  },
  {
    title: 'NAMSANG CHAKKOL',
    type: 'E-commerce & Service',
    description: 'Internship: A machinery rental and sales service website. Responsible for SEO optimization, including creating product pages and developing key components such as breadcrumbs, a category sidebar, and a product grid.',
    tags: ['Next.js', 'Sanity', 'Javascript'],
    demo: 'https://www.namsang.co.th/products/',
  },
  {
    title: 'Design system for operation digital platform',
    type: 'Internal UI-Library',
    description: 'Internship: Responsible for developing reusable components in alignment with the design system such as the sidebar and form inputs',
    tags: ['Typescript', 'chakra-ui'],
  },
  {
    title: 'Trigonometry Learning Web App',
    type: 'E-learning',
    description: 'Final Project: A comprehensive web application designed to support high school trigonometry learning',
    image: '/images/trigo.png',
    tags: ['Vite', 'Tailwind CSS', 'PHP', 'MySQL', 'REST API'],
    demo: 'https://itweb0867.cpkku.com/',
    previewImages: [
      {
        category: 'User',
        images: [
          '/images/trigo/trigo-student-home.png',
          '/images/trigo/trio-student-chapter.png',
          '/images/trigo/trigo-student-evolution.png',
        ]
      },
      {
        category: 'Admin',
        images: [
          '/images/trigo/trigo-teacher-dashboard.png',
          '/images/trigo/trigo-teacher-evolution.png',
          '/images/trigo/trigo-teacher-classroom.png',
        ]
      }
    ],
  },
  {
    title: 'Tomato Book',
    type: 'Mobile Application',
    description: 'A platform for user convenience, allowing users to read e-books anytime and anywhere. The system stores books in a systematic format for easy searching and retrieval.',
    image: '/images/tomato/tomato-started.png',
    tags: ['Kotlin', 'Node.js', 'Express.js', 'MySQL'],
    previewImages: [
      {
        category: 'User',
        images: [
          '/images/tomato/tomato-user-home.png',
          '/images/tomato/tomato-user-library.png',
          '/images/tomato/tomato-user-category.png',
          '/images/tomato/tomato-user-book_detail.png',
          '/images/tomato/tomato-user-payment.png',
          '/images/tomato/tomato-user-payment_success.png',
          '/images/tomato/tomato-user-read.png',
          '/images/tomato/tomato-user-setting.png',
          '/images/tomato/tomato-user-edit.png',
          '/images/tomato/tomato-user-recovery.png',
        ]
      },
      {
        category: 'Admin',
        images: [
          '/images/tomato/tomato-admin-panel.png',
          '/images/tomato/tomato-admin-user.png',
          '/images/tomato/tomato-admin-add.png',
          '/images/tomato/tomato-admin-save.png',
          '/images/tomato/tomato-admin-trash.png',
          '/images/tomato/tomato-admin-edit.png',
        ]
      }
    ],
  },
  {
    title: 'Condo Booking Web App',
    type: 'Web Application',
    description: 'Mini Project: A condo booking system built with Laravel.',
    image: '/images/selena/selena-login.png',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    previewImages: [
      {
        category: 'User',
        images: [
          '/images/selena/selena-home.png',
          '/images/selena/selena-room.png',
          '/images/selena/selena-room-detail.png',
        ]
      },
      {
        category: 'Admin',
        images: [
          '/images/selena/selena-admin-room.png',
          '/images/selena/selena-admin-edit.png',
          '/images/selena/selena-admin-request.png',
        ]
      }
    ],
  },
  {
    title: 'E-Books Website',
    type: 'E-commerce',
    description: 'Mini Project: A fully responsive e-commerce platform for browsing and purchasing e-books.',
    image: '/images/ebooks.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/natthariga/E-books',
    demo: 'https://natthariga.github.io/E-books/',
  }
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