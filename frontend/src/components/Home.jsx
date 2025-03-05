import React from "react";
import { useNavigate } from "react-router-dom";
import { Code, Info, Play } from "lucide-react";
import { useAuthContext } from '../hooks/useAuthContext';
import { TypingAnimation } from "./magicui/typing-animation";
import AnimatedContent from "./ui/AnimateContent";
import SpotlightCard from './ui/SpotlightCard';
import RotatingText from './ui/RotatingText';
import collaborationImage from '../assets/collab.png';

// Feature card component with responsive styling
const FeatureCard = ({ title, description }) => (
  <div className="bg-blue-950 p-4 md:p-6 rounded-lg shadow-lg h-full">
    <h3 className="text-lg md:text-xl text-blue-500 font-bold mb-2 md:mb-4">{title}</h3>
    <p className="text-white text-sm md:text-base">{description}</p>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const features = [
    {
      title: "Real-time Collaboration",
      description: "Code together with your team in real-time, seamlessly sync changes, and stay productive."
    },
    {
      title: "AI-Powered Assistance",
      description: "Get intelligent code suggestions, bug detection, and optimization recommendations as you type."
    },
    {
      title: "Smart Version Control",
      description: "Built-in version control that makes tracking changes and managing code versions effortless."
    }
  ];

  return (
    <div className="min-h-screen bg-blue-900">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="relative px-4 md:px-8 lg:px-16 xl:px-32 pt-20 md:pt-32">
          <AnimatedContent
            distance={80}
            direction="horizontal"
            config={{ tension: 50, friction: 25 }}
            initialOpacity={0.2}
            threshold={0.2}
          >
            <div className="max-w-4xl ">
           
                <TypingAnimation startOnView={true} className="text-2xl lg:text-6xl sm:text-2xl md:text-4xl text-white mb-6" duration={80}>
                  AI Powered Code Collaborator
                </TypingAnimation>
             
              <h2 className="text-xl md:text-2xl text-white mb-8">
                Experience real-time code collaboration powered by advanced AI.
                <br className="md:block" />
                Elevate your coding experience—faster, smarter, and more efficient!
              </h2>
              <button
                onClick={() => navigate("/code")}
                className="group relative bg-white text-black rounded-2xl h-14 text-left w-48 text-xl font-medium overflow-hidden"
              >
                <span className="relative pl-4">Start coding</span>
                <div className="absolute right-1 top-1 h-12 bg-blue-800 rounded-xl transition-all duration-500 w-12 group-hover:w-[calc(100%-8px)] flex items-center justify-center z-100">
                  <Code className="text-black" />
                </div>
              </button>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-16 px-4 md:px-8">
        <AnimatedContent
          distance={100}
          direction="vertical"
          config={{ tension: 30, friction: 20 }}
          initialOpacity={0}
          threshold={0.1}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {features.map((feature, index) => (
                <AnimatedContent
                  key={index}
                  distance={80 + (index * 20)}
                  direction="vertical"
                  config={{ tension: 50, friction: 30 + (index * 10) }}
                  initialOpacity={0.2}
                  threshold={0.2}
                >
                  <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
                    <FeatureCard {...feature} />
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 btn btn-outline btn-primary text-xl p-3"
              >
                <Info />
                About us
              </button>
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* Collaboration Section */}
      <section className="bg-blue-950 py-16 px-4 md:px-8">
        <AnimatedContent
          distance={100}
          direction="vertical"
          config={{ tension: 30, friction: 20 }}
          initialOpacity={0}
          threshold={0.1}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src={collaborationImage}
                  alt="Collaboration"
                  className="w-full max-w-lg mx-auto"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-right">
                <h2 className="text-4xl md:text-6xl font-semibold text-white mb-8">
                  <RotatingText
                    texts={['Code', 'Create', 'Collaborate']}
                    mainClassName="inline-block px-2 text-white overflow-hidden rounded-lg"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </h2>
                <p className="text-xl md:text-2xl text-white mb-8">
                  Collaborate seamlessly with our AI-powered code collaboration platform! 
                  Create and join projects where you and your team can code together in real time, 
                  with AI-assisted suggestions, debugging, and seamless version control.
                </p>
                <button
                  onClick={() => navigate(user ? '/create' : '/login')}
                  className="inline-flex items-center gap-2 btn btn-outline btn-light text-xl px-6 py-3 rounded-3xl"
                >
                  Get Started
                  <Play />
                </button>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>
    </div>
  );
};

export default Home;