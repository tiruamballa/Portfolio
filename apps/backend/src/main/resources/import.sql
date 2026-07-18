-- Prepopulate Skills
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('Java', 'PROGRAMMING', 95, 'Primary backend programming stack.', 1, 'Advanced', 'Coffee', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('JavaScript', 'FRONTEND', 90, 'Dynamic client scripting.', 2, 'Advanced', 'Code', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('Python', 'PROGRAMMING', 85, 'Data analytics & AI scripts.', 3, 'Intermediate', 'Terminal', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('Spring Boot', 'BACKEND', 92, 'Enterprise service REST frameworks.', 4, 'Advanced', 'Cpu', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('React', 'FRONTEND', 88, 'Modular web UI construction.', 5, 'Advanced', 'Layout', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('MySQL', 'DATABASE', 90, 'Relational queries and storage.', 6, 'Advanced', 'Database', true);

-- Prepopulate Projects
INSERT INTO project (title, description, github_url, demo_url, challenges, features, featured, display_order, status_enum) VALUES ('MEDIQ+ Medicine Tracking App', 'An AI-based medicine management and tracking application designed to help patients monitor medication schedules and expiry logs.', 'https://github.com/tiruamballa/MEDIQPLUS', '#', 'Syncing QR scans and real-time inventory triggers.', 'Real-time billing, Stock notifications, Expiry trackers.', true, 1, 'COMPLETED');
INSERT INTO project (title, description, github_url, demo_url, challenges, features, featured, display_order, status_enum) VALUES ('QuizLive', 'An interactive, real-time quiz portal built for multi-user engaging quiz streams using modern sockets.', 'https://github.com/tiruamballa/quizlive.errorists', '#', 'WS timer synchronizations under concurrent requests.', 'Leaderboards, Session logs, Socket controllers.', true, 2, 'COMPLETED');
INSERT INTO project (title, description, github_url, demo_url, challenges, features, featured, display_order, status_enum) VALUES ('ArogyaCare', 'A multilingual AI-powered healthcare assistant chatbot that outputs reliable medical suggestions in multiple regional languages.', 'https://github.com/tiruamballa/Arogyacare', '#', 'Context limits and guardrails for prompts.', 'Multilingual advisor, RAG embeddings, Clinic router.', true, 3, 'COMPLETED');

-- Prepopulate Project Skill relations
INSERT INTO project_skill (project_id, skill_id) VALUES (1, 5); -- MEDIQ+ uses Java
INSERT INTO project_skill (project_id, skill_id) VALUES (1, 4); -- MEDIQ+ uses Spring
INSERT INTO project_skill (project_id, skill_id) VALUES (2, 3); -- QuizLive uses JS
INSERT INTO project_skill (project_id, skill_id) VALUES (3, 3); -- ArogyaCare uses Python

-- Prepopulate Certifications
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('IBM SQL Certification', 'IBM Skills Network', '2024-06-15', 'IBM-SQL-9872', '/certifiactions/sql ibm certificate.pdf', 1);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('Cisco Python Essentials 1', 'Cisco Networking Academy', '2025-01-10', 'CISCO-PY-1', '/certifiactions/PythonEssentials1.pdf', 2);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('Cisco Python Essentials 2', 'Cisco Networking Academy', '2025-02-12', 'CISCO-PY-2', '/certifiactions/PythonEssentials2.pdf', 3);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('C Programming Level 1', 'Cisco Networking Academy / OpenEDG', '2025-03-01', 'CISCO-C-1', '/certifiactions/CEssentials1.pdf', 4);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('C Programming Level 2', 'Cisco Networking Academy / OpenEDG', '2025-04-05', 'CISCO-C-2', '/certifiactions/CEssentials2.pdf', 5);

-- Prepopulate Experiences
INSERT INTO experience (company, role, description, duration) VALUES ('Google Dev Program', 'Google Android Development Intern', 'Implementing mobile architectures and debugging UI layouts.', 'Dec 2025 - Present');
INSERT INTO experience (company, role, description, duration) VALUES ('Brain O Vision', 'Agentic AI Developer Intern', 'Built autonomous multi-agent pipelines and prompt routing workflows utilizing vector embeddings.', 'Sep 2025 - Nov 2025');
INSERT INTO experience (company, role, description, duration) VALUES ('Java Full Stack Developer', 'Enterprise Backend Intern', 'Designed stable database relationships, parametrized query filters, and REST access endpoints.', 'May 2025 - Aug 2025');
INSERT INTO experience (company, role, description, duration) VALUES ('InAmigos', 'Web Intern', 'Optimized frontend component rendering paths and engineered user dashboard elements.', 'Jan 2025 - Apr 2025');

-- Prepopulate Achievements
INSERT INTO achievement (title, category, description, date_string) VALUES ('Udbhav Event Organizer', 'VOLUNTEERING', 'Organized national student tech fest layouts.', '2025');
INSERT INTO achievement (title, category, description, date_string) VALUES ('CSI Active Committee Group', 'LEADERSHIP', 'Currently active as an Executive Body Member (EBM) of the CSI student club.', 'Present');

-- Prepopulate Site Settings
INSERT INTO site_setting (config_key, config_value) VALUES ('heroHeadline', 'Building software systems that solve real-world problems.');
INSERT INTO site_setting (config_key, config_value) VALUES ('heroSubtitle', 'Java Full Stack Developer, AI Engineer, and Data Analytics enthusiast. Engineering dynamic dashboards and database layers.');
INSERT INTO site_setting (config_key, config_value) VALUES ('location', 'Andhra Pradesh, India');
INSERT INTO site_setting (config_key, config_value) VALUES ('availability', 'Available for Internships');
INSERT INTO site_setting (config_key, config_value) VALUES ('profileImage', '/images/profile.png');
