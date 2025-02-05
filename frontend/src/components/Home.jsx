import React, { useState } from "react";
import AnimatedContent from "./ui/AnimateContent";
import { useAuthContext } from '../hooks/useAuthContext'
import { Code, Info, Play } from "lucide-react";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Install react-leaflet for map support
// import 'leaflet/dist/leaflet.css'; // Leaflet styles
// import tree from "../assets/undraw_quiet-street_v45k.svg";
import {useNavigate} from "react-router-dom"
import SpotlightCard from './ui/SpotlightCard';
import ShinyText from "./ui/ShinyText";
import RotatingText from './ui/RotatingText'
import Illustrate from "./ui/Illustrate";
import image from '../assets/collab.png'
import { fadeIn } from 'react-animations';
// import Radium, {StyleRoot} from 'radium';
import { StyleSheet, css } from 'aphrodite';
import SplitText from "./ui/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
 
const styles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '5s'
  }
})
export default function Home() {
  const { user } = useAuthContext()
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
              {/* AI Powered Code Collaborator */}
              <SplitText
  text="AI Powered Code Collaborator"
  className="text-6xl font-semibold text-center"
  delay={40}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
            </h1>
            <h2 className="text-2xl font-normal w-3/4 text-left py-5 text-white">
            Experience real-time code collaboration powered by advanced AI. <br /> Elevate your coding experience—faster, smarter, and more efficient!
            </h2>
            <button
              type="button"
              className="bg-white text-left w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-medium group my-4"
              onClick={()=>navigate("/code")}
            >
              <div className="bg-blue-800 rounded-xl h-12 w-1/4 flex items-center justify-center absolute right-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                
                
                <Code/>
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
        <section className="py-16 my-auto flex flex-col justify-start align-baseline">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* <StyleRoot> */}
      <AnimatedContent
          distance={80}
          direction="vertical"
          reverse={false}
          config={{ tension: 50, friction: 30 }}
          initialOpacity={0.2}
          animateOpacity
          scale={0.5}
          threshold={0.2}
        >

      
     
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <FeatureCard
                title={`Real-time Collaboration `}
                description="Code together with your team in real-time, seamlessly sync changes, and stay productive."
                />
            </SpotlightCard>
           
                </AnimatedContent>


            {/* </StyleRoot> */}

            <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          config={{ tension: 50, friction: 40 }}
          initialOpacity={0}
          animateOpacity
          scale={0.5}
          threshold={0.2}
        >
          
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <FeatureCard
                title="AI-Powered Assistance"
                description="Get intelligent code suggestions, bug detection, and optimization recommendations as you type."
                />
            </SpotlightCard>
                </AnimatedContent>

                <AnimatedContent
          distance={120}
          direction="vertical"
          reverse={false}
          config={{ tension: 50, friction: 50 }}
          initialOpacity={0}
          animateOpacity
          scale={0.5}
          threshold={0.2}
        >
          
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <FeatureCard
                title="Smart Version Control"
                description="Built-in version control that makes tracking changes and managing code versions effortless."
                />
            </SpotlightCard>
                </AnimatedContent>
            </div>
            {/* <ShinyText text="About Us" className="border p-2 rounded-2xl my-5 w-[25vh] text-center text-4xl border-cyan-400 mx-[90vh] hover:bg-blue-800 hover:cursor-pointer"
            >  */}
            <div className="flex flex-col align-middle">

            <button 
            onClick={() => navigate("/about")} 
            className=" text-center btn btn-lg w-fit mx-auto my-10 btn-outline text-2xl p-3 btn-primary">
              <Info/>
              About us</button>
            {/* </ShinyText> */}
            </div>
            </div>
        </section>

        </AnimatedContent>
      </div>

     

      {/* Analyze Section */}
      <div className="relative min-h-screen bg-blue-950 py-10">
      {/* <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sbGFib3JhdGV8ZW58MHx8MHx8fDA%3D')`,
          }}
        /> */}
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
<div className="flex">
  <div>
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
    <img src={image} alt="" className="h-[80vh] m-20"/>
</AnimatedContent>
{/* <Illustrate/> */}
  </div>


          <div className="text-right mx-auto mr-[180px] mt-[150px]"> 
           
            <h2 className="text-6xl font-semibold text-white">
                     <RotatingText
                texts={['Code', 'Create', 'Collaborate']}
                mainClassName="px-2 sm:px-2 md:px-3 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-end rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
              </h2>
              <div className="flex justify-end">

            <p className="text-2xl text-white mt-20 mb-8 w-[80vh]">Collaborate seamlessly with our AI-powered code collaboration platform! Create and join projects where you and your team can code together in real time, with AI-assisted suggestions, debugging, and seamless version control. </p>
              </div>
            <button className="btn btn-outline btn-light btn-lg px-4 py-3 text-gray-200 rounded-3xl text-2xl"
            onClick={() => navigate(user ? '/create' : '/login')}
            >
              Get Started
              <Play/>
              </button>
          </div>
          </div>
        </AnimatedContent>
      </div>

      
    </>
  );
}
