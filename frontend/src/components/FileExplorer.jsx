import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Plus, FolderPlus, Pencil, Trash, File, Save } from 'lucide-react';
import Button from '@mui/material/Button';
import Edit from './Editor';

const FileExplorer = ({ projectName, projectId, projectData }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(projectData.name,"h");
  console.log(projectData.children);
  const [treeData, setTreeData] = useState({
    id: "root",
    name: "Loading...", // Show loading state initially
    type: "folder",
    isOpen: false,
    children: [],
    content: null
  });

  // Update treeData when projectData becomes available
  useEffect(() => {
    if (projectData && projectData.name) {
      setTreeData(prev => ({
        ...prev,
        name: projectData.name,
        children: projectData.children || []
      }));
    }
  }, [projectData]);

  const removeKeys = (node) => {
    const { isOpen, id, ...rest } = node;
    if (rest.children) {
      rest.children = rest.children.map(removeKeys);
    }
    return rest;
  };

  const updateProject = async () => {
    try{

    
    const cleanedData = removeKeys(treeData);
    console.log("hi",cleanedData);
    const response = await fetch(`${API_URL}/api/project/${projectId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        projectData:cleanedData,
        projectId,
      }),
    });
    if (!response.ok) {
      console.log(response);
      return;
    }
    const data = await response.json();
    console.log(data);
  }
  catch(err){
    console.log(err);
  };
}
useEffect(() => {
  if (projectData && projectData.children) {
    setTreeData(prev => ({
      ...prev,
      children: projectData.children
    }));
  }
}, [projectData]);
  const [isEditing, setIsEditing] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const handleAdd = (parentId, type) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      type,
      isOpen: true,
      children: [],
      content: type === 'file' ? '' : null,
    };

    const updatedTree = addItem(treeData, parentId, newItem);
    setTreeData(updatedTree);
    setIsEditing(newItem.id);
  };

  const addItem = (node, parentId, newItem) => {
    if (node.id === parentId) {
      return {
        ...node,
        isOpen: true,
        children: [...(node.children || []), newItem],
      };
    }
    return {
      ...node,
      children: (node.children || []).map((child) => addItem(child, parentId, newItem)),
    };
  };

  const handleRename = (id, newName) => {
    const updatedTree = renameItem(treeData, id, newName);
    setTreeData(updatedTree);
    setIsEditing(null);
  };

  const renameItem = (node, id, newName) => {
    if (node.id === id) {
      return {
        ...node,
        name: newName,
      };
    }
    return {
      ...node,
      children: (node.children || []).map((child) => renameItem(child, id, newName)),
    };
  };

  const handleDelete = (id) => {
    const updatedTree = deleteItem(treeData, id);
    setTreeData(updatedTree);
  };

  const deleteItem = (node, id) => {
    return {
      ...node,
      children: (node.children || []).filter((child) => {
        if (child.id === id) return false;
        child.children = deleteItem(child, id).children;
        return true;
      }),
    };
  };

  const handleToggle = (id) => {
    const updatedTree = toggleItem(treeData, id);
    setTreeData(updatedTree);
  };

  const toggleItem = (node, id) => {
    if (node.id === id) {
      return {
        ...node,
        isOpen: !node.isOpen,
      };
    }
    return {
      ...node,
      children: (node.children || []).map((child) => toggleItem(child, id)),
    };
  };

  const TreeNode = ({ node, onAdd, onRename, onDelete, onToggle, isEditing, setIsEditing, hoveredNodeId, setHoveredNodeId }) => {
    const [newName, setNewName] = useState(node.name);

    const handleRename = () => {
      if (newName.trim() !== '') {
        onRename(node.id, newName);
        setIsEditing(null);
      }
    };

    useEffect(() => {
      if (isEditing === node.id) {
        setNewName(node.name);
      }
    }, [isEditing, node.id, node.name]);

    return (
      <div
        className="pl-2"
        onMouseEnter={() => setHoveredNodeId(node.id)}
        onMouseLeave={() => setHoveredNodeId(null)}
      >
        <div className="flex items-center gap-2 text-sm">
          {node.type === 'folder' ? (
            <button
              onClick={() => onToggle(node.id)}
              className="flex items-center gap-1"
            >
              {node.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              {isEditing === node.id ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border rounded px-1 text-sm"
                  onBlur={handleRename}
                  onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                  autoFocus
                />
              ) : (
                <span className="truncate">{node.name}</span>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <File size={16} />
              {isEditing === node.id ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border rounded px-1 text-sm"
                  onBlur={handleRename}
                  onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                  autoFocus
                />
              ) : (
                <span className="truncate">{node.name}</span>
              )}
            </div>
          )}

          {hoveredNodeId === node.id && (
            <div className="flex gap-1">
              {node.type === 'folder' && (
                <>
                  <button
                    onClick={() => onAdd(node.id, 'folder')}
                    className=" py-1 text-white rounded hover:text-blue-600"
                  >
                    <FolderPlus size={16} />
                  </button>
                  <button
                    onClick={() => onAdd(node.id, 'file')}
                    className=" py-1 text-white rounded hover:text-blue-600"
                  >
                    <Plus size={16} />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsEditing(node.id)}
                className=" py-1 text-white rounded hover:text-blue-600"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(node.id)}
                className=" py-1 text-white rounded hover:text-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          )}
        </div>

        {node.isOpen &&
          node.children &&
          node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAdd={onAdd}
              onRename={onRename}
              onDelete={onDelete}
              onToggle={onToggle}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              hoveredNodeId={hoveredNodeId}
              setHoveredNodeId={setHoveredNodeId}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="p-1 bg-gray-900 w-1/4 max-w-md mx-auto">
        <button
          onClick={() => updateProject()}
          className="btn btn-sm btn-soft btn-primary rounded-none m-2">Save <Save /></button>
        <TreeNode
          node={treeData}
          onAdd={handleAdd}
          onRename={handleRename}
          onDelete={handleDelete}
          onToggle={handleToggle}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          hoveredNodeId={hoveredNodeId}
          setHoveredNodeId={setHoveredNodeId}
        />
      </div>
      <Edit className="w-3/4" />
    </div>
  )
}

export default FileExplorer;