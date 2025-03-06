"use client";

import ApiSpecificationsSection from "@/components/sections/ApiSpecificationsSection";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import IntegrationTutorialSection from "@/components/sections/IntegrationTutorialSection";
import TestSection from "@/components/sections/TestSection";

export default function LandingPage() {

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <Hero />
            <TestSection />
            <ApiSpecificationsSection />
            <IntegrationTutorialSection />
            <Footer />
        </div>
    );
}
