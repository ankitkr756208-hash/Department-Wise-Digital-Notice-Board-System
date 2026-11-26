const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Department = require('../models/Department');
const Notice = require('../models/Notice');
const Bookmark = require('../models/Bookmark');
const ActivityLog = require('../models/ActivityLog');

const seedData = async () => {
  try {
    console.log('[Seeding]: Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[Seeding]: Clearing existing database collections...');

    await Promise.all([
      User.deleteMany(),
      Department.deleteMany(),
      Notice.deleteMany(),
      Bookmark.deleteMany(),
      ActivityLog.deleteMany()
    ]);

    console.log('[Seeding]: Creating academic departments...');
    const departments = await Department.create([
      {
        code: 'CSE',
        name: 'Computer Science & Engineering',
        description: 'Specializing in Artificial Intelligence, Cloud Computing, Cyber Security, and Software Engineering.',
        color: 'blue',
        accentColor: '#3b82f6',
        facultyCount: 38,
        studentCount: 1120,
        activeNoticesCount: 14
      },
      {
        code: 'ECE',
        name: 'Electronics & Communication',
        description: 'Advancing research in VLSI design, embedded systems, RF communications, and signal processing.',
        color: 'indigo',
        accentColor: '#6366f1',
        facultyCount: 32,
        studentCount: 890,
        activeNoticesCount: 9
      },
      {
        code: 'ME',
        name: 'Mechanical Engineering',
        description: 'Pioneering thermal systems, robotics, advanced manufacturing, and CAD/CAM automation.',
        color: 'amber',
        accentColor: '#f59e0b',
        facultyCount: 28,
        studentCount: 740,
        activeNoticesCount: 7
      },
      {
        code: 'Civil',
        name: 'Civil & Infrastructure Engineering',
        description: 'Leading innovations in structural mechanics, smart cities, hydrology, and geotechnical studies.',
        color: 'emerald',
        accentColor: '#10b981',
        facultyCount: 24,
        studentCount: 610,
        activeNoticesCount: 6
      },
      {
        code: 'Biotech',
        name: 'Biotechnology & Bioinformatics',
        description: 'Translating molecular biology, genomics, bioprocess engineering, and computational diagnostics.',
        color: 'teal',
        accentColor: '#14b8a6',
        facultyCount: 22,
        studentCount: 460,
        activeNoticesCount: 5
      },
      {
        code: 'Management',
        name: 'School of Management & Business',
        description: 'Fostering future leaders in finance, business analytics, product strategy, and entrepreneurship.',
        color: 'purple',
        accentColor: '#a855f7',
        facultyCount: 26,
        studentCount: 580,
        activeNoticesCount: 8
      }
    ]);

    console.log('[Seeding]: Creating institutional users with hashed passwords...');
    // Create users individually or through model to trigger pre('save') bcrypt hashing
    const adminUser = new User({
      name: 'Dr. Sanjay Kumar Agarwal',
      email: 'admin@abes.ac.in',
      password: 'password123',
      role: 'admin',
      department: 'All',
      designation: 'Director & Super Administrator',
      enrollmentNo: 'DIR-001',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      phone: '+91 120 713 5111'
    });
    await adminUser.save();

    // Legacy admin alias for backwards test compatibility
    const legacyAdmin = new User({
      name: 'Dr. Sanjay Kumar Agarwal',
      email: 'admin@apexuniversity.edu',
      password: 'password123',
      role: 'admin',
      department: 'All',
      designation: 'Director & Super Administrator',
      enrollmentNo: 'DIR-002',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      phone: '+91 120 713 5111'
    });
    await legacyAdmin.save();

    const hodUser = new User({
      name: 'Dr. Shruti Gupta',
      email: 'hod.cse2@abes.ac.in',
      password: 'password123',
      role: 'hod',
      department: 'CSE',
      designation: 'HOD-CSE-2 & Professor',
      enrollmentNo: 'FAC-CSE-002',
      avatar: '/hod-shruti-gupta.png',
      phone: '+91 120 713 5122'
    });
    await hodUser.save();

    // Legacy HOD alias
    const legacyHod = new User({
      name: 'Dr. Shruti Gupta',
      email: 'sarah.jenkins@apexuniversity.edu',
      password: 'password123',
      role: 'hod',
      department: 'CSE',
      designation: 'HOD-CSE-2 & Professor',
      enrollmentNo: 'FAC-CSE-001',
      avatar: '/hod-shruti-gupta.png',
      phone: '+91 120 713 5122'
    });
    await legacyHod.save();

    const facultyUser = new User({
      name: 'Prof. Rajiv Sharma',
      email: 'rajiv.sharma@abes.ac.in',
      password: 'password123',
      role: 'faculty',
      department: 'CSE',
      designation: 'Associate Professor (Data Systems)',
      enrollmentNo: 'FAC-CSE-018',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      phone: '+91 120 713 5133'
    });
    await facultyUser.save();

    const legacyFaculty = new User({
      name: 'Prof. Rajiv Sharma',
      email: 'rajiv.sharma@apexuniversity.edu',
      password: 'password123',
      role: 'faculty',
      department: 'CSE',
      designation: 'Associate Professor (Data Systems)',
      enrollmentNo: 'FAC-CSE-019',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      phone: '+91 120 713 5133'
    });
    await legacyFaculty.save();

    const facultyUser2 = new User({
      name: 'Dr. Priya Sundaram',
      email: 'priya.sundaram@abes.ac.in',
      password: 'password123',
      role: 'faculty',
      department: 'CSE',
      designation: 'Associate Professor (AI & Vision)',
      enrollmentNo: 'FAC-CSE-022',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      phone: '+91 120 713 5134'
    });
    await facultyUser2.save();

    const studentUser = new User({
      name: 'Ankit Kumar',
      email: 'ankit.kumar@student.abes.ac.in',
      password: 'password123',
      role: 'student',
      department: 'CSE',
      designation: 'B.Tech Student (Semester 6, CSE-A)',
      enrollmentNo: '2100320100042',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98765 43210'
    });
    await studentUser.save();

    const legacyStudent = new User({
      name: 'Ankit Kumar',
      email: 'danielle.attah@student.apex.edu',
      password: 'password123',
      role: 'student',
      department: 'CSE',
      designation: 'B.Tech Student (Semester 6, CSE-A)',
      enrollmentNo: '21CS042',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98765 43210'
    });
    await legacyStudent.save();

    // Link HOD to CSE Department
    const cseDept = await Department.findOne({ code: 'CSE' });
    if (cseDept) {
      cseDept.hod = hodUser._id;
      cseDept.hodName = hodUser.name;
      cseDept.hodEmail = hodUser.email;
      cseDept.hodAvatar = hodUser.avatar;
      await cseDept.save();
    }

    console.log('[Seeding]: Populating department circulars and notices...');
    const notices = await Notice.create([
      {
        title: 'Midterm Examination Timetable Released - Fall 2026',
        slug: 'midterm-examination-timetable-released-fall-2026',
        content: `The official midterm examination schedule for all engineering branches has been published by the Examination Cell.
All students are requested to download the examination timetable and report to their designated halls 15 minutes before commencement. Digital devices and smartwatches are strictly prohibited.`,
        excerpt: 'Official midterm examination timetable for undergraduate students published. Check halls and timings.',
        department: 'All',
        category: 'examination',
        priority: 'high',
        status: 'approved',
        targetAudience: 'All Students & Faculty',
        author: adminUser._id,
        approvedBy: adminUser._id,
        publishedAt: new Date(),
        expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        viewsCount: 1480,
        isPinned: true,
        attachments: [
          {
            name: 'Midterm_Exam_Timetable_Fall2026.pdf',
            url: '/uploads/Midterm_Exam_Timetable_Fall2026.pdf',
            size: '2.4 MB',
            type: 'pdf'
          }
        ]
      },
      {
        title: 'Apex Hackathon 2026: 36-Hour National CodeFest Registration Open',
        slug: 'apex-hackathon-2026-36-hour-national-codefest',
        content: `Department of Computer Science & Engineering is organizing the 8th Annual National Hackathon with a $15,000 cash prize pool. Teams of 2 to 4 students can register. Mentors from top tech firms will be present.`,
        excerpt: 'Register your team for the 36-hour flagship hackathon with $15,000 prize pool and industry mentorship.',
        department: 'CSE',
        category: 'events',
        priority: 'high',
        status: 'approved',
        targetAudience: 'All Engineering Students',
        author: hodUser._id,
        approvedBy: hodUser._id,
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        viewsCount: 920,
        isPinned: true,
        attachments: [
          {
            name: 'Apex_Hackathon_Rulebook_2026.pdf',
            url: '/uploads/Apex_Hackathon_Rulebook_2026.pdf',
            size: '1.8 MB',
            type: 'pdf'
          }
        ]
      },
      {
        title: 'On-Campus Placement Drive: Nexus Global & CloudScale Software',
        slug: 'on-campus-placement-drive-nexus-global',
        content: `Training & Placement Cell announces on-campus recruitment for final year CSE & ECE students. Roles: Associate Cloud Engineer & Full Stack Engineer. Mandatory registration on placement portal.`,
        excerpt: 'Placement drive for final year CSE & ECE students. Base package $90,000. Registration closes Wednesday.',
        department: 'CSE',
        category: 'placement',
        priority: 'high',
        status: 'approved',
        targetAudience: 'Final Year CSE & ECE Students',
        author: facultyUser._id,
        approvedBy: hodUser._id,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        viewsCount: 1140,
        attachments: [
          {
            name: 'NexusGlobal_Job_Description.pdf',
            url: '/uploads/NexusGlobal_Job_Description.pdf',
            size: '1.2 MB',
            type: 'pdf'
          }
        ]
      },
      {
        title: 'VLSI & Embedded Systems Laboratory Maintenance Notice',
        slug: 'vlsi-embedded-systems-lab-maintenance',
        content: `Advanced VLSI Lab Room 304 will be offline on Thursday and Friday for hardware calibration and FPGA firmware updates. Classes are temporarily relocated to Lab 202.`,
        excerpt: 'Lab 304 offline Thursday & Friday for maintenance. Practicals relocated to Lab 202.',
        department: 'ECE',
        category: 'academic',
        priority: 'medium',
        status: 'approved',
        targetAudience: 'ECE Students & Faculty',
        author: adminUser._id,
        approvedBy: adminUser._id,
        publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        viewsCount: 420
      },
      {
        title: 'National Holiday Notice: University Campus Closed for Thanksgiving',
        slug: 'national-holiday-campus-closed-thanksgiving',
        content: `All administrative offices and academic departments will remain closed for Thanksgiving holiday. Central Library 24/7 RFID study room remains operational. Regular classes resume Monday.`,
        excerpt: 'Campus closed for Thanksgiving. Regular classes resume Monday morning.',
        department: 'All',
        category: 'holiday',
        priority: 'high',
        status: 'approved',
        targetAudience: 'All Students & Staff',
        author: adminUser._id,
        approvedBy: adminUser._id,
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        viewsCount: 2310
      },
      {
        title: 'CS204 OOP Lab Supplementary Evaluation Schedule',
        slug: 'cs204-oop-lab-supplementary-evaluation',
        content: `Supplementary lab practical exam schedule for students who missed their Object Oriented Programming evaluation due to approved leaves. Labs 102 & 103, 2:00 PM to 5:00 PM.`,
        excerpt: 'Supplementary lab exam for CS204 students with valid leaves. Labs 102 & 103.',
        department: 'CSE',
        category: 'examination',
        priority: 'high',
        status: 'pending', // Pending approval by HOD!
        targetAudience: '2nd Year CSE Students',
        author: facultyUser._id,
        publishedAt: null,
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        viewsCount: 45
      },
      {
        title: 'Workshop on Generative AI and Large Language Models',
        slug: 'workshop-generative-ai-llms',
        content: `Department hands-on workshop covering Transformers architecture, fine-tuning techniques, and deployment of RAG pipelines using PyTorch. Limited to 50 attendees.`,
        excerpt: 'Hands-on 2-day workshop on Generative AI and RAG architectures. Registration required.',
        department: 'CSE',
        category: 'workshop',
        priority: 'medium',
        status: 'pending', // Pending approval
        targetAudience: '3rd & 4th Year Students',
        author: facultyUser2._id,
        publishedAt: null,
        expiresAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        viewsCount: 30
      }
    ]);

    console.log('[Seeding]: Creating initial bookmarks for student user...');
    await Bookmark.create([
      { user: studentUser._id, notice: notices[0]._id },
      { user: studentUser._id, notice: notices[1]._id }
    ]);

    console.log('[Seeding]: Creating audit logs...');
    await ActivityLog.create([
      {
        user: adminUser._id,
        userName: adminUser.name,
        action: 'APPROVED_NOTICE',
        target: 'Midterm Examination Timetable Released - Fall 2026',
        department: 'All',
        type: 'success'
      },
      {
        user: hodUser._id,
        userName: hodUser.name,
        action: 'APPROVED_NOTICE',
        target: 'On-Campus Placement Drive: Nexus Global',
        department: 'CSE',
        type: 'success'
      },
      {
        user: facultyUser._id,
        userName: facultyUser.name,
        action: 'SUBMITTED_NOTICE',
        target: 'CS204 OOP Lab Supplementary Evaluation Schedule',
        department: 'CSE',
        type: 'info'
      }
    ]);

    console.log('\n======================================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('======================================================');
    console.log('Pre-configured User Credentials (Password: password123):');
    console.log('1. Admin:   admin@abes.ac.in (or admin@apexuniversity.edu) - Dr. Sanjay Kumar Agarwal');
    console.log('2. HOD:     hod.cse2@abes.ac.in (or sarah.jenkins@apexuniversity.edu) - Dr. Shruti Gupta');
    console.log('3. Faculty: rajiv.sharma@abes.ac.in - Prof. Rajiv Sharma');
    console.log('4. Student: ankit.kumar@student.abes.ac.in (or danielle.attah@student.apex.edu) - Ankit Kumar');
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seeding Error]:', error);
    process.exit(1);
  }
};

seedData();
