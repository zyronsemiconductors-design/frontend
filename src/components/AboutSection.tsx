import React from "react";
import SkillBar from "./SkillBar";
import { motion, Variants } from "framer-motion";

interface Skill {
    name: string;
    value: number;
}

interface AboutData {
    title: string;
    subtitle: string;
    paragraphs: string[];
    skills: Skill[];
}

interface AboutSectionProps {
    data: AboutData;
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1], // ✅ cubic-bezier instead of string
        },
    },
};

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
    const { title, subtitle, paragraphs, skills } = data;

    return (
        <section className="py-24 bg-white" id="about">
            <motion.div
                className="max-w-7xl mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Header */}
                <motion.div className="text-center mb-16" variants={fadeUp}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <div className="flex justify-center gap-2">
                        <span className="w-10 h-1 bg-blue-600 rounded-full" />
                        <span className="w-4 h-1 bg-blue-300 rounded-full" />
                        <span className="w-10 h-1 bg-blue-600 rounded-full" />
                    </div>
                </motion.div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Text */}
                    <motion.div variants={containerVariants}>
                        <motion.h3
                            className="text-2xl font-semibold text-gray-900 mb-4"
                            variants={fadeUp}
                        >
                            {subtitle}
                        </motion.h3>

                        {paragraphs.map((para, idx) => (
                            <motion.p
                                key={idx}
                                className="text-gray-600 leading-relaxed mb-4"
                                variants={fadeUp}
                            >
                                {para}
                            </motion.p>
                        ))}
                    </motion.div>

                    {/* Right Skills */}
                    <motion.div className="space-y-6" variants={containerVariants}>
                        {skills.map((skill) => (
                            <motion.div key={skill.name} variants={fadeUp}>
                                <SkillBar
                                    label={skill.name}
                                    value={skill.value}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutSection;
