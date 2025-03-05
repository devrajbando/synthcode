import { File, Folder, Tree } from "./magicui/file-tree";
import { useState,useEffect,useRef } from "react";
import { ChevronRight, ChevronDown, Plus, FolderPlus, Check, Pencil, Trash } from 'lucide-react';

const FileTree = () => {
  const [treeData, setTreeData] = useState({
    id: "root",
    name: "Root",
    type: "folder",
    isOpen: true,
    children: [],
  });

  const handleAdd = (parentId, type) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: type === "folder" ? "New Folder" : "New File",
      type,
      isOpen: false,
      children: type === "folder" ? [] : null,
    };

    const updatedTree = addItem(treeData, parentId, newItem);
    setTreeData(updatedTree);
  };

  const addItem = (node, parentId, newItem) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...node.children, newItem],
      };
    }
    return {
      ...node,
      children: node.children.map((child) => addItem(child, parentId, newItem)),
    };
  };

  const handleRename = (id, newName) => {
    const updatedTree = renameItem(treeData, id, newName);
    setTreeData(updatedTree);
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
      children: node.children.map((child) => renameItem(child, id, newName)),
    };
  };

  const handleDelete = (id) => {
    const updatedTree = deleteItem(treeData, id);
    setTreeData(updatedTree);
  };

  const deleteItem = (node, id) => {
    return {
      ...node,
      children: node.children.filter((child) => {
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
      children: node.children.map((child) => toggleItem(child, id)),
    };
  };

  return (
    <div className="p-1 bg-gray-900">
      <TreeNode
        node={treeData}
        onAdd={handleAdd}
        onRename={handleRename}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
};

const TreeNode = ({ node, onAdd, onRename, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleRename = () => {
    onRename(node.id, newName);
    setIsEditing(false);
  };

  return (
    <div className="pl-2">
      <div className="flex items-center gap-2">
        {node.type === "folder" ? (
          <button
            onClick={() => onToggle(node.id)}
            className="flex items-center gap-1"
          >
            {node.isOpen ? "📂" : "📁"}
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded px-1"
              />
            ) : (
              <span>{node.name}</span>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-1">
            📄
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded px-1"
              />
            ) : (
              <span>{node.name}</span>
            )}
          </div>
        )}

        {node.type === "folder" && (
          <div className="flex gap-1">
            <button
              onClick={() => onAdd(node.id, "folder")}
              className="px-1 py-1 text-white rounded hover:text-blue-900"
            >
              <FolderPlus/>
            </button>
            <button
              onClick={() => onAdd(node.id, "file")}
              className="px-1 py-1 text-white rounded hover:text-blue-900"
            >
              <Plus/>
            </button>
          </div>
        )}

        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="px-1 py-1 text-white rounded hover:text-blue-900"
          >
            Rename
          </button>
          <button
            onClick={() => onDelete(node.id)}
            className="px-1 py-1 text-white rounded hover:text-red-600"
          >
            <Trash/>
          </button>
        </div>
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
          />
        ))}
    </div>
  );
};

export default FileTree;