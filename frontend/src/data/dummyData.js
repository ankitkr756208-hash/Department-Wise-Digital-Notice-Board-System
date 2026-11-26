export const departments = [
  {
    id: 'dept-cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    hodName: 'Dr. Shruti Gupta',
    hodEmail: 'hod.cse2@abes.ac.in',
    hodAvatar: '/hod-shruti-gupta.png',
    facultyCount: 38,
    studentCount: 1120,
    activeNoticesCount: 14,
    color: 'blue',
    accentColor: '#3b82f6',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    description: 'Specializing in Artificial Intelligence, Cloud Computing, Cyber Security, and Software Engineering.'
  },
  {
    id: 'dept-ece',
    code: 'ECE',
    name: 'Electronics & Communication',
    hodName: 'Dr. Amit Sinha',
    hodEmail: 'hod.ece@abes.ac.in',
    hodAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    facultyCount: 32,
    studentCount: 890,
    activeNoticesCount: 9,
    color: 'indigo',
    accentColor: '#6366f1',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    description: 'Advancing research in VLSI design, embedded systems, RF communications, and signal processing.'
  },
  {
    id: 'dept-me',
    code: 'ME',
    name: 'Mechanical Engineering',
    hodName: 'Dr. Manoj Kumar',
    hodEmail: 'hod.me@abes.ac.in',
    hodAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    facultyCount: 28,
    studentCount: 740,
    activeNoticesCount: 7,
    color: 'amber',
    accentColor: '#f59e0b',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    description: 'Pioneering thermal systems, robotics, advanced manufacturing, and CAD/CAM automation.'
  },
  {
    id: 'dept-civil',
    code: 'Civil',
    name: 'Civil & Infrastructure Engineering',
    hodName: 'Dr. Meenakshi Sharma',
    hodEmail: 'hod.civil@abes.ac.in',
    hodAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    facultyCount: 24,
    studentCount: 610,
    activeNoticesCount: 6,
    color: 'emerald',
    accentColor: '#10b981',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    description: 'Leading innovations in structural mechanics, smart cities, hydrology, and geotechnical studies.'
  },
  {
    id: 'dept-bt',
    code: 'Biotech',
    name: 'Biotechnology & Bioinformatics',
    hodName: 'Dr. Ananya Patel',
    hodEmail: 'hod.bt@abes.ac.in',
    hodAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    facultyCount: 22,
    studentCount: 460,
    activeNoticesCount: 5,
    color: 'teal',
    accentColor: '#14b8a6',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
    description: 'Translating molecular biology, genomics, bioprocess engineering, and computational diagnostics.'
  },
  {
    id: 'dept-mgmt',
    code: 'Management',
    name: 'School of Management & Business',
    hodName: 'Dr. Rakesh Kumar Sharma',
    hodEmail: 'hod.mgmt@abes.ac.in',
    hodAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    facultyCount: 26,
    studentCount: 580,
    activeNoticesCount: 8,
    color: 'purple',
    accentColor: '#a855f7',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    description: 'Fostering future leaders in finance, business analytics, product strategy, and entrepreneurship.'
  }
];

export const demoUsers = {
  admin: {
    id: 'usr-admin-1',
    name: 'Dr. Sanjay Kumar Agarwal',
    email: 'admin@abes.ac.in',
    role: 'admin',
    department: 'All',
    designation: 'Director & Super Administrator',
    enrollmentNo: 'DIR-001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 120 713 5111',
    joinedDate: 'August 2018'
  },
  hod: {
    id: 'usr-hod-1',
    name: 'Dr. Shruti Gupta',
    email: 'hod.cse2@abes.ac.in',
    role: 'hod',
    department: 'CSE',
    designation: 'HOD-CSE-2 & Professor',
    enrollmentNo: 'FAC-CSE-002',
    avatar: '/hod-shruti-gupta.png',
    phone: '+91 120 713 5122',
    joinedDate: 'July 2016'
  },
  faculty: {
    id: 'usr-fac-1',
    name: 'Prof. Rajiv Sharma',
    email: 'rajiv.sharma@abes.ac.in',
    role: 'faculty',
    department: 'CSE',
    designation: 'Associate Professor (Data Systems)',
    enrollmentNo: 'FAC-CSE-018',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 120 713 5133',
    joinedDate: 'January 2020'
  },
  student: {
    id: 'usr-stu-1',
    name: 'Ankit Kumar',
    email: 'ankit.kumar@student.abes.ac.in',
    role: 'student',
    department: 'CSE',
    designation: 'B.Tech Student (Semester 6, CSE-A)',
    enrollmentNo: '2100320100042',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43210',
    joinedDate: 'August 2023',
    semester: '6th Semester',
    section: 'CSE-A',
    cgpa: '9.15'
  }
};

