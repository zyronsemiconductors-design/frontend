export type Course = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  overview: string;
  syllabus: string[];
  tools: string[];
  duration: string;
  level: string;
  mode: string;
  eligibility: string;
  certification: string;
};

export type CourseCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  courses: Course[];
};

const courses: Course[] = [
  {
    id: "dft-training",
    title: "DFT Training",
    slug: "dft-training",
    categoryId: "freshers",
    shortDescription: "Comprehensive DFT program covering scan, ATPG, JTAG, MBIST and compression.",
    overview:
      "An 8-month, industry-aligned Design for Testability program focused on scan, ATPG, JTAG/MBIST, and test compression with extensive hands-on practice.",
    syllabus: [
      "DFT fundamentals and testability flow overview",
      "Fault models: stuck-at, transition delay, path delay",
      "SoC scan architecture and scan design types",
      "ATPG DRC debug and simulation debug",
      "JTAG, MBIST, and LogicBIST techniques",
      "Test compression using TestKompress",
      "Hierarchical scan design and DFT diagnosis",
      "Hands-on: complex SoC with multiple memories, ATPG patterns, compressed pattern validation"
    ],
    tools: ["Synopsys TetraMax", "MentorGraphics Tessent"],
    duration: "8 months",
    level: "Beginner to Intermediate",
    mode: "Instructor-led",
    eligibility: "B.E/B.Tech/M.Tech/M.E/Diploma graduates and freshers",
    certification: "Course completion certificate"
  },
  {
    id: "physical-design-training",
    title: "Physical Design Training",
    slug: "physical-design-training",
    categoryId: "freshers",
    shortDescription: "End-to-end VLSI backend flow from netlist to GDSII with projects.",
    overview:
      "An 8-month backend program covering the complete physical design flow with tool-driven projects and 40+ assignments.",
    syllabus: [
      "Device fundamentals and IC fabrication",
      "Timing concepts and advanced digital design",
      "Linux OS and TCL scripting",
      "Netlist to GDSII flow: floorplanning, placement, power planning",
      "Scan chain reordering, global routing",
      "CTS, final routing, timing closure",
      "Power analysis and ECO",
      "Physical verification using industry tools",
      "Hands-on: block and full-chip projects"
    ],
    tools: ["Synopsys DC", "ICC II", "StarRC", "PrimeTime", "ICV", "Cadence Innovus"],
    duration: "8 months",
    level: "Beginner to Intermediate",
    mode: "Instructor-led",
    eligibility: "B.E/B.Tech/M.Tech/M.E/Diploma graduates and freshers",
    certification: "Course completion certificate"
  },
  {
    id: "physical-verification",
    title: "Physical Verification",
    slug: "physical-verification",
    categoryId: "freshers",
    shortDescription: "Hands-on PV training in DRC/LVS/ERC/DFM with 20+ labs.",
    overview:
      "A 4-month Physical Verification program focused on DRC/LVS/ERC/DFM checks, reliability analysis, and extensive lab work.",
    syllabus: [
      "PV fundamentals: DRC, LVS, ERC, antenna, latch-up",
      "EM/IR analysis and DFM checks",
      "ESD path checks and reliability concepts",
      "ASIC flow overview and layout basics",
      "CMOS/FinFET fundamentals and fabrication basics",
      "Hands-on labs and assignments (20+)"
    ],
    tools: ["IC Validator", "Mentor Calibre"],
    duration: "4 months",
    level: "Beginner to Intermediate",
    mode: "Instructor-led",
    eligibility: "B.E/B.Tech/M.Tech/M.E/Diploma and working professionals",
    certification: "Course completion certificate"
  },
  {
    id: "rtl-design-integration",
    title: "RTL Design & Integration",
    slug: "rtl-design-integration",
    categoryId: "freshers",
    shortDescription: "RTL integration with linting, CDC, UPF, synthesis, and STA.",
    overview:
      "A 6-month course for freshers focusing on RTL integration, linting, CDC, low-power design, synthesis, and timing closure with tool exposure.",
    syllabus: [
      "RTL design fundamentals and coding guidelines",
      "SoC integration basics and glue logic development",
      "Linting: rules, violations, and waivers",
      "CDC concepts and synchronizers with SpyGlass",
      "Low power design and UPF",
      "Synthesis, LEC, and STA fundamentals"
    ],
    tools: ["Synopsys SpyGlass", "Design Compiler", "PrimeTime"],
    duration: "6 months",
    level: "Beginner to Intermediate",
    mode: "Instructor-led",
    eligibility: "B.E/B.Tech/M.Tech/M.E/Diploma graduates and freshers",
    certification: "Course completion certificate"
  },
  {
    id: "vlsi-design-verification",
    title: "VLSI Design & Verification",
    slug: "vlsi-design-verification",
    categoryId: "freshers",
    shortDescription: "Front-end VLSI, Verilog/SV/UVM with projects and assignments.",
    overview:
      "An 8-month front-end VLSI program covering digital design, Verilog, SystemVerilog, UVM, AXI, and hands-on verification projects.",
    syllabus: [
      "ASIC flow and SoC verification concepts",
      "Advanced digital design fundamentals",
      "Verilog for RTL and testbench development",
      "SystemVerilog language and UVM methodology",
      "AXI protocol and testbench development",
      "Ethernet MAC verification project",
      "Linux, scripting, and soft skills"
    ],
    tools: ["Mentor Graphics", "Questasim", "Synopsys VCS"],
    duration: "8 months",
    level: "Beginner to Intermediate",
    mode: "Instructor-led",
    eligibility: "B.E/B.Tech/M.Tech/M.E graduates and freshers",
    certification: "Course completion certificate"
  },
  {
    id: "mtech-internship",
    title: "M.Tech Project & Internship",
    slug: "mtech-project-internship",
    categoryId: "internships",
    shortDescription: "10-month project program with phased training and industry projects.",
    overview:
      "A 10-month M.Tech project and internship program with phased training, placement support, and industry-aligned projects.",
    syllabus: [
      "Phase 1: Advanced digital design, GVIM, Verilog, Linux basics",
      "Phase 2: SystemVerilog, UVM, AXI TB, Python, ASIC/SoC concepts",
      "Phase 3: M.Tech project or internship project",
      "Projects on IEEE standards and industry protocols"
    ],
    tools: ["Modelsim", "Python", "ASIC/SoC toolflows"],
    duration: "10 months",
    level: "Intermediate",
    mode: "Instructor-led",
    eligibility: "M.Tech students",
    certification: "Project completion certificate"
  },
  {
    id: "vlsi-short-term-internship",
    title: "VLSI Short-Term Internship",
    slug: "vlsi-short-term-internship",
    categoryId: "internships",
    shortDescription: "6-week internship covering Verilog or PD with hands-on projects.",
    overview:
      "A 6-week internship for 3rd-year B.Tech/BE students focused on Verilog or physical design with practical exposure.",
    syllabus: [
      "Verilog deep dive and hands-on projects",
      "Digital design fundamentals and practice",
      "Physical design basics and PnR flow exposure"
    ],
    tools: ["Modelsim", "PnR tools (exposure)"],
    duration: "6 weeks",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "B.Tech/BE 3rd-year students",
    certification: "Internship completion certificate"
  },
  {
    id: "advanced-digital-design",
    title: "Advanced Digital Design",
    slug: "advanced-digital-design",
    categoryId: "short-term",
    shortDescription: "3-week intensive on combinational and sequential logic.",
    overview:
      "A 3-week short-term course with 300+ problems covering combinational and sequential digital design.",
    syllabus: [
      "Combinational logic, K-maps, logic minimization",
      "Adders, subtractors, mux/demux, encoders/decoders",
      "Sequential logic, FSMs, counters, shift registers",
      "Timing concepts and STA basics"
    ],
    tools: ["Digital design simulators"],
    duration: "3 weeks",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "system-verilog-short-term",
    title: "System Verilog (Short Term)",
    slug: "system-verilog-short-term",
    categoryId: "short-term",
    shortDescription: "9-week SV course with labs and assignments.",
    overview:
      "A 9-week SystemVerilog training with 200+ examples and lab assignments focused on verification.",
    syllabus: [
      "SV constructs, OOP, arrays, interfaces, constraints",
      "Randomization, coverage, assertions, DPI",
      "Testbench architecture and best practices",
      "Assignments and lab sessions"
    ],
    tools: ["Questasim", "SV toolchain"],
    duration: "9 weeks",
    level: "Beginner to Intermediate",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "system-verilog-constraints",
    title: "System Verilog Constraints",
    slug: "system-verilog-constraints",
    categoryId: "short-term",
    shortDescription: "30-hour course on constraints, coverage, and assertions.",
    overview:
      "A 30-hour focused course on constraints, randomization, coverage, and assertions with hands-on examples.",
    syllabus: [
      "Constraints types, inline constraints, randomization",
      "Functional and code coverage",
      "Assertion-based verification"
    ],
    tools: ["Questasim", "SV toolchain"],
    duration: "30 hours",
    level: "Intermediate",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "uvm-basic",
    title: "UVM Basic Course",
    slug: "uvm-basic-course",
    categoryId: "short-term",
    shortDescription: "5-week UVM course with APB UVC and FIFO projects.",
    overview:
      "A 5-week UVM course covering methodology, TB architecture, sequences, and practical projects.",
    syllabus: [
      "UVM fundamentals and class library",
      "UVM TB architecture and phases",
      "Sequences, sequencers, and virtual sequences",
      "Projects: APB UVC and asynchronous FIFO verification"
    ],
    tools: ["UVM", "Questasim"],
    duration: "5 weeks",
    level: "Intermediate",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "verilog-short-term",
    title: "Verilog (Short Term)",
    slug: "verilog-short-term",
    categoryId: "short-term",
    shortDescription: "10-week Verilog course for RTL and TB development.",
    overview:
      "A 10-week Verilog course emphasizing RTL coding and testbench development with multiple projects.",
    syllabus: [
      "Verilog language basics and constructs",
      "Combinational and sequential logic coding",
      "FSMs, memories, and FIFO design",
      "Testbench development and debugging"
    ],
    tools: ["Modelsim", "Verilog toolchain"],
    duration: "10 weeks",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "amba-protocol",
    title: "AMBA (AXI, AHB, APB)",
    slug: "amba-protocol-training",
    categoryId: "protocols",
    shortDescription: "Protocol fundamentals, timing diagrams, and TB development.",
    overview:
      "AMBA protocol training covering AXI, AHB, and APB concepts, timing analysis, and testbench fundamentals.",
    syllabus: [
      "AMBA overview and protocol basics",
      "AXI/AHB/APB features and transactions",
      "Timing diagrams and handshake mechanisms",
      "Protocol testbench development concepts"
    ],
    tools: ["Protocol simulators", "Verification toolchain"],
    duration: "Custom",
    level: "Beginner to Intermediate",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "python-training",
    title: "Python",
    slug: "python-training",
    categoryId: "scripting",
    shortDescription: "Python scripting for automation and VLSI workflows.",
    overview:
      "Python training covering core language concepts, data handling, regex, and scripting for automation.",
    syllabus: [
      "Python basics, data types, and operators",
      "Lists, tuples, dictionaries, and file handling",
      "Regex and text processing",
      "Scripting for automation"
    ],
    tools: ["Python"],
    duration: "Custom",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "perl-training",
    title: "Perl",
    slug: "perl-training",
    categoryId: "scripting",
    shortDescription: "Perl programming for automation and VLSI scripting tasks.",
    overview:
      "Perl training covering scripting fundamentals, regex, file handling, and automation use cases.",
    syllabus: [
      "Perl basics and scripting fundamentals",
      "Regex and text processing",
      "File handling and modules",
      "Automation workflows"
    ],
    tools: ["Perl"],
    duration: "Custom",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "linux-commands",
    title: "Linux Commands",
    slug: "linux-commands",
    categoryId: "scripting",
    shortDescription: "Linux command-line skills for engineering workflows.",
    overview:
      "Linux commands training for file management, shell usage, version control, and productivity.",
    syllabus: [
      "Linux/UNIX basics and shell usage",
      "File, directory, and permission management",
      "Text processing, pipes, and filters",
      "Version control basics"
    ],
    tools: ["Linux"],
    duration: "Custom",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "shell-script",
    title: "Shell Script",
    slug: "shell-script",
    categoryId: "scripting",
    shortDescription: "Shell scripting with control flow, functions, and projects.",
    overview:
      "Shell scripting training with practical labs, control structures, and automation tasks.",
    syllabus: [
      "Shell scripting fundamentals",
      "Control flow, loops, and functions",
      "I/O redirection and pipelines",
      "Projects and assessments"
    ],
    tools: ["Shell"],
    duration: "Custom",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  },
  {
    id: "gvim-training",
    title: "GVIM",
    slug: "gvim-training",
    categoryId: "scripting",
    shortDescription: "GVIM shortcuts and editor workflows for developers.",
    overview:
      "GVIM training with shortcuts, navigation, search/replace, and productivity features.",
    syllabus: [
      "GVIM modes and navigation",
      "Editing, search/replace, macros",
      "File management and splits",
      "Productivity shortcuts"
    ],
    tools: ["GVIM"],
    duration: "Custom",
    level: "Beginner",
    mode: "Instructor-led",
    eligibility: "Students and professionals",
    certification: "Course completion certificate"
  }
];

