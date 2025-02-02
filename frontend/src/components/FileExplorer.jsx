import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File, Plus, Trash2, PenSquare } from 'lucide-react';

const FileExplorer = () => {
  const [files, setFiles] = useState({
    'src': {
      type: 'folder',
      children: {
        'components': {
          type: 'folder',
          children: {
            'Button.js': { type: 'file' },
            'Input.js': { type: 'file' }
          }
        },
        'App.js': { type: 'file' },
        'index.js': { type: 'file' }
      }
    },
    'public': {
      type: 'folder',
      children: {
        'index.html': { type: 'file' },
        'styles.css': { type: 'file' }
      }
    }
  });

  const [expandedFolders, setExpandedFolders] = useState(new Set(['src']));
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newItemType, setNewItemType] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [contextMenu, setContextMenu] = useState(null);

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const getParentPath = (path) => {
    const parts = path.split('/');
    return parts.slice(0, -1).join('/');
  };

  const getNestedObject = (path) => {
    if (!path) return files;
    const parts = path.split('/');
    let current = files;
    for (const part of parts) {
      current = current[part]?.children;
      if (!current) return null;
    }
    return current;
  };

  const updateNestedObject = (path, value) => {
    const parts = path.split('/');
    const lastPart = parts.pop();
    let current = files;
    const newFiles = { ...files };
    let currentNew = newFiles;

    for (const part of parts) {
      current = current[part].children;
      currentNew[part] = { ...currentNew[part] };
      currentNew = currentNew[part].children = { ...current };
    }

    if (value === null) {
      delete currentNew[lastPart];
    } else {
      currentNew[lastPart] = value;
    }

    return newFiles;
  };

  const handleAddItem = (type, parentPath = '') => {
    setNewItemType(type);
    setNewItemName('');
    setSelectedFile(parentPath);
    setIsRenaming(true);
  };

  const handleRename = (path) => {
    setSelectedFile(path);
    setIsRenaming(true);
    setNewItemName(path.split('/').pop());
  };

  const handleDelete = (path) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setFiles(updateNestedObject(path, null));
      setSelectedFile(null);
    }
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    if (isRenaming && !newItemType) {
      // Simple rename logic
      const oldName = selectedFile.split('/').pop();
      const parentPath = getParentPath(selectedFile);
      const parentContent = getNestedObject(parentPath);
      
      // Create new parent object with renamed key
      const newParentContent = Object.fromEntries(
        Object.entries(parentContent).map(([key, value]) => {
          if (key === oldName) {
            return [newItemName, value];
          }
          return [key, value];
        })
      );

      // Update the files structure
      setFiles(prev => {
        if (!parentPath) {
          // Renaming at root level
          return newParentContent;
        }
        
        // Renaming at nested level
        return updateNestedObject(parentPath, {
          type: 'folder',
          children: newParentContent
        });
      });

      // Update expanded folders set if renaming a folder
      if (parentContent[oldName].type === 'folder' && expandedFolders.has(selectedFile)) {
        setExpandedFolders(prev => {
          const next = new Set(prev);
          next.delete(selectedFile);
          next.add(parentPath ? `${parentPath}/${newItemName}` : newItemName);
          return next;
        });
      }

      // Update selected file path
      setSelectedFile(parentPath ? `${parentPath}/${newItemName}` : newItemName);
    } else {
      // New item creation logic (unchanged)
      const newPath = selectedFile ? `${selectedFile}/${newItemName}` : newItemName;
      const newItem = {
        type: newItemType,
        ...(newItemType === 'folder' ? { children: {} } : {})
      };
      setFiles(updateNestedObject(newPath, newItem));
      if (newItemType === 'folder') {
        setExpandedFolders(prev => new Set([...prev, newPath]));
      }
    }

    setIsRenaming(false);
    setNewItemType(null);
    setNewItemName('');
  };


  const handleContextMenu = (e, path, isFolder) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      path,
      isFolder
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const renderTree = (structure, path = '') => {
    return Object.entries(structure).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name;
      const isExpanded = expandedFolders.has(fullPath);
      const isSelected = selectedFile === fullPath;
      const isRenamingThis = isRenaming && selectedFile === fullPath;

      if (item.type === 'folder') {
        return (
          <div key={fullPath}>
            <div 
              className={`flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`}
              onClick={() => toggleFolder(fullPath)}
              onContextMenu={(e) => handleContextMenu(e, fullPath, true)}
            >
              <span className="mr-1">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
              <Folder size={16} className="mr-2 text-blue-500" />
              {isRenamingThis ? (
                <form onSubmit={handleSubmitName} className="flex-1">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-1 border rounded text-white bg-white"
                    autoFocus
                    onBlur={handleSubmitName}
                  />
                </form>
              ) : (
                <span>{name}</span>
              )}
            </div>
            {isExpanded && (
              <div className="ml-4">
                {renderTree(item.children, fullPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={fullPath}
            className={`flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`}
            onClick={() => setSelectedFile(fullPath)}
            onContextMenu={(e) => handleContextMenu(e, fullPath, false)}
          >
            <span className="w-4 mr-1" />
            <File size={16} className="mr-2 text-gray-500" />
            {isRenamingThis ? (
              <form onSubmit={handleSubmitName} className="flex-1">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-1 border rounded"
                  autoFocus
                  onBlur={handleSubmitName}
                />
              </form>
            ) : (
              <span>{name}</span>
            )}
          </div>
        );
      }
    });
  };

  return (
    <div className="w-64 h-full border-r text-black border-gray-200 bg-white relative" onClick={closeContextMenu}>
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <span className="font-medium">Files</span>
        <div className="flex gap-2">
          <button 
            className="p-1 hover:bg-gray-100 rounded" 
            onClick={() => handleAddItem('file', selectedFile)}
            title="New File"
          >
            <File size={16} />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => handleAddItem('folder', selectedFile)}
            title="New Folder"
          >
            <Folder size={16} />
          </button>
        </div>
      </div>
      <div className="p-2">
        {renderTree(files)}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="absolute bg-white shadow-lg border rounded py-1 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button 
            className="w-full px-4 py-1 text-left hover:bg-gray-100 flex items-center"
            onClick={() => handleRename(contextMenu.path)}
          >
            <PenSquare size={16} className="mr-2" /> Rename
          </button>
          <button 
            className="w-full px-4 py-1 text-left hover:bg-gray-100 flex items-center text-red-600"
            onClick={() => handleDelete(contextMenu.path)}
          >
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
          {contextMenu.isFolder && (
            <>
              <button 
                className="w-full px-4 py-1 text-left hover:bg-gray-100 flex items-center"
                onClick={() => handleAddItem('file', contextMenu.path)}
              >
                <File size={16} className="mr-2" /> New File
              </button>
              <button 
                className="w-full px-4 py-1 text-left hover:bg-gray-100 flex items-center"
                onClick={() => handleAddItem('folder', contextMenu.path)}
              >
                <Folder size={16} className="mr-2" /> New Folder
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;