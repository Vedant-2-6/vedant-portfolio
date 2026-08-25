import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Play, FolderGit2, Cpu, User, Network, ShieldCheck, Cloud, Activity, TerminalIcon as TerminalSquare, LayoutDashboard } from 'lucide-react';

// Web Audio for mechanical keyboard sounds
const playKeySound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

const CV = {
  about: {
    title: 'Cloud Infrastructure & DevOps Engineer',
    text: 'Architecting highly reliable enterprise cloud environments and autonomous SRE platforms. Passionate about transforming manual operations into scalable, code-driven workflows.'
  },
  skills: [
    { category: 'Cloud & DevOps', items: ['Azure', 'AWS', 'Kubernetes', 'Docker', 'Terraform', 'ArgoCD', 'CI/CD'] },
    { category: 'Backend & AI', items: ['Python', 'Node.js', 'REST APIs', 'Microservices', 'RAG'] },
    { category: 'Frontend & UI', items: ['React.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Security & Ops', items: ['Prometheus', 'Grafana', 'OPA Rego', 'Linux', 'Bash'] }
  ],
  experience: [
    {
      role: 'DevOps & Cloud Infrastructure Intern',
      company: 'Simform Solutions',
      date: 'Jan 2026 - Jul 2026',
      highlights: [
        'Architected 3-tier cloud-native infra on Azure with 99.9% uptime.',
        'Provisioned infra via Terraform, cutting turnaround time by 50%.',
        'Configured Kubernetes (AKS) reducing manual recovery by 40%.',
        'Implemented centralized observability telemetry using Log Analytics.'
      ]
    },
    {
      role: 'Backend & AI Developer Intern',
      company: 'Nakya AI',
      date: 'Jun 2025 - Aug 2025',
      highlights: [
        'Built containerized Python microservices using Docker.',
        'Architected production AI data pipelines reducing latency by 30%.'
      ]
    }
  ],
  projects: [
    {
      name: 'DevOps-God (Autonomous AI SRE)',
      desc: 'Closed-loop SRE platform using Kubernetes, eBPF, and Prometheus to detect failure modes in ms.',
      tags: ['Kubernetes', 'ArgoCD', 'Prometheus', 'Terraform', 'Python']
    },
    {
      name: 'Simform Code Clash 2026',
      desc: 'Automated Security Vulnerability Scanner using Python AST.',
      tags: ['Python AST', 'Static Analysis', 'CI/CD']
    },
    {
      name: 'TagAlong Full-Stack App',
      desc: 'End-to-end cloud deployment of a scalable MERN-stack application using Terraform.',
      tags: ['React', 'Node.js', 'Terraform', 'Docker']
    }
  ]
};


const SystemStats = () => {
  const [stats, setStats] = useState({ cpu: 12, ram: 45, ping: 24 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 20) + 5,
        ram: Math.floor(Math.random() * 10) + 40,
        ping: Math.floor(Math.random() * 15) + 20
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 border-t border-gray-800 pt-4">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
        <Activity size={12} className="text-green-500" /> Live Telemetry
      </p>
      <div className="px-2 space-y-3 font-mono text-xs">
        <div>
          <div className="flex justify-between text-gray-400 mb-1"><span>CPU Usage</span><span className="text-green-400">{stats.cpu}%</span></div>
          <div className="w-full bg-gray-800 rounded-full h-1"><div className="bg-green-500 h-1 rounded-full transition-all duration-500" style={{width: stats.cpu + '%'}}></div></div>
        </div>
        <div>
          <div className="flex justify-between text-gray-400 mb-1"><span>Memory Allocation</span><span className="text-blue-400">{stats.ram}%</span></div>
          <div className="w-full bg-gray-800 rounded-full h-1"><div className="bg-blue-500 h-1 rounded-full transition-all duration-500" style={{width: stats.ram + '%'}}></div></div>
        </div>
        <div>
          <div className="flex justify-between text-gray-400 mb-1"><span>Cluster Latency</span><span className="text-yellow-400">{stats.ping}ms</span></div>
        </div>
      </div>
    </div>
  );
};

// ... Rich Output Components (About, Skills, Experience, Projects)
const AboutOutput = () => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-5 bg-gradient-to-r from-green-900/20 to-transparent border-l-2 border-green-500 my-4 shadow-lg rounded-r-md">
    <div className="flex items-center gap-3 mb-2 text-green-400">
      <User size={20} />
      <h2 className="text-lg font-bold tracking-wider">{CV.about.title}</h2>
    </div>
    <p className="text-gray-300 leading-relaxed text-sm md:text-base font-sans">{CV.about.text}</p>
    <div className="flex gap-4 mt-4">
      <a href="mailto:vedantpatelvp04@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm transition-colors">@ Contact</a>
      <a href="https://github.com/Vedant-2-6" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm transition-colors">{">"} GitHub</a>
      <a href="https://linkedin.com/in/vedantpatel" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm transition-colors">{">"} LinkedIn</a>
    </div>
  </motion.div>
);

