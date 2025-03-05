import React, { useState } from 'react';
import { 
  Box,   VStack,   HStack,  Flex,   Text,   Button,   Input ,
  useDisclosure, 
  useBreakpointValue,
  Grid,
  GridItem
} from '@chakra-ui/react';
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

  const backgroundImageStyle = useBreakpointValue({
    base: { 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    },
    md: { 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }
  });

  
  return (
    <Box position="relative" height="100vh" bg="blue.900" opacity={0.95}>
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        opacity={0.25}
        height="100vh"
        width="100vw"
      />

      <AnimatedContent
        distance={80}
        direction="horizontal"
        config={{ tension: 50, friction: 25 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.2}
        threshold={0.2}
      >
        <VStack 
          spacing={6} 
          align="start" 
          maxW="container.xl" 
          mx="auto" 
          px={[4, 10, 20]} 
          position="relative" 
          zIndex={10}
        >
          {/* Header */}
          <Box>
            <Text 
              fontSize={['4xl', '5xl', '6xl']} 
              color="white" 
              textAlign="left" 
              mt={[20, 24, 32]}
            >
              <RotatingText
                texts={['Code', 'Create', 'Collaborate']}
                mainClassName="text-white"
                rotationInterval={2000}
              />
            </Text>
            <Text 
              fontSize={['xl', '2xl']} 
              color="white" 
              w={['full', '3/4']} 
              textAlign="left" 
              py={4}
            >
              Make exciting coding projects with your friends
            </Text>
          </Box>

          {/* Action Buttons */}
          <HStack spacing={4}>
            <Button 
            className='p-2'
              leftIcon={<FilePlus />}
              bg="blue.950"
              color="white"
              _hover={{ bg: 'blue.900' }}
              // onClick={openNewProjectModal}
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              <FilePlus className="w-5 h-5" />
              <span className="font-medium">New Project</span>
            </Button>

            <Button 
              leftIcon={<FolderPlus />}
              variant="outline"
              className='p-2'
              bg="white"
              color="blue.950"
              borderColor="blue.950"
              _hover={{ bg: 'gray.100' }}
              // onClick={openJoinProjectModal}
              onClick={() => setIsJoinOpen(true)}
            >
              <FolderPlus className="w-5 h-5" />
              <span className="font-medium">Join Project</span>
            </Button>
          </HStack>

          {/* Projects Grid */}
          <Box w="full" p={6}
                 >
            <VStack spacing={6} align="stretch">
              <VStack spacing={2} textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="gray.100">
                  Your Projects
                </Text>
                <Text color="gray.100">
                  Recent projects you've been working on
                </Text>
              </VStack>

              <Grid 
                templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} 
                gap={6}
              >
                {user.projects?.map((project) => (
                  <GridItem key={project._id}>
                    <Box
                      bg="blue.950"
                      rounded="lg"
                      shadow="md"
                      border="1px"
                      borderColor="gray.200"
                      p={6}
                      transition="all 0.2s"
                      _hover={{ shadow: 'lg' }}
                    >
                      <Flex justify="space-between" align="center" mb={4}>
                        <Button 
                          variant="ghost" 
                          leftIcon={<FolderOpen color="gray.200" />}
                          onClick={() => goToProject(project.project)}
                        >
                          {project.name}
                        </Button>
                      </Flex>
                      <Text color="white" noOfLines={2} mb={4}>
                        {project.description}
                      </Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </Box>
        </VStack>
      </AnimatedContent>

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
    </Box>
  );
}

export default Create;