const categories: CourseCategory[] = [
  {
    id: "freshers",
    title: "Freshers Programs",
    subtitle: "Beginner-friendly VLSI training programs",
    description: "Comprehensive long-term programs for fresh graduates starting a VLSI career.",
    path: "/courses/freshers",
    courses: courses.filter((c) => c.categoryId === "freshers")
  },
  {
    id: "internships",
    title: "B.Tech / M.Tech Internships",
    subtitle: "Industry-aligned internships and project programs",
    description: "Project internships and real-world experience for B.Tech and M.Tech students.",
    path: "/courses/internships",
    courses: courses.filter((c) => c.categoryId === "internships")
  },
  {
    id: "short-term",
    title: "Short-Term Courses",
    subtitle: "Focused programs for quick upskilling",
    description: "Short-duration programs with intensive coverage and practical focus.",
    path: "/courses/short-term",
    courses: courses.filter((c) => c.categoryId === "short-term")
  },
  {
    id: "protocols",
    title: "Protocols Training",
    subtitle: "Learn industry standard protocols",
    description: "Protocol training for AXI/AHB/APB with timing and testbench concepts.",
    path: "/courses/protocols",
    courses: courses.filter((c) => c.categoryId === "protocols")
  },
  {
    id: "scripting",
    title: "Scripting Languages",
    subtitle: "Automation and scripting for engineers",
    description: "Practical scripting courses for productivity and automation.",
    path: "/courses/scripting",
    courses: courses.filter((c) => c.categoryId === "scripting")
  }
];

export const getCourseCategories = () => categories;
export const getCategoryById = (id: string) => categories.find((c) => c.id === id);
export const getCourseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
export const getCoursesByCategory = (id: string) => courses.filter((c) => c.categoryId === id);

