import React, { useState } from "react";
import AnimatedContent from "./ui/AnimateContent";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Install react-leaflet for map support
// import 'leaflet/dist/leaflet.css'; // Leaflet styles
// import tree from "../assets/undraw_quiet-street_v45k.svg";
import {useNavigate} from "react-router-dom"
import SpotlightCard from './ui/SpotlightCard';
import ShinyText from "./ui/ShinyText";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const FeatureCard = ({ title, description }) => (
    <div className="bg-blue-950 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl text-blue-500 font-bold mb-4">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  );
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen bg-blue-900 opacity-70">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        />
        <AnimatedContent
          distance={80}
          direction="horizontal"
          reverse={false}
          config={{ tension: 50, friction: 25 }}
          initialOpacity={0.2}
          animateOpacity
          scale={1.2}
          threshold={0.2}
        >
          <div className="mx-auto px-[180px] flex flex-col">
            <h1 className="text-6xl text-white text-left mt-[140px] py-10">
              AI Powered Code Collaborator
            </h1>
            <h2 className="text-2xl w-3/4 font-thin text-left py-5 text-white">
            Experience real-time code collaboration powered by advanced AI
            </h2>
            <button
              type="button"
              className="bg-white text-left w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-medium group my-4"
              onClick={()=>navigate("/login")}
            >
              <div className="bg-blue-700 rounded-xl h-12 w-1/4 flex items-center justify-center absolute right-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  />
                  <path
                    fill="#000000"
                    d="M786.752 512 521.344 776.64a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L786.752 512z"
                  />
                </svg>
              </div>
              <p className="translate-x-2 pl-2">Start coding</p>
            </button>
          </div>
        </AnimatedContent>
      </div>

      {/* About Us Section */}
      <div className="relative min-h-screen bg-slate-900">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" />
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          config={{ tension: 30, friction: 20 }}
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
        >
        <section className="py-16">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <FeatureCard
                title="Real-time Collaboration"
                description="Code together with your team in real-time, seamlessly sync changes, and stay productive."
                />
            </SpotlightCard>
                
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <FeatureCard
                title="AI-Powered Assistance"
                description="Get intelligent code suggestions, bug detection, and optimization recommendations as you type."
                />
            </SpotlightCard>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <FeatureCard
                title="Smart Version Control"
                description="Built-in version control that makes tracking changes and managing code versions effortless."
                />
            </SpotlightCard>
            </div>
            <ShinyText text="About Us" className="border p-2 rounded-2xl my-5 w-[25vh] text-center text-4xl border-cyan-400 mx-[90vh] hover:bg-blue-800 hover:cursor-pointer"
            onClick={() => navigate("/about")} 
            > 
            </ShinyText>
            </div>
        </section>

        </AnimatedContent>
      </div>

     

      {/* Analyze Section */}
      <div className="relative min-h-screen bg-blue-900 py-10">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          config={{ tension: 30, friction: 20 }}
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
        >

          <div className="text-right mx-auto mr-[180px] mt-[150px]">
           <img src="../assets/coding.png" alt="" />
            <h2 className="text-6xl font-semibold text-white">Create Now</h2>
            <p className="text-2xl text-white mt-20 mb-8">We leverage advanced AI algorithms to analyze urban environments and biodiversity patterns.<br/> Our platform examines data from various sources, such as satellite imagery, city infrastructure, <br/> and ecosystem reports, to provide comprehensive insights.</p>
            <button className="btn btn-outline btn-light">Analyze Now</button>
          </div>
        </AnimatedContent>
      </div>

      
    </>
  );
}
