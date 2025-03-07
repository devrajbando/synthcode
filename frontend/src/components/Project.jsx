import React, { useState,useEffect } from 'react';
import { 
  Folder, 
  File, 
  Plus, 
  Pencil, 
  Trash2, 
  Copy, 
  Users, 
  Crown, 
  Code 
} from 'lucide-react';
import { useLocation,useParams } from 'react-router-dom';
import Edit from './Editor';
import FileExplorer from './FileExplorer';
// Mock data - replace with actual project data


const Project = () => {
  // const { projectId } = useParams();
  const [selectedFileContent, setSelectedFileContent] = useState("");
const [projectDetails,setProjectDetails]=useState({
  name:'',
  description:'',
  admin:'',
  members:[],
  joiningCode:'',
  projectData:{}
})
const [copyColour,setCopyColour]=useState("color-gray-100")
  // const [projectData, setProjectData] = useState(initialProjectData);
  const location = useLocation();
  const projectId = location.state?.projectId || "Default Id";
  
  
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
  const getProjectData=async()=>{
    try {
      const response = await fetch(`${API_URL}/api/project/${projectId}`, {
          method: 'GET',
          
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include' // if using cookies
          
      });
  
      if (!response.ok) {
          // Handle non-2xx HTTP responses
          console.log(response);
          return;
      }
  
      const data = await response.json();
      
      if (data.statusCode == 200) {
         setProjectDetails({
          _id:data.data.project._id,
          name:data.data.project.name,
          admin:data.data.project.admin,
          joiningCode:data.data.project.joiningCode,
          description:data.data.project.description,
          members:data.data.project.members,
          projectData:data.data.project.projectData
         })

  
          
      } else {
          console.log(response);
      }
  } catch (error) {
      console.error('Error ', error);
      console.log('An error occurred. Please try again.');
  }
  }
  getProjectData()
}, [projectId]);
  

  const copyProjectCode = () => {
    navigator.clipboard.writeText(projectDetails.joiningCode);
    // alert('Project code copied to clipboard!');
    setCopyColour("color-gray-950")
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col">
        {/* Project Details Column */}
        <div className="bg-gray-900 border rounded-lg p-6 shadow-md flex justify-between">
          <div>

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-6xl font-bold text-blue-800">{projectDetails.name}</h1>
            
          </div>

          <div className='mb-5'>
            <h2 className='text-xl font-normal'>{projectDetails.description}</h2>
            
          </div>
              </div>

          <div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Team Members</h2>
            <h3 className='text-md '>Invite your team members to collaborate.

            <button 
              onClick={copyProjectCode}
              className={`inline items-center text-white px-3 py-1 rounded hover:bg-blue-900`}
              >
              <Copy className={`w-4 h-4 mr-2 inline ${copyColour}`} />
              {projectDetails.joiningCode}
            </button>
            </h3>
            
            {projectDetails.members.map(member => (
              <div 
              key={member}
              className="flex items-center justify-between py-1 last:border-b-0"
              >
                <div className="flex items-center">
                  <span>{member}</span>
                  {member===projectDetails.admin && <Crown className="w-5 h-5 text-yellow-500 ml-2" />}
                </div>
                {/* <span className="text-sm text-gray-600">{member}</span> */}
              </div>
            ))}
          </div>
          </div>

        </div>

       
      
{/* <div className='flex'> */}

        <FileExplorer 
        
        projectId={projectDetails._id} projectData={projectDetails.projectData}/>
        {/* <Edit /> */}
{/* </div> */}
      
      </div>
    </div>
  );
};

export default Project;