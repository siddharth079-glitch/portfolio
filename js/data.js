/**
 * Siddharth Neelakantam - Portfolio Data Store
 * Structured data collection for easy maintainability and future project additions
 * Conforming strictly to PRD & Design Spec
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Neelakantam Siddhartha",
    displayName: "Siddharth Neelakantam",
    heroTitle: "Aspiring AI & Software Developer",
    rotatingTitles: [
      "Software Developer",
      "AI Developer",
      "Python Developer",
      "Backend Engineer"
    ],
    status: "Available for Internships & AI / Software Roles",
    bio: "Information Technology undergraduate at Gurunanak Institution of Technical Campus with working knowledge of Python, Java, web development fundamentals, and AI-assisted development. Passionate about building intelligent, reliable software from data pipelines to responsive user experiences.",
    email: "siddharthneelakantam@gmail.com",
    phone: "9848214474",
    location: "Hyderabad, Telangana",
    github: "https://github.com/siddharth079-glitch",
    linkedin: "https://www.linkedin.com/in/siddharth-neelakantam-915537414/",
    resumeUrl: "assets/resume/Siddharth_Neelakantam_Resume.pdf",
    portrait: "assets/images/siddharth_profile.jpg",
    institution: "Gurunanak Institution of Technical Campus"
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "code",
      description: "Core algorithmic foundations and object-oriented architectures",
      items: [
        { name: "Python", highlight: true, note: "Core Development, FastAPI, Data & ML Pipelines" },
        { name: "Java", highlight: true, note: "OOP, Data Structures & Algorithmic Problem Solving" },
        { name: "C / C++", highlight: false, note: "Foundational Systems Programming" }
      ]
    },
    {
      category: "Backend & REST APIs",
      icon: "server",
      description: "Robust service engineering, endpoint modeling, and architecture",
      items: [
        { name: "FastAPI", highlight: true, note: "High-performance asynchronous RESTful APIs" },
        { name: "RESTful Architecture", highlight: true, note: "Stateless API design and integration" },
        { name: "Backend Fundamentals", highlight: true, note: "Authentication, business logic, middleware" },
        { name: "API Testing & Docs", highlight: false, note: "Swagger, Postman, automated verification" }
      ]
    },
    {
      category: "Databases & Data Modeling",
      icon: "database",
      description: "Structured relational storage, schema design, and query efficiency",
      items: [
        { name: "PostgreSQL", highlight: true, note: "Relational database modeling and indexing" },
        { name: "Database Design", highlight: true, note: "Normalization, relationships & entity mapping" },
        { name: "SQL Queries", highlight: false, note: "Complex joins, aggregations & query optimization" }
      ]
    },
    {
      category: "AI, ML & Productivity",
      icon: "sparkles",
      description: "Harnessing language models, prompt workflows, and predictive forecasting",
      items: [
        { name: "Prompt Engineering", highlight: true, note: "Structured reasoning, system prompting, evaluation" },
        { name: "LLM Orchestration", highlight: true, note: "Automating workflows with generative AI" },
        { name: "AI-Assisted Dev", highlight: true, note: "Accelerated development and intelligent tooling" },
        { name: "Predictive Analytics", highlight: false, note: "Time-series forecasting concepts (RailSense)" }
      ]
    },
    {
      category: "Frontend Fundamentals",
      icon: "layout",
      description: "Clean semantic markup, responsive design, and glassmorphic aesthetics",
      items: [
        { name: "HTML5 & Semantic Web", highlight: false, note: "Accessible and structured layouts" },
        { name: "Modern CSS3", highlight: true, note: "Glassmorphism, animations, responsive flex/grid" },
        { name: "JavaScript (ES6+)", highlight: true, note: "DOM manipulation, asynchronous fetch, client logic" },
        { name: "UI/UX & Mobile First", highlight: false, note: "Clean typography and touch responsiveness" }
      ]
    },
    {
      category: "Tools & Collaboration",
      icon: "tool",
      description: "Developer toolchain, version management, and team synchronization",
      items: [
        { name: "Git & GitHub", highlight: true, note: "Branching, PRs, version control workflows" },
        { name: "Visual Studio Code", highlight: false, note: "Primary IDE & debugging environment" },
        { name: "Postman", highlight: false, note: "API exploration and endpoint stress testing" },
        { name: "Agile Hackathon Sprints", highlight: true, note: "Rapid iterative prototyping & coordination" }
      ]
    }
  ],

  projects: [
    {
      id: "railsense-ai",
      slug: "railsense-ai",
      title: "RailSense AI",
      subtitle: "AI-Powered Train ETA Forecasting & Transit Intelligence",
      category: "AI & Transportation",
      badge: "Smart India Hackathon • SIH26028",
      featured: true,
      role: "Project Coordinator & Backend Developer",
      timeline: "Smart India Hackathon 2026",
      summary: "An intelligent railway arrival forecasting platform that predicts train delays and real-time ETAs using historical transit patterns, delivered through a high-visibility responsive dashboard.",
      previewVideo: "assets/videos/railsense_preview.mp4",
      poster: "assets/images/certificate.png",
      githubUrl: "https://github.com/siddharth079-glitch",
      demoUrl: "#",
      techStack: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Time-Series", "Modern Web UI"],
      
      caseStudy: {
        tagline: "Solving commuter uncertainty and transit visibility across complex rail networks.",
        problem: "In massive rail networks, timetable schedules frequently diverge from actual operations due to unforeseen delays, cascading congestion, and weather disruptions. Passengers and station administrators lack unified, reliable ETA forecasts, leading to platform overcrowding and travel inefficiency.",
        goals: [
          "Deliver accurate, real-time arrival predictions by evaluating transit velocity and historical station delays.",
          "Provide a clean, accessible web dashboard for commuters to track train routes with zero friction.",
          "Build scalable backend REST endpoints capable of ingesting transit logs and querying PostgreSQL efficiently."
        ],
        solution: "RailSense AI couples historical delay logs with real-time transit telemetry. The FastAPI backend ingests route parameters, computes projected arrival times via time-series heuristic models, and exposes high-throughput endpoints. Commuters access live status updates through an intuitive web interface with clear delay indicators.",
        architecture: {
          client: "Responsive Web Dashboard (HTML5 / Vanilla CSS / Modern JS)",
          api: "FastAPI REST API layer with asynchronous endpoint handlers",
          database: "PostgreSQL schema storing station networks, train timetables, and delay logs",
          engine: "Python predictive module computing dynamic ETA offsets based on track telemetry"
        },
        features: [
          {
            title: "Dynamic ETA Prediction",
            description: "Calculates anticipated arrival times dynamically rather than relying on static official schedules."
          },
          {
            title: "Real-Time Transit Dashboard",
            description: "Interactive visual station tracking board showing upcoming departures, current delay status, and platform assignments."
          },
          {
            title: "FastAPI High-Speed Endpoints",
            description: "Cleanly structured RESTful routes with automated OpenAPI docs and asynchronous PostgreSQL connection pooling."
          },
          {
            title: "Optimized Relational Schema",
            description: "PostgreSQL tables normalized for station metadata, train journeys, and historical delay snapshots."
          }
        ],
        myRole: [
          "Spearheaded overall product requirements definition and technical coordination for the Smart India Hackathon team.",
          "Architected PostgreSQL relational schemas, defining foreign keys, indexes, and station sequence models.",
          "Engineered backend REST endpoints using FastAPI, implementing query filtering and response serialization.",
          "Authored technical architecture documentation, presentation decks, and team delivery milestones."
        ],
        challenges: [
          {
            challenge: "Handling sparse and noisy historical transit delay logs.",
            resolution: "Designed preprocessing pipelines in Python to filter anomalous delay spikes and calculate robust moving averages across route segments."
          },
          {
            challenge: "Ensuring low-latency API response times for multi-stop route queries.",
            resolution: "Optimized PostgreSQL indexes on train numbers and station sequence IDs, minimizing database query latency."
          }
        ],
        outcomes: [
          "Selected and recognized in Smart India Hackathon internal university shortlisting (SIH26028).",
          "Engineered complete functioning backend API service handling train lookups and ETA computations.",
          "Enhanced practical expertise in backend architecture, PostgreSQL database tuning, and fast-paced agile team leadership."
        ]
      }
    },
    {
      id: "prepsync-ai",
      slug: "prepsync-ai",
      title: "PrepSync AI",
      subtitle: "AI-Powered Productivity & Collaborative Meeting Intelligence",
      category: "Productivity & LLMs",
      badge: "Lead Architect & Developer",
      featured: true,
      role: "Lead Developer / Architect",
      timeline: "Product Concept & Active Prototype",
      summary: "A next-generation productivity hub that automates meeting preparation, synthesizes actionable summaries from prior discussions, and streamlines cross-team schedule coordination.",
      previewVideo: "assets/videos/prepsync_preview.mp4",
      poster: "assets/images/siddharth_profile.jpg",
      githubUrl: "https://github.com/siddharth079-glitch",
      demoUrl: "#",
      techStack: ["Python", "FastAPI", "Prompt Engineering", "LLM APIs", "JSON Schema", "Modern Web UI"],
      
      caseStudy: {
        tagline: "Transforming fragmented meetings and lost context into actionable, organized workflows.",
        problem: "Knowledge workers spend disproportionate time preparing agendas, taking manual notes, and following up on scattered action items. Important decisions made during fast-paced discussions frequently slip through the cracks.",
        goals: [
          "Automate meeting agenda synthesis using contextual notes from prior conversations.",
          "Generate concise action items and key takeaway summaries using calibrated prompt engineering.",
          "Provide an intuitive, clean interface for organizing work sprints without cognitive overload."
        ],
        solution: "PrepSync AI serves as an intelligent meeting co-pilot. By applying structured prompt templates to raw meeting transcripts or bullet points, it categorizes topics, flags assigned action items with owners, and prepares forward-looking agendas for upcoming sessions.",
        architecture: {
          client: "Clean editorial web interface with quick-action cards",
          api: "Python FastAPI server with prompt orchestration handlers",
          engine: "Custom prompt engineering pipeline with structured JSON schema outputs",
          storage: "Relational persistence for meeting records, action items, and project workspaces"
        },
        features: [
          {
            title: "Automated Contextual Note Synthesis",
            description: "Transforms messy transcripts and discussion notes into polished summaries with executive takeaways."
          },
          {
            title: "Action Item Extraction",
            description: "Automatically extracts tasks, assignees, and deadlines using few-shot prompt instructions."
          },
          {
            title: "Smart Agenda Generator",
            description: "Synthesizes previous discussion outcomes into structured agendas for follow-up synchronization."
          },
          {
            title: "Workflow Organization Hub",
            description: "Categorizes project notes by workspace and date, ensuring total visibility into progress."
          }
        ],
        myRole: [
          "Conceptualized end-to-end product requirements, user experience flows, and platform capabilities.",
          "Engineered prompt engineering chains to ensure deterministic, hallucination-free summary and action item outputs.",
          "Implemented backend API handlers in Python to ingest notes and return structured JSON schemas.",
          "Built interactive web interfaces for viewing generated agendas and managing team workspaces."
        ],
        challenges: [
          {
            challenge: "LLM outputs drifting in structure or inventing unassigned action items.",
            resolution: "Designed strict system prompts with explicit negative constraints and schema validation, ensuring consistent output parsing."
          }
        ],
        outcomes: [
          "Developed a working prototype validating automated meeting note extraction.",
          "Applied advanced prompt engineering methodologies to solve real-world productivity bottlenecks."
        ]
      }
    },
    {
      id: "quotify-platform",
      slug: "quotify-platform",
      title: "Quotify",
      subtitle: "Curated Thought & Idea Discovery Platform",
      category: "Web Application",
      badge: "Full Stack Project",
      featured: false,
      role: "Full Stack Developer",
      timeline: "Personal Project",
      summary: "An interactive editorial discovery platform delivering curated philosophical and technical quotations with category filtering, search, and dynamic responsive cards.",
      previewVideo: "assets/videos/quotify_preview.mp4",
      poster: "assets/images/certificate.png",
      githubUrl: "https://github.com/siddharth079-glitch",
      demoUrl: "#",
      techStack: ["JavaScript", "HTML5", "CSS3 Glassmorphism", "REST APIs", "Local Storage"],
      
      caseStudy: {
        tagline: "Daily inspiration and intellectual wisdom delivered through refined digital typography.",
        problem: "Online quote repositories are cluttered with intrusive ads, broken typography, and sluggish navigation. Users seeking clean, reflective daily wisdom lack a calm, editorial-quality experience.",
        goals: [
          "Create a distraction-free, visually captivating platform for discovering inspiring thoughts.",
          "Support category filtering (Technology, Philosophy, Science, Leadership) with instant search.",
          "Enable bookmarking and clipboard copying with smooth micro-interactions."
        ],
        solution: "Quotify pairs warm glassmorphism with elegant serif typography to provide an uncluttered reading sanctuary. Users can filter by author or theme, randomize recommendations, and copy quotes with one click.",
        architecture: {
          client: "Modular Vanilla JavaScript application with responsive CSS Grid/Flexbox",
          data: "Structured JSON quote corpus with client-side indexing and local caching"
        },
        features: [
          {
            title: "Category & Theme Filtering",
            description: "Instantly filter quotes across technology, literature, motivation, and leadership."
          },
          {
            title: "One-Click Copy & Share",
            description: "Smooth clipboard integration with celebratory micro-feedback."
          },
          {
            title: "Editorial Typography",
            description: "Carefully calibrated font hierarchy designed for maximum reading pleasure."
          }
        ],
        myRole: [
          "Crafted the UI design system using custom CSS tokens and subtle glass surfaces.",
          "Implemented client-side filtering algorithms and search matching in pure JavaScript."
        ],
        challenges: [
          {
            challenge: "Ensuring instant search responsiveness without external libraries.",
            resolution: "Implemented lightweight debounced string matching against an indexed quote dataset."
          }
        ],
        outcomes: [
          "Delivered a polished, responsive web application with zero layout shifts.",
          "Strengthened mastery over DOM manipulation, CSS glassmorphism, and responsive layout systems."
        ]
      }
    },
    {
      id: "daily-task-taker",
      slug: "daily-task-taker",
      title: "Daily Task Taker",
      subtitle: "Focus-Centric Daily Workflow & Priority Orchestrator",
      category: "Productivity",
      badge: "Workflow Utility",
      featured: false,
      role: "Application Developer",
      timeline: "Workflow Project",
      summary: "A streamlined daily task orchestrator designed to eliminate cognitive fatigue by organizing daily objectives into structured priority tiers with offline persistence.",
      previewVideo: "assets/videos/dailytask_preview.mp4",
      poster: "assets/images/siddharth_profile.jpg",
      githubUrl: "https://github.com/siddharth079-glitch",
      demoUrl: "#",
      techStack: ["JavaScript", "HTML5", "CSS3", "Local Storage", "Responsive Mobile UX"],
      
      caseStudy: {
        tagline: "Prioritize what matters today, track progress effortlessly, and stay in flow.",
        problem: "Standard to-do lists quickly become overwhelming graveyards of hundreds of stale tasks, discouraging users rather than fostering focus.",
        goals: [
          "Enforce daily focus by limiting active high-priority objectives.",
          "Provide instantaneous local persistence with zero network dependency.",
          "Deliver fluid drag-and-drop or one-tap status toggling."
        ],
        solution: "Daily Task Taker partitions daily work into High, Medium, and Low impact tiers. It encourages single-task focus with progress tracking and celebratory completion cues.",
        architecture: {
          client: "Lightweight mobile-first web app with persistent state syncing",
          storage: "HTML5 LocalStorage API with JSON serialization and validation"
        },
        features: [
          {
            title: "Priority Tiering",
            description: "Separates must-do critical tasks from secondary backlog items."
          },
          {
            title: "Offline-First Persistence",
            description: "Instantly saves all state changes to local storage, surviving reloads and offline usage."
          },
          {
            title: "Progress Visualization",
            description: "Dynamic completion indicators showing daily milestone achievement."
          }
        ],
        myRole: [
          "Designed intuitive mobile and desktop views with responsive touch targets.",
          "Programmed state management routines ensuring data integrity across sessions."
        ],
        challenges: [
          {
            challenge: "Maintaining reliable state serialization across unexpected browser closes.",
            resolution: "Built transactional localStorage save handlers triggered on every user interaction."
          }
        ],
        outcomes: [
          "Created a reliable, lightweight utility actively utilized for daily study sprints."
        ]
      }
    }
  ],

  experience: [
    {
      role: "Project Coordinator & Backend Developer",
      organization: "Smart India Hackathon (SIH26028) • RailSense AI",
      period: "2026",
      type: "National Hackathon",
      location: "Hyderabad, India",
      bullets: [
        "Led product requirements gathering, milestone tracking, and cross-functional coordination for the RailSense AI hackathon squad.",
        "Architected PostgreSQL relational database schema for railway schedules, delay metrics, and station topologies.",
        "Engineered asynchronous REST APIs in FastAPI for real-time ETA calculation and transit query execution.",
        "Authored technical architecture documentation, presentation decks, and team delivery milestones."
      ]
    },
    {
      role: "Hackathon Team Lead & Core Builder",
      organization: "24-Hour Competitive Hackathons",
      period: "2025 – 2026",
      type: "Rapid Prototyping",
      location: "Hyderabad, India",
      bullets: [
        "Participated in high-intensity 24-hour hackathons, transforming problem briefs into working software prototypes within strict deadlines.",
        "Took initiative in project scoping, division of engineering responsibilities, and code synchronization via Git.",
        "Coordinated rapid backend and API implementations under time pressure, ensuring reliable final demo deliveries."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech), Information Technology",
      institution: "Gurunanak Institution of Technical Campus",
      period: "Expected Graduation: 2028",
      status: "Third Year",
      details: "Focused curriculum in Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Software Engineering, and Computer Networks. Active contributor to technical initiatives and hackathons."
    },
    {
      degree: "Intermediate",
      institution: "Narayana Junior College",
      period: "2024",
      status: "Completed",
      details: "Strong foundations in Mathematics, Physics, and Chemistry, cultivating rigorous analytical and problem-solving thinking."
    },
    {
      degree: "Secondary School",
      institution: "Sri Chaitanya School",
      period: "2022",
      status: "Completed",
      details: "Foundational academic training with emphasis on sciences, mathematics, and extracurricular team activities."
    }
  ],

  achievements: [
    {
      title: "Smart India Hackathon (SIH26028) Selection",
      issuer: "Ministry of Education / AICTE & Institutional Selection",
      date: "2026",
      summary: "Spearheaded technical coordination and backend architecture for RailSense AI, qualifying through competitive evaluation.",
      highlight: true
    },
    {
      title: "24-Hour Rapid Prototyping Sprints",
      issuer: "Collegiate & Regional Hackathons",
      date: "2025 – 2026",
      summary: "Demonstrated proven leadership and endurance by conceptualizing, coding, and pitching full-stack prototypes within 24 hours.",
      highlight: false
    },
    {
      title: "Technical Engineering Foundations",
      issuer: "Gurunanak Institution of Technical Campus",
      date: "2024 – Present",
      summary: "Pursuing Bachelor of Technology in Information Technology with consistent dedication to software engineering principles and collaborative development.",
      highlight: false
    }
  ],

  certifications: [
    {
      id: "hackwithhyderabad-3",
      title: "HackWithHyderabad 3.0",
      type: "Certificate of Participation",
      organization: "Hack With India × Devnovate",
      date: "3 October 2026",
      location: "Microsoft Office, Hyderabad",
      status: "Certificate of Participation",
      description: "Participated in HackWithHyderabad 3.0, an 8-hour technology hackathon organized by Hack With India and Devnovate in Hyderabad.",
      image: "assets/images/hackwithhyderabad_certificate.jpg",
      certificateUrl: "assets/images/hackwithhyderabad_certificate.pdf"
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering Course",
      type: "Course Credential",
      organization: "",
      date: "",
      location: "",
      status: "Completed",
      description: "Verified course completion covering prompt engineering principles, structured prompts, and effective use of AI models.",
      image: "",
      certificateUrl: ""
    },
    {
      id: "techtrix-2k25",
      title: "Certificate of Participation — TechTrix 2K25",
      type: "Certificate of Participation",
      organization: "Department of Information Technology (INFONEX)",
      date: "24th October 2025",
      location: "Hyderabad, India",
      status: "Verified",
      description: "Certificate of Participation in TechTrix 2K25 Technical Symposium organized by the Department of Information Technology under the student association INFONEX.",
      image: "assets/images/certificate.png",
      certificateUrl: "assets/images/certificate.png"
    }
  ]
};
