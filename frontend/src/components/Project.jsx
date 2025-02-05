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
// Mock data - replace with actual project data
const initialProjectData = {
  name: "E-Commerce Platform",
  projectCode: "ECOM-2024-XYZ",
  members: [
    { id: 1, name: "John Doe", role: "Admin", isAdmin: true },
    { id: 2, name: "Jane Smith", role: "Developer", isAdmin: false },
    { id: 3, name: "Mike Johnson", role: "Designer", isAdmin: false }
  ],
  fileStructure: {
    name: "E-Commerce Platform",
    type: 'folder',
    children: [
      { 
        name: "frontend", 
        type: 'folder', 
        children: [
          { name: "index.html", type: 'file' },
          { name: "styles.css", type: 'file' },
          { 
            name: "components", 
            type: 'folder', 
            children: [
              { name: "Header.jsx", type: 'file' },
              { name: "Footer.jsx", type: 'file' }
            ]
          }
        ]
      },
      { 
        name: "backend", 
        type: 'folder', 
        children: [
          { name: "server.js", type: 'file' },
          { name: "routes.js", type: 'file' }
        ]
      }
    ]
  }
};


// projectData

// const FileTree = ({ structure, onAddFolder, onAddFile, onRename, onDelete }) => {
//   const [expanded, setExpanded] = useState({});
//   const [editingItem, setEditingItem] = useState(null);
//   const [newItemName, setNewItemName] = useState('');

//   const renderTree = (node, path = '') => {
//     const isExpanded = expanded[path];
//     const fullPath = path ? `${path}/${node.name}` : node.name;

//     return (
//       <div key={fullPath} className="pl-4">
//         <div className="flex items-center hover:bg-gray-100 py-1">
//           {node.type === 'folder' ? (
//             <button 
//               onClick={() => setExpanded(prev => ({
//                 ...prev,
//                 [path]: !prev[path]
//               }))}
//               className="mr-2"
//             >
//               {isExpanded ? '▼' : '►'}
//             </button>
//           ) : (
//             <File className="w-4 h-4 mr-2 text-gray-500" />
//           )}
          
//           {editingItem === fullPath ? (
//             <input 
//               type="text"
//               value={newItemName}
//               onChange={(e) => setNewItemName(e.target.value)}
//               onBlur={() => {
//                 onRename(path, newItemName);
//                 setEditingItem(null);
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   onRename(path, newItemName);
//                   setEditingItem(null);
//                 }
//               }}
//               autoFocus
//               className="border rounded px-2 py-1 mr-2"
//             />
//           ) : (
//             <span className="flex-grow">{node.name}</span>
//           )}

//           <div className="flex items-center ml-auto">
//             {node.type === 'folder' && (
//               <button 
//                 onClick={() => onAddFolder(fullPath)}
//                 className="mr-2 hover:bg-gray-200 rounded p-1"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             )}
//             {node.type === 'folder' && (
//               <button 
//                 onClick={() => onAddFile(fullPath)}
//                 className="mr-2 hover:bg-gray-200 rounded p-1"
//               >
//                 <File className="w-4 h-4" />
//               </button>
//             )}
//             <button 
//               onClick={() => {
//                 setEditingItem(fullPath);
//                 setNewItemName(node.name);
//               }}
//               className="mr-2 hover:bg-gray-200 rounded p-1"
//             >
//               <Pencil className="w-4 h-4" />
//             </button>
//             <button 
//               onClick={() => onDelete(path)}
//               className="hover:bg-red-100 rounded p-1 hover:text-red-600"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
        
//         {node.type === 'folder' && isExpanded && node.children && (
//           <div className="pl-4 border-l">
//             {node.children.map(child => renderTree(child, fullPath))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white border rounded p-4">
//       {renderTree(structure)}
//     </div>
//   );
// };

const Project = () => {
  // const { projectId } = useParams();
const [projectDetails,setProjectDetails]=useState({
  name:'',
  description:'',
  admin:'',
  members:[],
  joiningCode:''
})
const [copyColour,setCopyColour]=useState("color-gray-100")
  // const [projectData, setProjectData] = useState(initialProjectData);
  const location = useLocation();
  const projectId = location.state?.projectId || "Default Id";
  console.log(projectId)
  const handleAddFolder = (parentPath) => {
    const newFolderName = prompt("Enter folder name:");
    if (newFolderName) {
      // Logic to add folder (simplified)
      console.log(`Adding folder ${newFolderName} to ${parentPath}`);
    }
  };
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
      console.log(data);
  console.log(data.data.project.members)
      if (data.statusCode == 200) {
          console.log('Data successful');
         setProjectDetails({
          name:data.data.project.name,
          admin:data.data.project.admin,
          joiningCode:data.data.project.joiningCode,
          description:data.data.project.description,
          members:data.data.project.members
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
  const handleAddFile = (parentPath) => {
    const newFileName = prompt("Enter file name:");
    if (newFileName) {
      // Logic to add file (simplified)
      console.log(`Adding file ${newFileName} to ${parentPath}`);
    }
  };

  const handleRename = (path, newName) => {
    // Logic to rename item (simplified)
    console.log(`Renaming ${path} to ${newName}`);
  };

  const handleDelete = (path) => {
    // Logic to delete item (simplified)
    console.log(`Deleting ${path}`);
  };

  const copyProjectCode = () => {
    navigator.clipboard.writeText(projectDetails.joiningCode);
    // alert('Project code copied to clipboard!');
    setCopyColour("color-gray-950")
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col">
        {/* Project Details Column */}
        <div className="bg-gray-900 border rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-800">{projectDetails.name}</h1>
            <button 
              onClick={copyProjectCode}
              className={`flex items-center text-white px-3 py-1 rounded hover:bg-blue-900`}
            >
              <Copy className={`w-4 h-4 mr-2 ${copyColour}`} />
              {projectDetails.joiningCode}
            </button>
          </div>

          <div className='mb-5'>
            <h2 className='text-xl font-semibold'>Description: {projectDetails.description}</h2>
            
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Team Members</h2>
            {projectDetails.members.map(member => (
              <div 
                
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

        {/* File Structure Column
        <div>
          <FileTree 
            structure={projectDetails.fileStructure}
            onAddFolder={handleAddFolder}
            onAddFile={handleAddFile}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        </div> */}

        {/* Code Editor Column */}
        <Edit/>
      </div>
    </div>
  );
};

export default Project;