export const initialNotices = [
  {
    id: 'ntc-101',
    title: 'Midterm Examination Timetable Released - Fall 2026',
    slug: 'midterm-exam-timetable-fall-2026',
    content: `The official midterm examination schedule for all undergraduate and postgraduate engineering branches has been officially released by the Controller of Examinations.
    
All students are requested to download the examination schedule sheet attached below and verify their respective course codes, exam halls, and reporting timings.

Important Instructions:
1. Entry into examination halls closes strictly 15 minutes before exam commencement.
2. Digital devices, smartwatches, and programmable calculators are strictly prohibited.
3. Students must produce their University Physical RFID Identity Card at the examination entrance.
4. Any student with medical exceptions must submit authorization letters to the Examination Cell by Friday.

For seating arrangements and room allocation queries, kindly contact your respective departmental examination coordinator.`,
    excerpt: 'The official midterm examination timetable for undergraduate and postgraduate students has been published. Check dates, venues, and reporting guidelines.',
    department: 'All',
    category: 'Examinations',
    priority: 'Urgent',
    status: 'published',
    targetAudience: 'All Students & Faculty',
    author: {
      name: 'Dr. Sanjay Kumar Agarwal',
      role: 'admin',
      designation: 'Controller of Examinations',
      department: 'All',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-24T09:30:00Z',
    expiresAt: '2026-12-15T18:00:00Z',
    viewsCount: 1482,
    isPinned: true,
    isNew: true,
    attachments: [
      {
        name: 'Midterm_Exam_Timetable_Fall2026.pdf',
        size: '2.4 MB',
        type: 'pdf',
        url: '#'
      },
      {
        name: 'Exam_Hall_Seating_Guidelines.pdf',
        size: '860 KB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-102',
    title: 'ABES National Hackathon 2026: 36-Hour National CodeFest Registration Open',
    slug: 'apex-hackathon-2026-codefest-registration',
    content: `The Department of Computer Science & Engineering, in collaboration with the Student ACM & IEEE Student Chapters, is thrilled to announce the 8th Annual ABES National Hackathon 2026!

Event Highlights:
- 36 hours of non-stop innovation, mentorship, and building
- Themes: GenAI Solutions, Decentralized Web, HealthTech, Sustainable Energy, Smart Mobility
- Cash Prize Pool: $15,000 + Incubation & Pre-Placement Interview opportunities from sponsor companies
- Mentorship from Silicon Valley engineering leads and open-source architects

Registration Details:
- Teams of 2 to 4 students from any department are eligible.
- Free high-speed 10Gbps connectivity, refreshments, snacks, and rest pods provided throughout the weekend.
- Early bird registration closes on December 5th.

Shortlisted teams will receive hardware prototyping credits and API access tokens.`,
    excerpt: 'Register your team for the 36-hour flagship hackathon with $15,000 prize pool, industry mentorship, and fast-track internship tracks.',
    department: 'CSE',
    category: 'Events',
    priority: 'High',
    status: 'published',
    targetAudience: 'All Engineering Students',
    author: {
      name: 'Dr. Shruti Gupta',
      role: 'hod',
      designation: 'HOD - Computer Science',
      department: 'CSE',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-23T14:15:00Z',
    expiresAt: '2026-12-10T23:59:00Z',
    viewsCount: 928,
    isPinned: true,
    isNew: true,
    attachments: [
      {
        name: 'Apex_Hackathon_Rulebook_2026.pdf',
        size: '1.8 MB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-103',
    title: 'On-Campus Placement Drive: Nexus Global & CloudScale Software',
    slug: 'campus-placement-drive-nexus-global',
    content: `The Department Training and Placement Cell (T&P) is pleased to announce the upcoming on-campus recruitment drive for final-year undergraduate students (Batch of 2027).

Eligible Branches:
- Computer Science & Engineering (CSE)
- Electronics & Communication Engineering (ECE)

Positions:
1. Associate Cloud Engineer (Base: $92,000 / annum)
2. Full Stack Software Engineer (Base: $88,000 / annum)
3. Systems & Firmware Intern-to-Hire

Eligibility Criteria:
- Minimum CGPA of 7.5 across all semesters with no active backlogs
- Online aptitude test and coding assessment will be held this Saturday in Central Computing Labs 1-4.

Please ensure your updated resume and GitHub portfolio links are submitted on the T&P portal before Wednesday 5:00 PM.`,
    excerpt: 'Placement drive for final year CSE & ECE students. Roles in Cloud Engineering and Full Stack. Mandatory portal registration by Wednesday.',
    department: 'CSE',
    category: 'Placements',
    priority: 'Urgent',
    status: 'published',
    targetAudience: 'Final Year Students (Batch of 2027)',
    author: {
      name: 'Prof. Rajiv Sharma',
      role: 'faculty',
      designation: 'T&P Department Coordinator',
      department: 'CSE',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-22T11:00:00Z',
    expiresAt: '2026-11-30T17:00:00Z',
    viewsCount: 1140,
    isPinned: false,
    isNew: true,
    attachments: [
      {
        name: 'NexusGlobal_Job_Description_Package.pdf',
        size: '1.2 MB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-104',
    title: 'VLSI & Embedded Systems Laboratory Maintenance & Calibration Notice',
    slug: 'vlsi-lab-maintenance-calibration',
    content: `This is to inform all ECE faculty, research scholars, and students that the Advanced VLSI & FPGA Design Laboratory (Lab Room 304) will undergo scheduled hardware maintenance, firmware upgrades, and calibration of spectrum analyzers.

Maintenance Schedule:
- Start: Thursday, 8:00 AM
- Completion: Friday, 6:00 PM

During this maintenance window:
- Workstation access and FPGA test bench power grids will remain completely offline.
- Scheduled lab practical sessions for ECE-302 will be temporarily relocated to Digital Electronics Lab 202.
- Normal operations and project hours will resume on Monday.`,
    excerpt: 'Lab 304 will be offline on Thursday and Friday for hardware calibration and FPGA firmware updates. Practical classes relocated to Lab 202.',
    department: 'ECE',
    category: 'Academic',
    priority: 'Normal',
    status: 'published',
    targetAudience: 'ECE Students & Faculty',
    author: {
      name: 'Dr. Amit Sinha',
      role: 'hod',
      designation: 'HOD - Electronics & Communication',
      department: 'ECE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-21T16:20:00Z',
    expiresAt: '2026-11-28T18:00:00Z',
    viewsCount: 420,
    isPinned: false,
    isNew: false,
    attachments: [
      {
        name: 'Lab_Relocation_Schedule.pdf',
        size: '450 KB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-105',
    title: 'National Holiday Notice: University Campus Closed for Diwali Festival Week',
    slug: 'national-holiday-campus-closure',
    content: `In accordance with the State Academic Calendar, ABES Engineering College campus including all administrative offices, academic departments, lecture halls, and laboratories will remain closed for Diwali & National Festival Holiday.

Details:
- Administrative Offices: Closed from Nov 26 through Nov 29.
- Central Library: Operates with automated 24/7 card-swipe reading room access only.
- Campus Health Centre: Emergency staff on duty 24/7.
- University Shuttle Service: Suspended during official holiday dates.

All scheduled classes and departmental reviews will resume as per regular timetable on Monday morning. Have a safe and joyful holiday.`,
    excerpt: 'University closed for holidays. Academic classes suspended. Central Library self-study room accessible via RFID swipe.',
    department: 'All',
    category: 'Administration',
    priority: 'High',
    status: 'published',
    targetAudience: 'All Students, Faculty & Staff',
    author: {
      name: 'Dr. Sanjay Kumar Agarwal',
      role: 'admin',
      designation: 'Registrar & Academic Director',
      department: 'All',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-20T10:00:00Z',
    expiresAt: '2026-12-01T23:59:00Z',
    viewsCount: 2310,
    isPinned: false,
    isNew: false,
    attachments: []
  },
  {
    id: 'ntc-106',
    title: 'Annual Inter-Department Sports Fest "Olympus 2026" - Fixtures & Tryouts',
    slug: 'annual-inter-department-sports-fest-olympus',
    content: `The Sports & Physical Education Council is proud to announce the fixtures and selection tryouts for "Olympus 2026", our prestigious annual inter-department championship.

Featured Tournaments:
- Football (Men & Women)
- Basketball (5v5 and 3v3 Half-Court)
- Cricket (T20 League Format)
- Badminton (Singles & Mixed Doubles)
- Table Tennis & Chess

Tryout Schedule:
Department teams must conduct internal trials this coming week. Department sports captains are requested to submit official player rosters verified by their respective HODs to the Sports Office by Friday 4:00 PM.

Trophies, certificates, and athletic scholarship points will be awarded to top performers.`,
    excerpt: 'Tryouts open for Inter-Department Cricket, Football, Basketball, and Badminton. Department rosters due to Sports Cell by Friday.',
    department: 'All',
    category: 'Sports',
    priority: 'Normal',
    status: 'published',
    targetAudience: 'All University Students',
    author: {
      name: 'Dr. Manoj Kumar',
      role: 'hod',
      designation: 'Chair, University Sports Committee',
      department: 'ME',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-19T13:45:00Z',
    expiresAt: '2026-12-08T18:00:00Z',
    viewsCount: 780,
    isPinned: false,
    isNew: false,
    attachments: [
      {
        name: 'Olympus2026_Tournament_Brackets.pdf',
        size: '3.1 MB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-107',
    title: 'Mechanical Design & Robotics Workshop: SolidWorks & ROS Integration',
    slug: 'mechanical-design-robotics-workshop',
    content: `The Department of Mechanical Engineering is organizing a comprehensive three-day hands-on bootcamp on 3D CAD modeling with Dassault Systèmes SolidWorks and Robot Operating System (ROS 2).

Topics Covered:
- Advanced parametric 3D modeling and dynamic kinematic stress simulations
- Exporting CAD models to URDF format
- ROS 2 control nodes and simulation in Gazebo
- Live demo with robotic arms and autonomous mobile robots (AMRs)

Certificates of completion with industry endorsement will be issued to all participants completing the final capstone project. Limited to 45 seats.`,
    excerpt: 'Hands-on 3-day bootcamp on SolidWorks CAD modeling, dynamic simulation, and ROS 2 robotics integration. Limited to 45 seats.',
    department: 'ME',
    category: 'Academic',
    priority: 'Normal',
    status: 'published',
    targetAudience: 'ME & ECE Students',
    author: {
      name: 'Dr. Manoj Kumar',
      role: 'hod',
      designation: 'HOD - Mechanical Engineering',
      department: 'ME',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-18T10:30:00Z',
    expiresAt: '2026-12-05T17:00:00Z',
    viewsCount: 390,
    isPinned: false,
    isNew: false,
    attachments: [
      {
        name: 'Robotics_Workshop_Brochure.pdf',
        size: '1.4 MB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-108',
    title: 'Civil Dept: Structural Health Monitoring & Smart Concrete Field Visit',
    slug: 'civil-structural-health-monitoring-field-visit',
    content: `All 3rd and 4th-year Civil Engineering students are hereby notified regarding the upcoming mandatory technical field visit to the Metro Viaduct Construction Site & Smart Concrete Testing Laboratory.

Logistics:
- Date of Visit: December 2nd
- Departure: 8:30 AM sharp from University Main Gate
- Required Gear: Safety hard hats, high-visibility reflective vests, and closed toe boots (provided by department if needed).

Students will observe non-destructive ultrasonic concrete testing, piezoelectric strain sensors, and live soil compaction tests. Technical report submission will carry 10 marks in Course CE-402.`,
    excerpt: 'Mandatory technical field visit for 3rd and 4th year Civil students to Metro Viaduct construction site and smart materials laboratory.',
    department: 'Civil',
    category: 'Academic',
    priority: 'Normal',
    status: 'published',
    targetAudience: '3rd & 4th Year Civil Students',
    author: {
      name: 'Dr. Meenakshi Sharma',
      role: 'hod',
      designation: 'HOD - Civil Engineering',
      department: 'Civil',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-17T09:00:00Z',
    expiresAt: '2026-12-03T18:00:00Z',
    viewsCount: 310,
    isPinned: false,
    isNew: false,
    attachments: [
      {
        name: 'Field_Visit_Consent_Form.pdf',
        size: '520 KB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-109',
    title: 'Biotechnology Symposium: CRISPR Gene Editing & Synthetic Biology',
    slug: 'biotech-symposium-crispr-gene-editing',
    content: `The Department of Biotechnology cordially invites all researchers, postgraduate scholars, and undergraduate students to the international seminar on "Targeted Gene Therapeutics and Ethical Frameworks in Synthetic Biology".

Keynote Speaker: Dr. Elena Rostova, Senior Principal Scientist at Genentech.
Venue: Main Auditorium & Hybrid Live Stream
Date: December 8th, 10:00 AM - 4:00 PM

Poster presentation abstracts can be submitted until November 30th. Selected undergraduate papers will receive travel grant awards for the upcoming Global BioTech Congress.`,
    excerpt: 'International seminar with Dr. Elena Rostova on CRISPR therapeutics. Poster abstract submissions open until Nov 30.',
    department: 'Biotech',
    category: 'Events',
    priority: 'High',
    status: 'published',
    targetAudience: 'Biotech & Life Sciences Students',
    author: {
      name: 'Dr. Ananya Patel',
      role: 'hod',
      designation: 'HOD - Biotechnology',
      department: 'Biotech',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-16T15:00:00Z',
    expiresAt: '2026-12-09T18:00:00Z',
    viewsCount: 460,
    isPinned: false,
    isNew: false,
    attachments: [
      {
        name: 'BioTech_Symposium_Schedule.pdf',
        size: '1.9 MB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-110',
    title: 'MBA Executive Speaker Series: Global Fintech & Venture Capital Valuation',
    slug: 'mba-executive-speaker-series-fintech',
    content: `The School of Management & Business is excited to present an exclusive Masterclass for MBA and finance students on "Fintech Disruption and Startup Valuation Methodologies in Private Equity".

Distinguished Speaker: Dr. Shailendra Nigam, Managing Director at Horizon Capital Ventures.
Topics:
- DCF vs Pre-Money Multiples in Seed vs Growth Equity
- Regulatory sandboxes for AI-driven credit underwriting
- Q&A session on summer investment banking internships

Registration is free but prior seat reservation through the student management portal is required.`,
    excerpt: 'Exclusive masterclass for MBA students with Dr. Shailendra Nigam, Managing Director at Horizon Capital, discussing PE valuations and Fintech.',
    department: 'Management',
    category: 'Events',
    priority: 'Normal',
    status: 'published',
    targetAudience: 'MBA & Business Students',
    author: {
      name: 'Dr. Rakesh Kumar Sharma',
      role: 'hod',
      designation: 'Dean, School of Management',
      department: 'Management',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-15T11:20:00Z',
    expiresAt: '2026-12-06T17:00:00Z',
    viewsCount: 520,
    isPinned: false,
    isNew: false,
    attachments: [
      {
        name: 'Fintech_Lecture_Outline.pdf',
        size: '680 KB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-111',
    title: 'CSE Lab Re-Evaluation Schedule for Object Oriented Programming',
    slug: 'cse-lab-re-evaluation-oop',
    content: `Faculty members have submitted the supplementary practical examination schedule for students who missed their Object Oriented Programming (CS-204) evaluation due to verified medical leaves or university sports representation.

Dates:
- Section A & B: Monday, 2:00 PM - 5:00 PM (Lab 102)
- Section C & D: Tuesday, 2:00 PM - 5:00 PM (Lab 103)

Please bring your approved lab manual and university ID card. No further make-up evaluations will be scheduled this semester.`,
    excerpt: 'Supplementary lab practical exam schedule for OOP (CS-204) students with valid medical leaves. Held in Lab 102 and 103.',
    department: 'CSE',
    category: 'Examinations',
    priority: 'High',
    status: 'pending',
    targetAudience: '2nd Year CSE Students',
    author: {
      name: 'Prof. Rajiv Sharma',
      role: 'faculty',
      designation: 'Course Coordinator - CS204',
      department: 'CSE',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-25T08:30:00Z',
    expiresAt: '2026-12-05T18:00:00Z',
    viewsCount: 88,
    isPinned: false,
    isNew: true,
    attachments: [
      {
        name: 'CS204_Eligible_Student_List.pdf',
        size: '340 KB',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  {
    id: 'ntc-112',
    title: 'Call for Student Submissions: Annual University Magazine "The ABES College Chronicle"',
    slug: 'apex-chronicle-magazine-submissions',
    content: `The Editorial Board of ABES Engineering College is now accepting creative writing, research essays, poetry, technical artwork, and campus photography for the 2026-2027 edition of The ABES College Chronicle.

Submission Guidelines:
- Category 1: Fiction & Creative Prose (up to 2,000 words)
- Category 2: Technical Articles & Future Tech Perspectives (up to 1,500 words)
- Category 3: Visual Arts, Photography & Digital Illustrations (high-res PNG/TIFF)

Prizes will be awarded for Best Undergraduate Essay and Best Artistic Cover Concept. Submissions should be sent via the student portal editorial link.`,
    excerpt: 'Submit your creative writing, research essays, and photography for the 2026 edition of The ABES College Chronicle magazine.',
    department: 'All',
    category: 'General',
    priority: 'Low',
    status: 'pending',
    targetAudience: 'All University Students',
    author: {
      name: 'Prof. Rajiv Sharma',
      role: 'faculty',
      designation: 'Faculty Advisor, Literary Society',
      department: 'CSE',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    publishedAt: '2026-11-25T11:00:00Z',
    expiresAt: '2026-12-20T23:59:00Z',
    viewsCount: 65,
    isPinned: false,
    isNew: true,
    attachments: []
  }
];

export const facultyMembers = [
  {
    id: 'fac-1',
    name: 'Dr. Shruti Gupta',
    designation: 'Professor & Head of Department',
    department: 'CSE',
    specialization: 'Artificial Intelligence & Distributed Systems',
    email: 'hod.cse2@abes.ac.in',
    noticesCount: 16,
    avatar: '/hod-shruti-gupta.png',
    status: 'Active'
  },
  {
    id: 'fac-2',
    name: 'Prof. Rajiv Sharma',
    designation: 'Associate Professor',
    department: 'CSE',
    specialization: 'Data Structures & Database Systems',
    email: 'rajiv.sharma@apexuniversity.edu',
    noticesCount: 12,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'fac-3',
    name: 'Dr. Priya Sundaram',
    designation: 'Associate Professor',
    department: 'CSE',
    specialization: 'Computer Vision & Deep Learning',
    email: 'priya.sundaram@apexuniversity.edu',
    noticesCount: 8,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'fac-4',
    name: 'Prof. Vikram Singh',
    designation: 'Assistant Professor',
    department: 'CSE',
    specialization: 'Network Security & Cryptography',
    email: 'vikram.singh@abes.ac.in',
    noticesCount: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'On Leave'
  },
  {
    id: 'fac-5',
    name: 'Dr. Neha Verma',
    designation: 'Assistant Professor',
    department: 'CSE',
    specialization: 'Human-Computer Interaction & Web Tech',
    email: 'neha.verma@abes.ac.in',
    noticesCount: 9,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'fac-6',
    name: 'Prof. Amit Sharma',
    designation: 'Assistant Professor',
    department: 'CSE',
    specialization: 'Operating Systems & Cloud Architecture',
    email: 'amit.sharma@abes.ac.in',
    noticesCount: 7,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  }
];

export const upcomingEvents = [
  {
    id: 'evt-1',
    title: 'Midterm Theory Examinations',
    date: 'Dec 02 - Dec 09, 2026',
    time: '09:30 AM - 12:30 PM',
    venue: 'Exam Halls Block B & C',
    category: 'Exams',
    color: 'rose'
  },
  {
    id: 'evt-2',
    title: 'Apex National Hackathon 2026',
    date: 'Dec 12 - Dec 14, 2026',
    time: '36 Hours Non-Stop',
    venue: 'Innovation Hub & Labs',
    category: 'Competitions',
    color: 'blue'
  },
  {
    id: 'evt-3',
    title: 'Campus Placement Prep Session',
    date: 'Dec 16, 2026',
    time: '02:00 PM - 04:30 PM',
    venue: 'Seminar Hall 2',
    category: 'Career',
    color: 'emerald'
  },
  {
    id: 'evt-4',
    title: 'Final Year Capstone Milestone 2',
    date: 'Dec 18, 2026',
    time: '11:00 AM Deadline',
    venue: 'Department Portal',
    category: 'Academic',
    color: 'amber'
  }
];

export const activityLogs = [
  {
    id: 'act-1',
    user: 'Dr. Shruti Gupta',
    action: 'Approved Notice',
    target: 'Midterm Practical Exam Timetable',
    time: '12 minutes ago',
    type: 'success'
  },
  {
    id: 'act-2',
    user: 'Prof. Rajiv Sharma',
    action: 'Created Notice',
    target: 'CS204 OOP Lab Re-evaluation Schedule',
    time: '1 hour ago',
    type: 'info'
  },
  {
    id: 'act-3',
    user: 'Dr. Sanjay Kumar Agarwal',
    action: 'Published Global Circular',
    target: 'Diwali & National Festival Holiday Closure',
    time: '3 hours ago',
    type: 'warning'
  },
  {
    id: 'act-4',
    user: 'Dr. Amit Sinha',
    action: 'Updated Notice',
    target: 'VLSI Lab Maintenance Window',
    time: '5 hours ago',
    type: 'info'
  },
  {
    id: 'act-5',
    user: 'Ankit Kumar',
    action: 'Downloaded Attachment',
    target: 'Midterm_Exam_Timetable_Fall2026.pdf',
    time: '6 hours ago',
    type: 'default'
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Urgent: Midterm Exam Schedule Released',
    message: 'The official timetable for Fall 2026 has been published by Examination Cell.',
    time: '15 mins ago',
    isRead: false,
    priority: 'Urgent',
    noticeId: 'ntc-101'
  },
  {
    id: 'notif-2',
    title: 'Placement Drive Announcement',
    message: 'Nexus Global & CloudScale Software test scheduled for this Saturday.',
    time: '2 hours ago',
    isRead: false,
    priority: 'High',
    noticeId: 'ntc-103'
  },
  {
    id: 'notif-3',
    title: 'Notice Approval Requested',
    message: 'Prof. Rajiv Sharma submitted CS204 Lab Re-evaluation notice for your review.',
    time: '4 hours ago',
    isRead: false,
    priority: 'Normal',
    noticeId: 'ntc-111'
  },
  {
    id: 'notif-4',
    title: 'Hackathon 2026 Teams Registration',
    message: 'Early bird registration closes in 10 days. 42 teams have registered so far.',
    time: '1 day ago',
    isRead: true,
    priority: 'Normal',
    noticeId: 'ntc-102'
  }
];

export const categories = [
  'All',
  'Academic',
  'Examinations',
  'Events',
  'Placements',
  'Administration',
  'Sports',
  'General'
];

export const priorities = [
  'All',
  'Urgent',
  'High',
  'Normal',
  'Low'
];

export const analyticsData = {
  departmentNotices: [
    { department: 'CSE', published: 28, pending: 3, views: 6420 },
    { department: 'ECE', published: 22, pending: 2, views: 4890 },
    { department: 'ME', published: 18, pending: 1, views: 3650 },
    { department: 'Civil', published: 15, pending: 2, views: 2980 },
    { department: 'Biotech', published: 14, pending: 1, views: 2450 },
    { department: 'Management', published: 19, pending: 1, views: 3820 }
  ],
  categoryDistribution: [
    { name: 'Academic', value: 34, color: '#3b82f6' },
    { name: 'Examinations', value: 24, color: '#ef4444' },
    { name: 'Events', value: 20, color: '#8b5cf6' },
    { name: 'Placements', value: 16, color: '#10b981' },
    { name: 'Administration', value: 14, color: '#f59e0b' },
    { name: 'Sports', value: 10, color: '#06b6d4' }
  ],
  monthlyTrend: [
    { month: 'Jun', notices: 18, views: 3200 },
    { month: 'Jul', notices: 24, views: 4600 },
    { month: 'Aug', notices: 45, views: 8900 },
    { month: 'Sep', notices: 38, views: 7800 },
    { month: 'Oct', notices: 42, views: 9200 },
    { month: 'Nov', notices: 52, views: 11400 }
  ]
};
