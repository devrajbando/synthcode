import React from 'react';
// import { Card, CardContent } from './components/ui/card';
import SpotlightCard from './ui/SpotlightCard'
import { Github, Linkedin, Mail } from 'lucide-react';
import devraj from "../assets/WhatsApp Image 2025-02-03 at 03.13.53_0568fcc7.jpg"
import arman from "../assets/PXL_20241206_114238141.jpg"
import debantar from "../assets/1718736512948.jpeg"
import Masonry from './ui/Masonry';
import AnimatedContent from "./ui/AnimateContent";
const teamMembers = [
  {
    name: "Devraj Bandopadhyay",
    role: "Full Stack Developer",
    photo: devraj,
    github: "https://github.com/devrajbando",
    linkedin: "https://www.linkedin.com/in/devraj-bandopadhyay-366b96288/",
    email: "23je0305@iitism.ac.in"
  },
  {
    name: "Arman Bhattacharjee",
    role: "ML Engineer",
    photo:arman,
    github: "https://github.com/quacky20",
    linkedin: "https://www.linkedin.com/in/arman-bhattacharjee-18293b287/",
    email: "23je0149@iitism.ac.in"
  },
  {
    name: "Debantar Chakraborty",
    role: "Product Manager",
    photo: debantar,
    // github: "https://github.com/debantar",
    linkedin: "https://www.linkedin.com/in/debantar-chakraborty-015708285/",
    email: "23je0292@iitism.ac.in"
  },
  {
    name: "Shubhayu Chatterjee",
    role: "Signed up as a joke :)",
    linkedin: "https://www.linkedin.com/in/lol-i-fartz-undefined-3a0649304/",
    email: "23je0938@iitism.ac.in"
  }
];

const About = () => {
  return (
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
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
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About synthCode
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            An AI-assisted code editor built by four ambitious sophomore students from IIT (ISM) Dhanbad, 
            revolutionizing collaborative coding with real-time features and AI-driven assistance.
          </p>
        </div>
        <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              config={{ tension: 30, friction: 20 }}
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.4}
            >

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Our Vision
          </h2>
          <SpotlightCard className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            {/* <CardContent className="p-6"> */}
              <p className="text-gray-600 dark:text-gray-300">
                synthCode aims to transform the coding experience by combining the power of AI with seamless 
                collaboration tools. Our platform features real-time collaboration, AI-powered code completion, 
                intelligent linting, and comprehensive security measures, all wrapped in an intuitive interface 
                designed for developers of all skill levels.
              </p>
            {/* </CardContent> */}
          </SpotlightCard>
        </div>
        

        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Meet Our Team
        </h2>
        <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              config={{ tension: 30, friction: 20 }}
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0}
            >
          
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
              // <Masonry>
              <SpotlightCard key={member.name} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
             
              {/* <CardContent className="p-6"> */}
                <div className="text-center">
                    
                {!member.photo ? (
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    ) : (
                        <img 
                        className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center object-cover"
                        src={member.photo}
                        alt={`${member.name}'s photo`}
                        />
                    )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {member.role}
                  </p>
                  <div className="flex justify-center space-x-4">
                    {member.github &&

                      <a href={member.github} target='_blank' className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <Github className="w-5 h-5" />
                    </a>
                    }
                    <a href={member.linkedin} target='_blank' className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${member.email}`} target='_blank' className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              {/* </CardContent> */}
            
            </SpotlightCard>
                     //</Masonry>
                ))}
        </div>
        </AnimatedContent>
        
                </AnimatedContent>
                </AnimatedContent>
                
      </div>
    </div>
  );
};

export default About;