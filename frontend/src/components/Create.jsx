import React, { useState } from 'react';
import AnimatedContent from './ui/AnimateContent';
import { FolderPlus, FilePlus, FolderOpen,X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {
  DialogRoot,
  DialogBody,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import RotatingText from './ui/RotatingText'
import { useAuthContext } from '../hooks/useAuthContext';
function Create() {
  const navigate = useNavigate();
  const {user}= useAuthContext()
  console.log(user)
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [projectId,setprojectId]=useState("")
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [projectCode, setProjectCode] = useState('');
  const projects = [
    {
      id: 1,
      name: "E-commerce Website",
      description: "Online store with product catalog and cart functionality",
      lastModified: "2 hours ago",
      language: "JavaScript",
      color: "bg-yellow-400"
    },
    {
      id: 2,
      name: "Task Manager API",
      description: "RESTful API for task management application",
      lastModified: "1 day ago",
      language: "Python",
      color: "bg-blue-400"
    },
    {
      id: 3,
      name: "Mobile App UI",
      description: "User interface design for fitness tracking app",
      lastModified: "3 days ago",
      language: "React Native",
      color: "bg-cyan-400"
    }
  ];
  const API_URL = import.meta.env.VITE_API_URL;
  const handleNewProjectSubmit = async() => {
    if (newProjectName.trim()) {

      try {
        const response = await fetch(`${API_URL}/api/project/create-new`, {
          method: 'POST',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            newProjectName,newProjectDesc
          }),
        });
        const data = await response.json();
        console.log(data.data.project._id)
        setprojectId(data.data.project._id)
        if (data.status === 409) {
          
          console.log(data.error)
        }
        else if (response.status === 201) {
          
          window.alert(data.message)
            // navigate('/new-project');
            navigate('/project', { state: { projectId: data.data.project._id } });
          }
        
        
       
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        console.log('Something went wrong. Please try again.');
      }
    }
      // Navigate to new project route with project name
      
      // Reset modal state
      setNewProjectName('');
      setIsNewProjectModalOpen(false);
    }
  };
  const handleJoin =async () => {
    if (projectCode.trim()) {
      try {
        const response = await fetch(`${API_URL}/api/project/join`, {
          method: 'POST',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            projectCode
          }),
        });
        const data = await response.json();
        console.log(data)
        
        if (data.status === 409) {
          
          console.log(data.error)
        }
        else if (response.status === 201) {
         
          window.alert(data.message)
            // navigate('/new-project');
            navigate(`/project`, { state: { projectId: data.data._id } });
          }
        
        
       
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        console.log('Something went wrong. Please try again.');
      }
    }
      setIsJoinOpen(false);
      setProjectCode('');
    }
  };

  const goToProject=async(id)=>{
    navigate('/project', { state: { projectId: id } });
  }

  
  return (
    <>
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
          <RotatingText
  texts={['Code', 'Create', 'Collaborate']}
  mainClassName="px-2 sm:px-2 md:px-3 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-start rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/>
              {/* Code, Create, Collaborate */}
            </h1>
            <h2 className="text-2xl font-normal w-3/4 text-left py-5 text-white">
              Make exciting coding projects with your friends
            </h2>
            <div className="flex gap-4">
              <button 
                className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                onClick={() => setIsNewProjectModalOpen(true)}
              >
                <FilePlus className="w-5 h-5" />
                <span className="font-medium">New Project</span>
              </button>

              <button 
                className="flex items-center gap-2 border-2 bg-white border-blue-950 text-blue-950 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                onClick={() => setIsJoinOpen(true)}
              >
                <FolderPlus className="w-5 h-5" />
                <span className="font-medium">Join Project</span>
              </button>
            </div>

            {/* Projects List Rendering Remains the Same */}
            <div className="p-6">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-100">Your Projects</h2>
                <p className="text-gray-100">Recent projects you've been working on</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.projects && user.projects.map((project) => (
                  <div 
                    key={project._id}
                    className="bg-blue-950 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <button className="flex items-center gap-3" onClick={()=>goToProject(project.project)}>
                          <FolderOpen  className="w-5 h-5 text-gray-200" />
                          <h3 className="font-semibold text-lg text-gray-100">{project.name}</h3>
                        </button>
                      </div>

                      <p className="text-white mb-4 line-clamp-2">{project.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* <div className={`w-3 h-3 rounded-full ${project.color}`}></div> */}
                          {/* <span className="text-sm text-white">{project.language}</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-950 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <input 
              type="text"
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <br />
            <input 
              type="text"
              placeholder="Enter project description"
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setIsNewProjectModalOpen(false)}
                className="px-4 py-2 text-gray-100 hover:bg-gray-900 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleNewProjectSubmit}
                className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

{isJoinOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-950 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Join Project</h2>
            <input 
              type="text"
              placeholder="Enter project code"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4 bg-black text-gray-100"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleJoin();
              }}
            />
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => {
                  setIsJoinOpen(false);
                  setProjectCode('');
                }}
                className="px-4 py-2 text-gray-100 hover:bg-gray-900 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleJoin}
                className="px-4 py-2 bg-white text-blue-950 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!projectCode.trim()}
              >
                Join Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Create;