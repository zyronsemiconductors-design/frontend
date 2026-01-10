/* ================================
   Global English Content File
   ================================ */

import { CalendarCheck, Code2, Cpu, Layers, TestTube2, Wrench } from "lucide-react";
import { FooterData } from "../types";

export const Eng = {
    /* ---------- Headers ---------- */
    headers: {
        home: [
            {
                id: '1',
                title: "Engineering the Silicon That Powers Tomorrow",
                subtitle: "Semiconductor & VLSI Excellence",
                description: "Zyron Semiconductors delivers end-to-end semiconductor services including ASIC design, verification, and VLSI solutions to help you build high-performance, future-ready products.",
                ctaText: "Explore Services",
                imageUrl: "https://images.unsplash.com/photo-1651340741844-48edcd3fe79c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
                id: '2',
                title: "From Concept to Silicon",
                subtitle: "Trusted Engineering Partner",
                description: "We partner with global innovators to deliver reliable FPGA, backend, and verification services that accelerate time-to-market and reduce design risk.",
                ctaText: "How We Work",
                imageUrl: "https://images.unsplash.com/photo-1672307613484-3254a04651fd?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
                id: '3',
                title: "Scalable Solutions for a Digital World",
                subtitle: "Innovation Meets Reliability",
                description: "From embedded systems and firmware to software and product engineering, Zyron builds scalable solutions that power next-generation technologies.",
                ctaText: "Start a Project",
                imageUrl: "https://images.unsplash.com/photo-1640955785023-1854685dae05?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }
        ],
        about: {
            title: "About",
            highlight: "ZYRON",
            subtitle:
                "Zyron Semiconductors is a technology and engineering services company delivering semiconductor, embedded, and digital solutions with a strong focus on engineering excellence, innovation, and long-term partnerships.",
            bgImage:
                "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1169&auto=format&fit=crop",
        },
        services: {
            title: "Our",
            highlight: "Services",
            subtitle:
                "We provide end-to-end engineering services including ASIC design, FPGA, embedded systems, software, and product engineering to help you build scalable and future-ready solutions.",
            bgImage:
                "https://images.unsplash.com/photo-1717386255773-1e3037c81788?q=80&w=1170&auto=format&fit=crop",
        },
        why: {
            title: "Why Partner with",
            highlight: "Zyron?",
            subtitle:
                "With deep domain expertise, a client-first mindset, and proven delivery models, Zyron ensures high-quality engineering outcomes that drive innovation and business success.",
            bgImage:
                "https://plus.unsplash.com/premium_photo-1682144748274-add3d8ed04ea?q=80&w=2034&auto=format&fit=crop",
        },
        careers: {
            title: "Build Your",
            highlight: "Career With Us",
            subtitle:
                "Join Zyron and work alongside passionate engineers, solving real-world challenges and shaping the future of semiconductor and digital technologies.",
            bgImage:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920&auto=format&fit=crop",
        },
        contact: {
            title: "Let’s",
            highlight: "Talk",
            subtitle:
                "Have a design challenge or product idea? Connect with Zyron Semiconductors and let’s engineer innovative solutions together.",
            bgImage:
                "https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=1170&auto=format&fit=crop",
        },
    },


    /* ---------- Home content ---------- */
    home: {
        about: {
            title: "About Us",
            subtitle: "Who We Are",
            paragraphs: [
                "Zyron Semiconductors is a technology and engineering services company powered by a team of passionate engineers delivering high-quality semiconductor, embedded, and digital solutions for global clients.",
                "We specialize in end-to-end ASIC design, verification services, FPGA prototyping, and backend implementation, helping organizations transform ideas into reliable, production-ready silicon.",
                "Driven by engineering excellence, collaboration, and innovation, we work as a true partner to our clients, enabling scalable and future-ready products across industries."
            ],
            skills: [
                { name: "Semiconductor Design", value: 100 },
                { name: "Verification Services", value: 100 },
                { name: "FPGA / Emulation", value: 100 },
                { name: "Backend & Physical Design", value: 100 }
            ]
        },
        features: {
            title: "OUR FEATURES",
            subtitle:
                "Explore the strengths that make Zyron a trusted engineering partner for complex and mission-critical projects.",
            list: [
                {
                    id: "planning",
                    title: "Strategy & Planning",
                    description:
                        "Clear technical roadmaps and execution plans aligned with your product goals and timelines.",
                    icon: CalendarCheck,
                },
                {
                    id: "reliability",
                    title: "Engineering Reliability",
                    description:
                        "Proven methodologies and rigorous reviews that ensure robust, high-quality design delivery.",
                    icon: Cpu,
                },
                {
                    id: "understanding",
                    title: "Domain Expertise",
                    description:
                        "Deep understanding of ASIC, SoC, FPGA, and embedded systems across full development lifecycles.",
                    icon: Layers,
                },
                {
                    id: "reusability",
                    title: "Accelerated Delivery",
                    description:
                        "Reusable frameworks and best practices that reduce development cycles and engineering cost.",
                    icon: Code2,
                },
                {
                    id: "scalability",
                    title: "Scalable Solutions",
                    description:
                        "Architectures and teams designed to grow with your product roadmap and business needs.",
                    icon: TestTube2,
                },
                {
                    id: "tracking",
                    title: "Transparent Execution",
                    description:
                        "Clear milestones, progress visibility, and continuous communication throughout engagement.",
                    icon: Wrench,
                },
            ],
        },
        services: {
            title: "OUR SERVICES",
            subtitle:
                "End-to-end engineering services that help you design, build, and scale future-ready semiconductor and digital products.",
            list: [
                {
                    id: "design",
                    title: "Semiconductor Engineering",
                    subtitle: "ASIC, SoC & VLSI",
                    description:
                        "Complete semiconductor services including architecture, RTL design, synthesis, and physical implementation to deliver high-performance and low-power silicon solutions.",
                    image:
                        "https://images.unsplash.com/photo-1666037801539-f30fd661657a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0",
                },
                {
                    id: "verification",
                    title: "Verification Services",
                    subtitle: "UVM & Validation",
                    description:
                        "Comprehensive functional and formal verification using UVM methodologies to ensure first-time-right silicon and faster time-to-market.",
                    image:
                        "https://images.unsplash.com/photo-1568209865332-a15790aed756?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
                },
                {
                    id: "fpga",
                    title: "FPGA & Emulation",
                    subtitle: "Prototyping & Debug",
                    description:
                        "FPGA prototyping and emulation services for early validation, hardware-software co-verification, and risk reduction before tapeout.",
                    image:
                        "https://images.unsplash.com/photo-1597862624146-142dbb8acfab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                    id: "embedded",
                    title: "Embedded Systems",
                    subtitle: "Firmware & Drivers",
                    description:
                        "Embedded firmware, BSP, and driver development enabling reliable and optimized integration of hardware and software platforms.",
                    image:
                        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
                },
                {
                    id: "software",
                    title: "Software Engineering",
                    subtitle: "Digital Platforms",
                    description:
                        "Scalable application and backend development to build secure, connected, and cloud-ready digital solutions around your products.",
                    image:
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
                },
                {
                    id: "product",
                    title: "Product Engineering",
                    subtitle: "Lifecycle Support",
                    description:
                        "End-to-end product engineering from concept and system design to deployment, sustenance, and continuous improvement.",
                    image:
                        "https://plus.unsplash.com/premium_photo-1661324440598-19f88a78e6b1?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                    id: "staff",
                    title: "Staff Augmentation",
                    subtitle: "Expert Engineers",
                    description:
                        "Flexible staffing models providing skilled semiconductor, embedded, and software engineers to extend your teams and accelerate delivery.",
                    image:
                        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
                },
                {
                    id: "training",
                    title: "Training & Upskilling",
                    subtitle: "VLSI & Embedded",
                    description:
                        "Industry-focused training programs in VLSI, RTL, UVM, physical design, and embedded systems to build future-ready engineering talent.",
                    image:
                        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
                },
            ],
        },

    },

    /* ---------- Common ---------- */
    Common: {
        contactInfo: {
            title: "Get in Touch",
            formTitle: "Let’s Start a Conversation",
            address: {
                label: "Head Office",
                value:
                    "18-8-40D/305, Madhura Nagar, Revenue Ward No: 8, Tirupati (U), Tirupati Dist.",
            },
            emails: {
                label: "Email Us",
                general: "zyronsemiconductors@gmail.com",
                hr: "HR@zyronsemi.com",
            },
            phone: {
                label: "Call Us",
                number: "+91 8123561362",
                hours: "Monday to Friday, 9:00 AM – 6:00 PM IST",
            },
            website: {
                label: "Website",
                url: "https://www.zyronsemiconductors.com",
                text: "www.zyronsemiconductors.com",
            },
        },
        footer: {
            brand: {
                name: "ZYRON.",
                description:
                    "Zyron Semiconductors is a trusted engineering services company delivering semiconductor services, VLSI solutions, embedded systems, and product engineering for a connected and intelligent world.",
                socials: [
                    { icon: "facebook", url: "https://www.facebook.com/profile.php?id=61585946035332" },
                    { icon: "instagram", url: "https://www.instagram.com/zyronsemiconductors" },
                    { icon: "linkedin", url: "https://www.linkedin.com/company/zyronsemiconductors" },
                    { icon: "twitter", url: "https://x.com/ZyronSemi" },
                ],
            },
            company: [
                { label: "About Zyron", to: "/about" },
                { label: "Why Zyron", to: "/why-zyron" },
                { label: "Careers", to: "/careers" },
                { label: "Contact Us", to: "/contact" },
            ],
            services: [
                { label: "Semiconductor Engineering", to: "/services#design" },
                { label: "Verification Services", to: "/services#verification" },
                { label: "FPGA & Emulation", to: "/services#fpga" },
                { label: "Embedded & Firmware", to: "/services#embedded" },
                { label: "Software Engineering", to: "/services#software" },
                { label: "Product Engineering", to: "/services#product" },
            ],
            contact: {
                address:
                    "Zyron Semiconductors, Tirupati, Andhra Pradesh, India",
                email: "contact@zyronsemi.com",
                phone: "+91 8123561362",
            },
            bottom: {
                copyright:
                    "© " + new Date().getFullYear() + " Zyron Semiconductors Pvt. Ltd. All rights reserved.",
                links: [
                    { label: "Privacy Policy", to: "/privacy" },
                    { label: "Terms of Service", to: "/terms" },
                ],
            },
        } as FooterData,
    },


    /* ---------- Careers ---------- */
    Careers: {
        jobs: [
            {
                id: "rtl",
                title: "Senior RTL Design Engineer",
                dept: "Semiconductor Engineering",
                location: "Bangalore, India",
                type: "Full-time",
            },
            {
                id: "pd",
                title: "Physical Design Lead",
                dept: "Backend & Implementation",
                location: "Bangalore, India",
                type: "Full-time",
            },
            {
                id: "dv",
                title: "Design Verification Engineer (UVM)",
                dept: "Verification Services",
                location: "Remote / Hybrid",
                type: "Full-time / Contract",
            },
            {
                id: "fw",
                title: "Embedded Firmware Engineer",
                dept: "Embedded Systems",
                location: "Bangalore, India",
                type: "Full-time",
            },
            {
                id: "sw",
                title: "Software Engineer",
                dept: "Digital Engineering",
                location: "Remote / Hybrid",
                type: "Full-time",
            },
            {
                id: "fpga",
                title: "FPGA / Emulation Engineer",
                dept: "Prototyping & Validation",
                location: "Bangalore, India",
                type: "Full-time",
            },
        ],
        culture: {
            title: "Life at",
            highlight: "Zyron",
            description:
                "At Zyron Semiconductors, our people are at the heart of everything we do. We nurture a culture built on engineering excellence, mutual respect, and continuous growth.",
            image:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop",
            points: [
                {
                    title: "Engineering Excellence",
                    desc: "Work on challenging projects in semiconductor, embedded, and software domains that push your technical boundaries.",
                },
                {
                    title: "Collaborative Culture",
                    desc: "Be part of open, supportive teams where ideas are valued and success is shared.",
                },
                {
                    title: "Learning & Growth",
                    desc: "Access continuous learning, mentorship, and training programs to advance your career.",
                },
                {
                    title: "Ownership & Impact",
                    desc: "Take ownership of your work and see the real-world impact of your engineering contributions.",
                },
                {
                    title: "Work-Life Balance",
                    desc: "We promote flexible work environments that respect personal well-being and productivity.",
                },
            ],
        },

        intro: {
            title: "Why Build Your Career with Zyron?",
            description:
                "At Zyron, you’ll collaborate with industry experts, work on cutting-edge technologies, and grow in an environment that values innovation, integrity, and teamwork. We empower engineers to shape the future of technology.",
        },
        cta: {
            title: "Didn’t find the right role?",
            subtitle:
                "Share your profile with us, and our HR team will reach out when an opportunity aligns with your skills and aspirations.",
            emailPlaceholder: "Your email address",
            namePlaceholder: "Your full name",
            messagePlaceholder: "Tell us about your experience, skills, or career interests...",
            buttonText: "Send to Zyron HR",
            successMessage: "Thank you! Our HR team will contact you soon.",
            errorMessage: "Something went wrong. Please try again later.",
        },
    },

    /* ---------- Services ---------- */
    services: [
        {
            id: "design",
            title: "Semiconductor Design Services",
            content: [
                "Zyron delivers end-to-end ASIC and SoC design services, covering architecture definition, micro-architecture, and RTL development.",
                "Our engineers apply proven design methodologies to build scalable, high-performance, and low-power silicon solutions.",
                "We work closely with clients to translate system requirements into robust, production-ready designs."
            ],
        },
        {
            id: "verification",
            title: "Verification Services",
            content: [
                "We provide comprehensive functional verification services using industry-standard UVM and coverage-driven methodologies.",
                "Our approach ensures early bug detection, higher coverage, and improved design confidence across all stages.",
                "This helps reduce silicon re-spins and accelerates your path to first-time-right tapeout."
            ],
        },
        {
            id: "fpga",
            title: "FPGA & Emulation Services",
            content: [
                "Zyron offers FPGA prototyping and emulation solutions for early validation of complex SoC designs.",
                "Our teams enable faster bring-up, real-world testing, and efficient hardware-software co-verification.",
                "By validating designs before tapeout, we significantly reduce risk and improve time-to-market."
            ],
        },
        {
            id: "backend",
            title: "Physical Design & Backend Services",
            content: [
                "Our backend services cover the complete physical implementation flow from netlist to GDSII.",
                "We focus on timing closure, power integrity, and layout optimization to meet aggressive PPA targets.",
                "With experience across advanced process nodes, we ensure manufacturable and reliable silicon."
            ],
        },
        {
            id: "embedded",
            title: "Embedded Systems",
            content: [
                "Zyron specializes in end-to-end embedded systems development, from hardware-near firmware to high-level application software.",
                "We provide Board Support Packages (BSP), device drivers, and real-time operating system (RTOS) integration for diverse architectures.",
                "Our focus on performance, reliability, and security ensures your embedded products are high-performing and market-ready."
            ],
        },
        {
            id: "software",
            title: "Software Engineering",
            content: [
                "We build scalable, secure, and modern digital platforms that complement your hardware and semiconductor products.",
                "Our expertise includes cloud-native backend development, interactive web applications, and desktop software for engineering tools.",
                "Using modern tech stacks, we deliver high-performance software solutions tailored to your specific industrial or consumer needs."
            ],
        },
        {
            id: "product",
            title: "Product Engineering",
            content: [
                "Zyron provides full-lifecycle product engineering services to transform complex ideas into reliable market-ready products.",
                "We manage everything from conceptual design and prototyping to testing, certification support, and manufacturing oversight.",
                "Our multi-disciplinary team ensures seamless integration of hardware, software, and industrial design for exceptional user experiences."
            ],
        },
        {
            id: "signoff",
            title: "Design Signoff Services",
            content: [
                "Zyron’s design signoff services ensure your chip is fully validated and ready for tapeout with maximum confidence.",
                "We perform thorough checks including static timing, power analysis, signal integrity, and physical verification.",
                "Using industry-leading signoff tools and best practices, we minimize risk and enable first-time-right silicon.",
                "Our focus on quality and accuracy helps you move seamlessly from design completion to fabrication."
            ],
        },
        {
            id: "synthesis-sta",
            title: "Synthesis & Static Timing Analysis",
            content: [
                "We provide RTL-to-gate synthesis services to achieve optimal performance, power, and area targets.",
                "Our constraint-driven flows ensure high-quality netlists aligned with downstream physical design needs.",
                "Through detailed static timing analysis, we identify and resolve setup, hold, and clock-related issues across all corners.",
                "This enables early timing closure and builds a strong foundation for successful implementation."
            ],
        },
        {
            id: "staff",
            title: "Staff Augmentation",
            content: [
                "Zyron offers skilled semiconductor, embedded, and software engineers to extend your in-house teams.",
                "Our flexible engagement models help you quickly scale resources based on project needs.",
                "Engineers integrate seamlessly with your processes, tools, and teams to deliver immediate value."
            ],
        },
        {
            id: "training",
            title: "Training & Upskilling Services",
            content: [
                "We deliver structured training programs to help engineers build strong foundations in VLSI and semiconductor technologies.",
                "Our courses cover RTL design, UVM verification, physical design, and hands-on project-based learning.",
                "Customized programs are available for corporate teams, fresh graduates, and academic institutions."
            ],
        },
    ],


    /* ---------- community ---------- */
    community: {
        header: {
            title: "Zyron Community",
            highlight: "Connect & Innovate",
            subtitle:
                "A vibrant space for engineers, learners, and innovators to collaborate and grow in the world of semiconductor and digital engineering.",
            bgImage:
                "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },

        intro: {
            title: "Welcome to the Zyron Community",
            description:
                "The Zyron Community brings together students, professionals, and technology enthusiasts to exchange ideas, learn from experts, and collaborate on real-world engineering challenges across semiconductors, embedded systems, and software.",
        },

        pillars: [
            {
                id: "collaboration",
                title: "Collaboration",
                desc: "Engage with peers and mentors to work on ideas, projects, and practical engineering problems.",
            },
            {
                id: "learning",
                title: "Learning & Growth",
                desc: "Stay updated with expert-led sessions, knowledge sharing, and continuous skill development.",
            },
            {
                id: "innovation",
                title: "Innovation",
                desc: "Explore new trends in ASIC design, FPGA, AI hardware, embedded systems, and digital platforms.",
            },
            {
                id: "networking",
                title: "Networking",
                desc: "Connect with industry professionals, researchers, and future leaders in technology.",
            },
        ],


        activities: {
            title: "What We Do",
            description: "Community-driven activities designed to inspire learning, collaboration, and innovation.",
            activity: [
                {
                    title: "Expert Webinars",
                    desc: "Regular sessions on semiconductor services, VLSI solutions, verification, and product engineering.",
                },
                {
                    title: "Hands-on Workshops",
                    desc: "Practical workshops and bootcamps covering RTL design, embedded firmware, and FPGA prototyping.",
                },
                {
                    title: "Knowledge Forums",
                    desc: "Open discussions to ask questions, share experiences, and learn from fellow community members.",
                },
                {
                    title: "Innovation Challenges",
                    desc: "Collaborative challenges and hackathons focused on solving real-world engineering problems.",
                },
            ]
        },
        join: {
            title: "Join the Zyron Community",
            subtitle:
                "Whether you’re a student, professional, or technology enthusiast, become part of a growing network shaping the future of engineering.",
            button: "Join Now",
        },
    },

    /* ---------- resources ---------- */

    resources: {
        header: {
            title: "Resources",
            highlight: "Knowledge Center",
            subtitle:
                "Explore expert insights, technical guides, and learning materials to advance your semiconductor and engineering expertise.",
            bgImage:
                "https://images.unsplash.com/photo-1598618589821-f031d29a366f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },

        intro: {
            title: "Learn. Build. Lead.",
            description:
                "Zyron’s resource hub is curated by experienced engineers to help professionals and learners stay ahead in semiconductor services, VLSI solutions, embedded systems, and product engineering.",
        },

        categories: [
            {
                id: "design",
                title: "Design & Architecture",
                desc: "Best practices for SoC architecture, RTL development, and scalable design methodologies.",
            },
            {
                id: "verification",
                title: "Verification & Validation",
                desc: "Insights into functional verification, UVM frameworks, and coverage-driven approaches.",
            },
            {
                id: "fpga",
                title: "FPGA & Emulation",
                desc: "Resources for FPGA bring-up, prototyping flows, and hardware-software co-verification.",
            },
            {
                id: "backend",
                title: "Physical Design & Signoff",
                desc: "Guides on timing closure, power integrity, and physical verification techniques.",
            },
        ],

        items: [
            {
                id: "rtl-guide",
                title: "Writing High-Quality RTL",
                type: "Guide",
                category: "Design",
                desc: "Practical tips for building clean, synthesizable, and reusable RTL for complex SoCs.",
            },
            {
                id: "uvm-basics",
                title: "Getting Started with UVM",
                type: "Tutorial",
                category: "Verification",
                desc: "A beginner-friendly introduction to UVM and building scalable verification environments.",
            },
            {
                id: "fpga-flow",
                title: "FPGA Prototyping Essentials",
                type: "Article",
                category: "FPGA",
                desc: "An overview of FPGA flows for early design validation and rapid bring-up.",
            },
            {
                id: "pd-closure",
                title: "Achieving Timing Closure",
                type: "Whitepaper",
                category: "Backend",
                desc: "Proven strategies to meet timing, power, and area goals in advanced process nodes.",
            },
            {
                id: "low-power",
                title: "Designing for Low Power",
                type: "Guide",
                category: "Design",
                desc: "Methods to minimize dynamic and leakage power in modern semiconductor designs.",
            },
            {
                id: "formal",
                title: "Formal Verification Explained",
                type: "Article",
                category: "Verification",
                desc: "How formal techniques enhance simulation and improve overall design confidence.",
            },
        ],

        cta: {
            title: "Need expert guidance?",
            subtitle:
                "Connect with Zyron’s engineering team for personalized support or access to in-depth technical resources.",
            button: "Talk to Our Experts",
        },
    },


    /* ---------- Why Zyron Features ---------- */
    whyFeatures: [
        {
            id: "strategy",
            title: "Strategy & Planning",
            content: [
                "Every engagement begins with a clear technical and delivery roadmap aligned to your product vision and business goals.",
                "Our planning approach helps define the right architecture, anticipate risks, and ensure predictable execution."
            ],
        },
        {
            id: "reliability",
            title: "Engineering Reliability",
            content: [
                "We follow proven engineering processes to deliver robust, high-quality designs you can depend on.",
                "Strong reviews and best practices help minimize defects, re-spins, and project uncertainties."
            ],
        },
        {
            id: "understanding",
            title: "Deep Domain Expertise",
            content: [
                "Our teams bring hands-on experience across ASIC, SoC, FPGA, embedded systems, and software domains.",
                "We understand system-level challenges and translate them into effective engineering solutions."
            ],
        },
        {
            id: "reusability",
            title: "Accelerated Delivery",
            content: [
                "Reusable frameworks, IP blocks, and best practices help speed up development cycles.",
                "This approach reduces engineering effort, cost, and time-to-market without compromising quality."
            ],
        },
        {
            id: "scalability",
            title: "Scalable Engagements",
            content: [
                "Our solutions and team models are designed to scale with your evolving product roadmap.",
                "From early-stage innovation to large programs, we grow alongside your business needs."
            ],
        },
        {
            id: "tracking",
            title: "Transparent Execution",
            content: [
                "We ensure clear project visibility through defined milestones, metrics, and regular communication.",
                "This transparency builds trust and keeps all stakeholders aligned throughout delivery."
            ],
        },
    ],

    /* ---------- Contact Info ---------- */
    contact: {
        address:
            "18-8-40D/305, Madhura Nagar, Revenue Ward No: 8, Tirupati (U), Tirupati Dist.",
        emails: ["zyronsemiconductors@gmail.com", "HR@zyronsemi.com"],
        phone: "+91 8123561362",
        website: "https://www.zyronsemiconductors.com",
        hours: "Mon–Fri, 9am – 6pm IST",
    },

    /* ---------- Navigation ---------- */
    nav: {
        main: [
            { label: "About Us", to: "/about" },
            { label: "Careers", to: "/careers" },
            { label: "Community", to: "/community" },
            { label: "Resources", to: "/resources" },
            { label: "Contact Us", to: "/contact" },
        ],
        services: [
            { label: "Semiconductor Design", to: "/services#design" },
            { label: "Verification Services", to: "/services#verification" },
            { label: "FPGA & Emulation", to: "/services#fpga" },
            { label: "Physical Design", to: "/services#backend" },
            { label: "Design Signoff", to: "/services#signoff" },
            { label: "Synthesis & STA", to: "/services#synthesis-sta" },
            { label: "Staff Augmentation", to: "/services#staff" },
            { label: "Training & Upskilling", to: "/services#training" },
        ],
        why: [
            { label: "Strategy & Planning", to: "/why-zyron#strategy" },
            { label: "Engineering Reliability", to: "/why-zyron#reliability" },
            { label: "Domain Expertise", to: "/why-zyron#understanding" },
            { label: "Accelerated Delivery", to: "/why-zyron#reusability" },
            { label: "Scalable Engagements", to: "/why-zyron#scalability" },
            { label: "Transparent Execution", to: "/why-zyron#tracking" },
        ],
    },

};

export default Eng;
