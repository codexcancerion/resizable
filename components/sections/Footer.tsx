"use client";

import { motion } from "framer-motion";
import { WarpBackground } from "../magicui/warp-background";
import { Github, Mail } from "lucide-react";

export default function Footer() {
    return (
        <WarpBackground className="w-screen">
            <div className="max-w-screen-lg mx-auto px-6 md:px-10 lg:px-16 text-center">
                {/* Logo */}
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-extrabold"
                >
                    RESIZABLE <span className="text-blue-500">API</span>
                </motion.h2>
                <p className="text-gray-400 mt-2">
                    The fastest way to optimize your images. Resize, compress, and enhance in seconds.
                </p>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 flex justify-center space-x-6"
                >
                    <a href="https://github.com/codexcancerion/resizable" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300 text-2xl">
                        <Github size={24} />
                    </a>
                    <a href="mailto:melbertmarafo2022@gmail.com" className="hover:text-blue-500 transition duration-300 text-2xl">
                        <Mail size={24} />
                    </a>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 text-gray-500 text-sm"
                >
                    © {new Date().getFullYear()} Resizable API. All rights reserved.
                </motion.p>
            </div>
        </WarpBackground>
    );
}
