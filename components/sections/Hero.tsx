"use client";

import { motion } from "framer-motion";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

export default function Hero() {
    return (
        <section className="relative w-full h-[80vh] flex flex-col justify-center items-center bg-gray-900 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-blue-500 opacity-30 blur-[120px] rounded-full -top-20 -left-40"></div>
            <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 blur-[100px] rounded-full bottom-10 right-20"></div>

            {/* Animated Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl font-extrabold relative z-10"
            >
                <AnimatedGradientText
                    colorFrom="#ffffff"
                    colorTo="#2563EB"
                >
                    RESIZABLE API
                </AnimatedGradientText>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-300 mt-3 text-xl"
            >
                Sometimes, <span className="text-blue-400 font-bold">Smaller</span> is Better.
            </motion.p>

            {/* Floating Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 p-4 px-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white"
            >
                🚀 Super Fast Image Resizing & Compression
            </motion.div>
        </section>
    );
}
