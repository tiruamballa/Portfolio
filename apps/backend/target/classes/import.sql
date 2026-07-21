-- Prepopulate Skills
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('Java', 'PROGRAMMING', 95, 'Primary backend programming stack.', 1, 'Advanced', 'Coffee', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('JavaScript', 'FRONTEND', 90, 'Dynamic client scripting.', 2, 'Advanced', 'Code', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('Python', 'PROGRAMMING', 85, 'Data analytics & AI scripts.', 3, 'Intermediate', 'Terminal', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('Spring Boot', 'BACKEND', 92, 'Enterprise service REST frameworks.', 4, 'Advanced', 'Cpu', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('React', 'FRONTEND', 88, 'Modular web UI construction.', 5, 'Advanced', 'Layout', true);
INSERT INTO skill (name, category, confidence, description, display_order, experience_level, icon_name, visible) VALUES ('MySQL', 'DATABASE', 90, 'Relational queries and storage.', 6, 'Advanced', 'Database', true);

-- Prepopulate Projects
-- Prepopulate Projects
INSERT INTO project (title, description, github_url, demo_url, challenges, features, featured, display_order, status_enum) VALUES ('JeevMitra Healthcare App', 'A complete healthcare portal designed to connect patients, pharmacies, and observers into a cohesive digital ecosystem to track medication adherence.', 'https://github.com/tiruamballa/JeevMitra', '#', 'Synchronizing high-frequency observer notifications and computing compliance scores.', 'DoseTrack checklists, observer network portals, billing POS terminals.', true, 1, 'COMPLETED');
INSERT INTO project (title, description, github_url, demo_url, challenges, features, featured, display_order, status_enum) VALUES ('ATR Operating System', 'A custom-built operating system mapping career execution pathways, streaks, and university attendance tracking for engineering students.', 'https://github.com/tiruamballa/ATR', '#', 'Processing dynamic streak increments based on task weights.', 'Execution checklists, attendance buffer calculators, LeetCode metrics.', true, 2, 'IN_PROGRESS');
INSERT INTO project (title, description, github_url, demo_url, challenges, features, featured, display_order, status_enum) VALUES ('QuizLive', 'An interactive, real-time multi-user quiz streaming platform powered by WebSockets to synchronize quiz timers and manage concurrent user session data.', 'https://github.com/tiruamballa/quizlive.errorists', '#', 'Synchronizing quiz timelines and state transitions across socket connections.', 'Real-time leaderboards, session score metrics, quiz widgets.', true, 3, 'COMPLETED');
INSERT INTO project (title, description, github_url, demo_url, challenges, features, featured, display_order, status_enum) VALUES ('ArogyaCare AI Assistant', 'A multilingual AI-powered healthcare assistant chatbot utilizing retrieval-augmented generation (RAG) and Gemini API integration for localized medical consulting.', 'https://github.com/tiruamballa/Arogyacare', '#', 'Structuring context injection guardrails for safety and retaining chat history.', 'RAG medical databases, language translations, Gemini prompt pipelines.', true, 4, 'COMPLETED');

-- Prepopulate Project Skill relations
INSERT INTO project_skill (project_id, skill_id) VALUES (1, 1); -- JeevMitra uses Java
INSERT INTO project_skill (project_id, skill_id) VALUES (1, 5); -- JeevMitra uses Spring Boot
INSERT INTO project_skill (project_id, skill_id) VALUES (2, 1); -- ATR uses Java
INSERT INTO project_skill (project_id, skill_id) VALUES (2, 5); -- ATR uses Spring Boot
INSERT INTO project_skill (project_id, skill_id) VALUES (3, 3); -- QuizLive uses Python
INSERT INTO project_skill (project_id, skill_id) VALUES (4, 3); -- ArogyaCare uses Python

-- Prepopulate Certifications
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('IBM SQL Certification', 'IBM Skills Network', '2024-06-15', 'IBM-SQL-9872', 'https://www.credly.com/badges/db4e1d70-7467-4226-bf75-80271c668ad7', 1);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('Cisco Python Essentials 1', 'Cisco Networking Academy', '2025-01-10', 'CISCO-PY-1', 'https://www.credly.com/org/cisco/badge/python-essentials-1', 2);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('Cisco Python Essentials 2', 'Cisco Networking Academy', '2025-02-12', 'CISCO-PY-2', 'https://www.credly.com/org/cisco/badge/python-essentials-2', 3);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('C Programming Level 1', 'Cisco Networking Academy / OpenEDG', '2025-03-01', 'CISCO-C-1', 'https://verify.edube.org/', 4);
INSERT INTO certification (name, organization, issue_date, credential_id, verify_link, display_order) VALUES ('C Programming Level 2', 'Cisco Networking Academy / OpenEDG', '2025-04-05', 'CISCO-C-2', 'https://verify.edube.org/', 5);

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