const SkillsOutput = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
    {CV.skills.map((skillGroup, idx) => (
      <div key={idx} className="bg-[#0f1115]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-5 shadow-lg shadow-black/50 hover:border-green-500/50 hover:shadow-green-900/20 transition-all duration-300 group">
        <h3 className="text-gray-300 font-bold mb-4 flex items-center gap-2 group-hover:text-green-400 transition-colors">
          {idx === 0 && <Cloud size={16} className="text-blue-400" />}
          {idx === 1 && <Cpu size={16} className="text-purple-400" />}
          {idx === 2 && <TerminalIcon size={16} className="text-yellow-400" />}
          {idx === 3 && <ShieldCheck size={16} className="text-red-400" />}
          {skillGroup.category}
        </h3>
        <div className="flex flex-wrap gap-2">
          {skillGroup.items.map(item => (
            <span key={item} className="text-xs font-sans bg-gray-900/80 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700/50 group-hover:border-gray-600 transition-colors shadow-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </motion.div>
);

const ExperienceOutput = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 my-6">
    {CV.experience.map((exp, idx) => (
      <div key={idx} className="relative pl-8 border-l-2 border-gray-800 hover:border-green-500 transition-colors duration-300">
        <div className="absolute w-4 h-4 bg-[#0a0a0a] border-2 border-green-500 rounded-full -left-[9px] top-1 shadow-[0_0_10px_#3fb950]"></div>
        <h3 className="text-lg font-bold text-white tracking-wide">{exp.role}</h3>
        <div className="text-green-400 text-sm mb-3 font-sans font-medium">{exp.company} <span className="text-gray-500 mx-2">|</span> <span className="text-gray-500">{exp.date}</span></div>
        <ul className="list-none space-y-2">
          {exp.highlights.map((h, i) => (
            <li key={i} className="text-gray-400 text-sm flex items-start gap-3 font-sans">
              <span className="text-green-500 mt-0.5 text-xs">▹</span> <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </motion.div>
);

const ProjectsOutput = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-4 my-4">
    {CV.projects.map((proj, idx) => (
      <div key={idx} className="group bg-gradient-to-br from-[#0f1115] to-[#0a0a0a] border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
        <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-3 group-hover:text-blue-300 text-lg">
          <FolderGit2 size={18} />
          {proj.name}
        </h3>
        <p className="text-gray-400 text-sm mb-5 font-sans leading-relaxed max-w-2xl">{proj.desc}</p>
        <div className="flex flex-wrap gap-2">
          {proj.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-blue-900/10 text-blue-400/80 px-2.5 py-1 rounded-sm border border-blue-900/30">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </motion.div>
);

const ContactOutput = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="my-4 p-5 bg-gradient-to-br from-[#0f1115] to-[#0a0a0a] border border-gray-800 rounded-lg shadow-lg relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
    <h3 className="text-gray-300 font-bold mb-6 flex items-center gap-2 text-lg relative z-10">
      <span className="text-green-500 animate-pulse">●</span> Establish Connection
    </h3>
    <div className="space-y-4 font-mono text-sm relative z-10">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 group/item">
        <span className="text-gray-500 w-20">Email</span>
        <a href="mailto:vedantpatelvp04@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/10 px-3 py-2 rounded-md border border-blue-900/30 flex-1 flex items-center justify-between">
          vedantpatelvp04@gmail.com
          <span className="text-[10px] text-blue-500/50 group-hover/item:text-blue-400 opacity-0 group-hover/item:opacity-100 transition-opacity tracking-widest">SEND_PACKET</span>
        </a>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 group/item">
        <span className="text-gray-500 w-20">LinkedIn</span>
        <a href="https://linkedin.com/in/vedantpatel" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/10 px-3 py-2 rounded-md border border-blue-900/30 flex-1 flex items-center justify-between">
          /in/vedantpatel
          <span className="text-[10px] text-blue-500/50 group-hover/item:text-blue-400 opacity-0 group-hover/item:opacity-100 transition-opacity tracking-widest">ESTABLISH_HANDSHAKE</span>
        </a>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 group/item">
        <span className="text-gray-500 w-20">GitHub</span>
        <a href="https://github.com/Vedant-2-6" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/10 px-3 py-2 rounded-md border border-blue-900/30 flex-1 flex items-center justify-between">
          github.com/Vedant-2-6
          <span className="text-[10px] text-blue-500/50 group-hover/item:text-blue-400 opacity-0 group-hover/item:opacity-100 transition-opacity tracking-widest">CLONE_REPO</span>
        </a>
      </div>
    </div>
  </motion.div>
);

// Magnetic Button Component
const MagneticButton = ({ children, onClick }) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = btnRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={() => { playKeySound(); onClick(); }}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-left text-sm font-mono group"
    >
      {children}
    </motion.button>
  );
};

export default function Terminal({ setMatrix, setGlitching }) {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Kernel loaded. VedantOS v2.0 running.' },
    { type: 'system', content: 'Try "about", "skills", "experience", "projects", or "contact".' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: cmd }];
    
    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', component: <div className="text-gray-300 my-2 bg-gray-900/50 p-3 rounded-md border border-gray-800 font-sans text-sm">Available Modules: <span className="text-green-400 font-mono font-bold">about, skills, experience, projects, contact, clear</span></div> });
        break;
      case 'about':
        newHistory.push({ type: 'output', component: <AboutOutput /> });
        break;
      case 'skills':
        newHistory.push({ type: 'output', component: <SkillsOutput /> });
        break;
      case 'experience':
      case 'exp':
        newHistory.push({ type: 'output', component: <ExperienceOutput /> });
        break;
      case 'projects':
        newHistory.push({ type: 'output', component: <ProjectsOutput /> });
        break;
      case 'contact':
        newHistory.push({ type: 'output', component: <ContactOutput /> });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'matrix':
        setMatrix(prev => !prev);
        newHistory.push({ type: 'system', content: 'Toggling Matrix mode...' });
        break;
      case 'sudo rm -rf /':
        setGlitching(true);
        setTimeout(() => {
          setGlitching(false);
          setHistory([...history, { type: 'input', content: cmd }, { type: 'error', content: 'UNAUTHORIZED: eBPF guardrails have blocked this action.' }]);
        }, 3000);
        setInput('');
        return;
      case '':
        break;
      default:
        newHistory.push({ type: 'error', content: "bash: command not found: " + cmd });
    }
    
    setHistory(newHistory);
    setInput('');
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else {
      playKeySound();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-[90vh] md:h-[85vh] w-full max-w-7xl relative">
      
      {/* Draggable Sidebar */}
      <motion.div drag={!isMobile} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.1} className="w-full md:w-72 bg-[#050505]/60 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col p-4 flex-shrink-0 relative overflow-hidden z-20 md:cursor-move h-auto md:h-full max-h-[40vh] md:max-h-full">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        <div className="flex items-center gap-3 mb-4 md:mb-8 px-2 mt-2 relative z-10 pointer-events-none">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-800 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-green-400/30">
            <LayoutDashboard className="text-white drop-shadow-md" size={16} />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-wide text-sm md:text-base">Control Panel</h1>
            <p className="text-green-400 text-[10px] md:text-xs font-mono">vedant_admin</p>
          </div>
        </div>

        <div className="space-y-2 flex-grow relative z-10 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-800">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-2 pointer-events-none">Executable Scripts</p>
          {['about', 'skills', 'experience', 'projects', 'contact'].map(cmd => (
            <MagneticButton key={cmd} onClick={() => executeCommand(cmd)}>
              <Play size={12} className="text-gray-600 transition-colors" />
              ./{cmd}.sh
            </MagneticButton>
          ))}
        </div>

        {!isMobile && (
          <div className="relative z-10 pointer-events-none">
            <SystemStats />
          </div>
        )}
      </motion.div>

      {/* Draggable Main Terminal Window */}
      <motion.div drag={!isMobile} dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} dragElastic={0.1} className="flex-1 bg-[#09090b]/80 backdrop-blur-2xl rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative z-10 group md:cursor-move h-full min-h-[50vh]">
        
        {/* Subtle Hover Glow */}
        <div className="absolute inset-0 z-0 border-2 border-transparent group-hover:border-green-500/20 transition-colors duration-700 pointer-events-none rounded-xl"></div>

        {/* Terminal Header */}
        <div className="bg-[#050505]/80 px-4 py-3 flex items-center justify-between border-b border-white/5 backdrop-blur-md relative z-10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_#ef4444] cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_#eab308] cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_#22c55e] cursor-pointer"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium bg-black/50 px-4 py-1.5 rounded-full border border-white/5 shadow-inner">
            <TerminalIcon size={12} className="text-green-400" />
            vedant@devops-god:~
          </div>
          <div className="w-16"></div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto font-mono text-sm shadow-inner scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent relative z-10 cursor-text">
          <AnimatePresence initial={false}>
            {history.map((line, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }} 
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} 
                transition={{ duration: 0.3 }}
                key={i} 
                className="mb-2"
              >
                {line.type === 'input' && (
                  <div className="flex gap-2 mt-6 mb-2">
                    <span className="text-green-500 font-bold">root</span>
                    <span className="text-gray-500">@</span>
                    <span className="text-blue-400">devops-god</span>
                    <span className="text-gray-500">~</span>
                    <span className="text-white">{line.content}</span>
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="mt-2">
                    {line.component || <div className="text-gray-300">{line.content}</div>}
                  </div>
                )}
                {line.type === 'system' && (
                  <div className="text-gray-500 mb-2 italic"># {line.content}</div>
                )}
                {line.type === 'error' && (
                  <div className="text-red-400 mt-2 bg-red-900/10 border border-red-900/30 p-2 rounded inline-block">{line.content}</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div className="flex gap-2 mt-6 items-center">
            <span className="text-green-500 font-bold">root</span>
            <span className="text-gray-500">@</span>
            <span className="text-blue-400">devops-god</span>
            <span className="text-gray-500">~</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-white caret-transparent placeholder-gray-800 ml-1"
              placeholder="Type a command..."
              autoFocus
              spellCheck="false"
            />
          </div>
          <div ref={endRef} className="pb-8" />
        </div>
      </motion.div>

    </div>
  );
}
