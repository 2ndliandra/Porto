import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Mail, ExternalLink, Activity, Target, Zap, Clock, BookOpen, Building, GraduationCap, Laptop, Phone, MapPin, Compass } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SkillCard from '../components/SkillCard';
import { getProjects, getExperiences, getSkills, getSoftSkills, getAcademics, getOrganizations, getInternships, getContacts, getLearnings, getImageUrl } from '../services/api';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [academics, setAcademics] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [internships, setInternships] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [learnings, setLearnings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, expRes, skillRes, softSkillRes, academicRes, orgRes, internshipRes, contactRes, learningRes] = await Promise.all([
          getProjects(),
          getExperiences(),
          getSkills(),
          getSoftSkills(),
          getAcademics(),
          getOrganizations(),
          getInternships(),
          getContacts(),
          getLearnings()
        ]);
        setProjects(projectRes.data);
        setExperiences(expRes.data);
        setSkills(skillRes.data);
        setSoftSkills(softSkillRes.data);
        setAcademics(academicRes.data);
        setOrganizations(orgRes.data);
        setInternships(internshipRes.data);
        setContacts(contactRes.data);
        setLearnings(learningRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
          <span className="w-10 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full"></span>
          <LucideIcons.User className="text-fuchsia-500" />
          About Me
        </h2>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="glass p-10 rounded-3xl glass-hover relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-300/30 dark:bg-fuchsia-500/10 rounded-full blur-[60px] dark:blur-[80px] group-hover:bg-fuchsia-300/50 dark:group-hover:bg-fuchsia-500/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-300/30 dark:bg-indigo-500/10 rounded-full blur-[60px] dark:blur-[80px] group-hover:bg-indigo-300/50 dark:group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <p className="text-lg md:text-xl leading-relaxed text-slate-700 dark:text-text-muted relative z-10 font-light transition-colors duration-500">
            Mahasiswa <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-500">Teknologi Informasi</span> yang memiliki ketertarikan tinggi pada pengembangan website, khususnya di bidang <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-500">back-end development</span>, serta memiliki pengalaman di bidang <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">front-end</span>.

            Berpengalaman menggunakan <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">PHP (Laravel)</span>, <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">MySQL</span>, serta version control system seperti <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">Git & GitHub</span>.

            Selain itu, memiliki pengalaman dalam menggunakan <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">React TypeScript</span> dan <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">Tailwind CSS</span> untuk pengembangan antarmuka.

            Terbiasa bekerja dalam <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">tim</span> melalui pengalaman organisasi dan program <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">Magang Berdampak</span>.

            Memiliki <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">semangat tinggi untuk terus belajar</span>, mengembangkan kemampuan, serta mengikuti tren terbaru dalam perkembangan teknologi, khususnya di bidang <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">web development</span>.
          </p>
        </motion.div>
      </motion.section>

      {/* Academic Career Section */}
      <motion.section id="academic" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="pb-24 pt-4 px-4 max-w-5xl mx-auto relative">
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-500/5 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none transition-all duration-500"></div>
        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <span className="w-10 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
            <LucideIcons.GraduationCap className="text-emerald-500" />
            Academic Career
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl transition-colors duration-500">
            My formal education background and academic journey that built the foundation for my technical expertise.
          </p>
        </div>
        <div className="relative z-10 space-y-6">
          {Array.isArray(academics) && academics.length > 0 ? academics.map((academic, index) => (
            <motion.div
              key={academic._id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              className="glass p-6 rounded-2xl glass-hover group relative overflow-hidden border border-slate-200 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300/30 dark:bg-emerald-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-500">
                  <GraduationCap size={24} className="text-emerald-600 dark:text-emerald-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-500">{academic.institution}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium transition-colors duration-500">{academic.degree}</p>
                  <span className="text-sm text-slate-500 dark:text-text-muted transition-colors duration-500">{academic.year}</span>
                  {academic.description && (
                    <p className="text-slate-600 dark:text-text-muted mt-2 text-sm leading-relaxed transition-colors duration-500">{academic.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <p className="text-slate-500 dark:text-text-muted text-center py-6 relative z-10">No academic records found. Add them in the Admin panel!</p>
          )}
        </div>
      </motion.section>

      {/* Internship Experience Section */}
      <motion.section id="internships" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="pb-24 pt-4 px-4 max-w-5xl mx-auto relative">
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-sky-300/20 dark:bg-sky-500/5 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none transition-all duration-500"></div>
        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <span className="w-10 h-1 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"></span>
            <LucideIcons.Laptop className="text-sky-500" />
            Internship Experience
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl transition-colors duration-500">
            Hands-on professional experience gained through structured internship programs, bridging academic knowledge with real-world industry practice.
          </p>
        </div>
        <div className="relative z-10 space-y-6">
          {Array.isArray(internships) && internships.length > 0 ? internships.map((internship) => (
            <motion.div
              key={internship._id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              className="glass p-6 rounded-2xl glass-hover group relative overflow-hidden border border-slate-200 dark:border-white/5 hover:border-sky-300 dark:hover:border-sky-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-300/30 dark:bg-sky-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-200 dark:border-sky-500/20 transition-colors duration-500">
                  <Laptop size={24} className="text-sky-600 dark:text-sky-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-500">{internship.company}</h3>
                  <p className="text-sky-600 dark:text-sky-400 font-medium transition-colors duration-500">{internship.role}</p>
                  <span className="text-sm text-slate-500 dark:text-text-muted transition-colors duration-500">{internship.year}</span>
                  {internship.description && (
                    <p className="text-slate-600 dark:text-text-muted mt-2 text-sm leading-relaxed transition-colors duration-500">{internship.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <p className="text-slate-500 dark:text-text-muted text-center py-6 relative z-10">No internships found. Add them in the Admin panel!</p>
          )}
        </div>
      </motion.section>

      {/* Organizational Experience Section */}
      <motion.section id="organizations" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="pb-24 pt-4 px-4 max-w-5xl mx-auto relative">
        <div className="absolute left-0 top-1/3 w-96 h-96 bg-rose-300/20 dark:bg-rose-500/5 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none transition-all duration-500"></div>
        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <span className="w-10 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></span>
            <LucideIcons.Building className="text-rose-500" />
            Organizational Experience
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl transition-colors duration-500">
            My involvement in various organizations that developed critical leadership, teamwork, and communication skills.
          </p>
        </div>
        <div className="relative z-10 space-y-6">
          {Array.isArray(organizations) && organizations.length > 0 ? organizations.map((org) => (
            <motion.div
              key={org._id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              className="glass p-6 rounded-2xl glass-hover group relative overflow-hidden border border-slate-200 dark:border-white/5 hover:border-rose-300 dark:hover:border-rose-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-300/30 dark:bg-rose-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-500/20 transition-colors duration-500">
                  <Building size={24} className="text-rose-600 dark:text-rose-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-500">{org.name}</h3>
                  <p className="text-rose-600 dark:text-rose-400 font-medium transition-colors duration-500">{org.role}</p>
                  <span className="text-sm text-slate-500 dark:text-text-muted transition-colors duration-500">{org.year}</span>
                  {org.description && (
                    <p className="text-slate-600 dark:text-text-muted mt-2 text-sm leading-relaxed transition-colors duration-500">{org.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <p className="text-slate-500 dark:text-text-muted text-center py-6 relative z-10">No organizations found. Add them in the Admin panel!</p>
          )}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="py-24 px-4 max-w-5xl mx-auto relative cursor-glow-wrapper">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-500/5 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none transition-all duration-500"></div>
        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <span className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
            <LucideIcons.Zap className="text-cyan-500" />
            Skills & Technologies
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl transition-colors duration-500">
            A comprehensive overview of my technical proficiencies and the tools I utilize to engineer scalable solutions.
          </p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.isArray(skills) && skills.length > 0 ? skills.map((skill) => (
            <SkillCard 
              key={skill._id}
              skill={skill}
              IconComponent={LucideIcons[skill.iconName] || LucideIcons.Code2}
              colorTheme="cyan"
              itemVariants={itemVariants}
            />
          )) : (
            <p className="text-slate-500 dark:text-text-muted col-span-4 text-center py-6 w-full relative z-10">No skills found. Add them in the Admin panel!</p>
          )}
        </motion.div>
      </motion.section>

      {/* Soft Skills Section */}
      <motion.section id="soft-skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="pb-24 pt-4 px-4 max-w-5xl mx-auto relative cursor-glow-wrapper">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-amber-300/20 dark:bg-amber-500/5 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none transition-all duration-500"></div>
        <div className="mb-12 relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <span className="w-10 h-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"></span>
            <LucideIcons.Users className="text-amber-500" />
            Soft Skills & Leadership
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl transition-colors duration-500">
            Key interpersonal strengths and leadership qualities that ensure effective collaboration and smooth project delivery.
          </p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.isArray(softSkills) && softSkills.length > 0 ? softSkills.map((skill) => (
            <SkillCard 
              key={skill._id}
              skill={skill}
              IconComponent={LucideIcons[skill.iconName] || LucideIcons.Users}
              colorTheme="amber"
              itemVariants={itemVariants}
            />
          )) : (
            <p className="text-slate-500 dark:text-text-muted col-span-4 text-center py-6 w-full relative z-10">No soft skills found. Add them in the Admin panel!</p>
          )}
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="py-24 px-4 max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <span className="w-10 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
            <LucideIcons.LayoutGrid className="text-purple-500" />
            Featured Projects
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl transition-colors duration-500">
            A curated selection of my professional work, highlighting complex problem-solving and full-stack development implementations.
          </p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(projects) && projects.length > 0 ? projects.map(project => (
            <motion.div variants={itemVariants} whileHover={{ y: -10 }} key={project._id} className="glass p-4 rounded-[2.5rem] glass-hover flex flex-col group border border-slate-200 hover:border-purple-300 dark:border-white/5 dark:hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-purple-500/10">

              {/* Depth Layer 1: Nested Image Frame */}
              <div className="relative h-64 w-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-[#0b1120] dark:via-[#0b1120]/60 to-transparent z-10 opacity-90 group-hover:opacity-75 transition-opacity duration-500 rounded-[2rem]"></div>

                {project.image ? (
                  <img src={getImageUrl(project.image)} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-0" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/5 dark:to-white/10 flex items-center justify-center group-hover:from-purple-200 group-hover:to-indigo-200 dark:group-hover:from-purple-500/10 dark:group-hover:to-indigo-500/10 transition-colors duration-500 relative z-0 rounded-[2rem]">
                    <Target size={48} className="text-slate-400 dark:text-white/20 group-hover:text-purple-500 dark:group-hover:text-purple-400/50 transition-colors duration-500" />
                  </div>
                )}

                {/* Depth Layer 2: Overlapping Tech Stack Badges */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs font-semibold px-3 py-1.5 backdrop-blur-md bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-slate-800 dark:text-white shadow-lg rounded-full border border-slate-200 dark:border-white/20 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Depth Layer 3: Content Section */}
              <div className="px-4 py-8 flex flex-col flex-grow relative overflow-hidden">
                <div className="absolute -top-10 right-0 w-32 h-32 bg-purple-300/30 dark:bg-purple-500/5 rounded-full blur-[30px] dark:blur-[40px] group-hover:bg-purple-300/50 dark:group-hover:bg-purple-500/15 transition-all duration-500 pointer-events-none"></div>

                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-500">{project.title}</h3>
                <p className="text-slate-600 dark:text-text-muted mb-2 flex-grow leading-relaxed font-light transition-colors duration-500">{project.description}</p>

                {project.link && (
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 text-sm font-bold text-slate-800 dark:text-white transition-all group/link">
                      Launch Project <ExternalLink size={16} className="text-purple-600 dark:text-purple-400 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )) : (
            <p className="text-slate-500 dark:text-text-muted col-span-2 text-center py-10">No projects added yet. Go to Admin panel to create some!</p>
          )}
        </motion.div>
      </motion.section>

      {/* Experience Section */}
      <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="py-24 px-4 max-w-3xl mx-auto relative cursor-glow-wrapper">
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-500/5 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none transition-all duration-500"></div>
        <div className="mb-16 relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <span className="w-10 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full"></span>
            <LucideIcons.Briefcase className="text-indigo-500" />
            Professional Experience
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl transition-colors duration-500">
            A demonstrated history of contributions across various roles, driving technical excellence and successful product deliveries.
          </p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-purple-500/30 before:to-transparent z-10">
          {Array.isArray(experiences) && experiences.length > 0 ? experiences.map((exp, index) => (
            <motion.div variants={itemVariants} key={exp._id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-slate-300 dark:border-white/20 bg-white dark:bg-[#0b1120] text-blue-500 dark:text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:border-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 z-10">
                <Clock size={20} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass p-8 rounded-3xl glass-hover hover:-translate-y-2 transition-transform duration-300 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-300/30 dark:bg-indigo-500/5 rounded-full blur-[30px] dark:blur-[40px] group-hover:bg-indigo-300/50 dark:group-hover:bg-indigo-500/10 transition-all duration-500 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 mb-3 relative z-10">
                  <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{exp.role}</div>
                  <time className="font-caveat text-lg text-fuchsia-600 dark:text-fuchsia-400/90 whitespace-nowrap">{exp.year}</time>
                </div>
                <div className="text-sm font-semibold text-slate-500 dark:text-white/50 mb-4 tracking-wider uppercase relative z-10 transition-colors">{exp.company}</div>
                <div className="text-slate-600 dark:text-text-muted leading-relaxed relative z-10 transition-colors">{exp.desc}</div>
              </div>
            </motion.div>
          )) : (
            <p className="text-slate-500 dark:text-text-muted text-center py-10 w-full relative z-10">No experience records found. Go to Admin panel to create some!</p>
          )}
        </motion.div>
      </motion.section>

      {/* Currently Learning Section */}
      <motion.section id="learning" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="py-24 px-4 max-w-5xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-violet-300/20 dark:bg-violet-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex justify-center items-center gap-4 text-slate-900 dark:text-white transition-colors duration-500">
            <Compass className="text-violet-500 dark:text-violet-400" size={32} />
            Exploring & Learning
          </h2>
          <p className="text-slate-700 dark:text-text-muted text-lg font-light max-w-2xl mx-auto transition-colors duration-500">
            Constantly expanding my horizons. Here's what I'm currently focused on studying and exploring.
          </p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {Array.isArray(learnings) && learnings.length > 0 ? learnings.map((learning) => {
            const IconComponent = LucideIcons[learning.iconName] || BookOpen;
            return (
              <motion.div key={learning._id} variants={itemVariants} className="glass p-6 md:p-8 rounded-3xl glass-hover min-h-[220px] flex flex-col justify-between border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 group overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-[20px] group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
                <div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="w-12 h-12 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      learning.status === 'Completed' ? 'border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/10' :
                      learning.status === 'In Progress' ? 'border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-500/20 dark:text-blue-400 dark:bg-blue-500/10' :
                      'border-purple-200 text-purple-600 bg-purple-50 dark:border-purple-500/20 dark:text-purple-400 dark:bg-purple-500/10'
                    }`}>
                      {learning.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white relative z-10 transition-colors">{learning.name}</h3>
                  <p className="text-slate-600 dark:text-text-muted text-sm relative z-10 transition-colors">{learning.description}</p>
                </div>
                {learning.platform && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 relative z-10 transition-colors">
                    <span className="text-xs font-medium text-slate-500 dark:text-white/40 uppercase tracking-wider">Platform: </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-white/80">{learning.platform}</span>
                  </div>
                )}
              </motion.div>
            );
          }) : (
            <p className="text-slate-500 dark:text-text-muted text-center py-10 col-span-full">No active learning topics right now. Adding some soon!</p>
          )}
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="py-24 px-4 max-w-5xl mx-auto mb-20">
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }} className="glass p-12 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden border border-slate-200 dark:border-white/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-300/30 dark:bg-fuchsia-500/10 rounded-full blur-[60px] dark:blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/30 dark:bg-cyan-500/10 rounded-full blur-[60px] dark:blur-[80px]"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 flex justify-center items-center gap-4 relative z-10 text-slate-900 dark:text-white tracking-tight transition-colors duration-500">
            <LucideIcons.Mail className="text-fuchsia-500" size={36} />
            Let's Work Together
          </h2>
          <p className="text-lg text-slate-600 dark:text-text-muted max-w-xl mx-auto mb-10 relative z-10 font-light transition-colors duration-500">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            {Array.isArray(contacts) && contacts.length > 0 ? (
              <>
                {contacts[0].email && (
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`mailto:${contacts[0].email}`} className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-xl transition-colors shadow-lg dark:shadow-xl">
                    <Mail size={20} className="text-blue-500 dark:text-blue-400" />
                    <span className="font-semibold text-slate-800 dark:text-white">{contacts[0].email}</span>
                  </motion.a>
                )}
                {contacts[0].phone && (
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`tel:${contacts[0].phone}`} className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-xl transition-colors shadow-lg dark:shadow-xl">
                    <Phone size={20} className="text-emerald-500 dark:text-emerald-400" />
                    <span className="font-semibold text-slate-800 dark:text-white">{contacts[0].phone}</span>
                  </motion.a>
                )}
                {contacts[0].address && (
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-xl transition-colors shadow-lg dark:shadow-xl">
                    <MapPin size={20} className="text-rose-500 dark:text-rose-400" />
                    <span className="font-semibold text-slate-800 dark:text-white">{contacts[0].address}</span>
                  </motion.div>
                )}
                {contacts[0].github && (
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={contacts[0].github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 dark:bg-[#0b1120] dark:hover:bg-white/5 border border-slate-800 dark:border-white/10 px-6 py-4 rounded-xl transition-colors shadow-lg dark:shadow-xl">
                    <Code2 size={20} className="text-white" />
                    <span className="font-semibold text-white">{contacts[0].githubUsername || 'GitHub'}</span>
                  </motion.a>
                )}
                {contacts[0].instagram && (
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={contacts[0].instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 border border-pink-400/20 px-6 py-4 rounded-xl transition-all shadow-lg dark:shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    <span className="font-semibold text-white">{contacts[0].instagramUsername || 'Instagram'}</span>
                  </motion.a>
                )}
                {contacts[0].linkedin && (
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={contacts[0].linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#0A66C2] hover:bg-[#004182] border border-blue-400/20 px-6 py-4 rounded-xl transition-colors shadow-lg dark:shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    <span className="font-semibold text-white">{contacts[0].linkedinUsername || 'LinkedIn'}</span>
                  </motion.a>
                )}
              </>
            ) : (
              <>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:hello@example.com" className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-8 py-4 rounded-xl transition-colors shadow-lg dark:shadow-xl">
                  <Mail size={20} className="text-blue-500 dark:text-blue-400" />
                  <span className="font-semibold text-slate-800 dark:text-white">hello@example.com</span>
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 dark:bg-[#0b1120] dark:hover:bg-white/5 border border-slate-800 dark:border-white/10 px-8 py-4 rounded-xl transition-colors shadow-lg dark:shadow-xl">
                  <Code2 size={20} className="text-white" />
                  <span className="font-semibold text-white">GitHub</span>
                </motion.a>
              </>
            )}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Portfolio;
