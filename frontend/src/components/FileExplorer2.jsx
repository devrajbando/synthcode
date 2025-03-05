import { File, Folder, Tree } from "./magicui/file-tree";
import { useState,useEffect,useRef } from "react";
import { ChevronRight, ChevronDown, Plus, FolderPlus, Check, Pencil, Trash } from 'lucide-react';

export default function FileExplorer2() {
    const [selectedFile, setSelectedFile] = useState(null);
      const [fileContent, setFileContent] = useState("");
       const [files, setFiles] = useState([
          { type: "folder", name: "root", id: 1, children: [] }
        ]);
        const [expandedFolders, setExpandedFolders] = useState({ 1: true });
        const [selectedFolder, setSelectedFolder] = useState(null);
        const [newItem, setNewItem] = useState({ parentId: null, type: null, name: "" });
        const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, item: null });
        const inputRef = useRef(null);
        useEffect(() => {
          const handleClickOutside = () => {
            if (contextMenu.visible) {
              setContextMenu({ ...contextMenu, visible: false });
            }
          };
          document.addEventListener("click", handleClickOutside);
          return () => {
            document.removeEventListener("click", handleClickOutside);
          };
        }, [contextMenu]);
        const handleRightClick = (e, item) => {
            e.preventDefault();
            setContextMenu({ visible: true, x: e.clientX, y: e.clientY, item });
          };

          const toggleFolder = (id) => {
            setExpandedFolders((prev) => ({
              ...prev,
              [id]: !prev[id],
            }));
            setSelectedFolder(id);
          };


          const handleFileSelect = (file) => {
            if (file.type === "file") {
              setSelectedFile(file.name);
              setFileContent(`// Content of ${file.name}\n`);
            }
          };

          const renderFiles = (files) => {
            files.map((file)=>{
                if(file.type==="folder")
                {
                    return (
                        <Folder key={file.id} style={{ marginLeft: "10px", padding: "2px" }} onContextMenu={(e,file) => handleRightClick(e, file)}>
                <div
                  onClick={() => toggleFolder(file.id)}
                  style={{ cursor: "pointer", padding: "3px", display: "flex", alignItems: "center" }}
                  >
                  {(expandedFolders[file.id] ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />)}
                 {file.name}
                </div>
                {file.children && expandedFolders[file.id] && renderFiles(file.children)}
              </Folder>
                    )
                }
                else
                {
                    return(
                        <File key={file.id} style={{ marginLeft: "10px", padding: "2px" }} onContextMenu={(e,file) => handleRightClick(e, file)}>
            <div
              onClick={() => handleFileSelect(file)}
              style={{ cursor: "pointer", padding: "3px", display: "flex", alignItems: "center" }}
              >
              
              {file.name}
            </div>
            
          </File>
                    )
                }
            })
            
          };



  return (
    <div className="relative flex h-[300px] w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
        {contextMenu.visible && (
        <div
          style={{ position: "absolute", top: contextMenu.y, left: contextMenu.x, backgroundColor: "#fff", border: "1px solid #ccc", padding: "5px", boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
        >
          <button onClick={() => renameItem(contextMenu.item.id)}>Rename</button>
          <button onClick={() => deleteItem(contextMenu.item.id)}>Delete</button>
        </div>
      )}
      <Tree
        className="overflow-hidden rounded-md bg-background p-2"
        initialSelectedId="7"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
        ]}
        elements={ELEMENTS}
      >
        {contextMenu.visible && (
        <div
          style={{ position: "absolute", top: contextMenu.y, left: contextMenu.x, backgroundColor: "#fff", border: "1px solid #ccc", padding: "5px", boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
        >
          <button onClick={() => renameItem(contextMenu.item.id)}>Rename</button>
          <button onClick={() => deleteItem(contextMenu.item.id)}>Delete</button>
        </div>
      )}
        {/* <Folder element="src" value="1">
          <Folder value="2" element="app">
            <File value="3">
              <p>layout.tsx</p>
            </File>
            <File value="4">
              <p>page.tsx</p>
            </File>
          </Folder>
          <Folder value="5" element="components">
            <Folder value="6" element="ui">
              <File value="7">
                <p>button.tsx</p>
              </File>
            </Folder>
            <File value="8">
              <p>header.tsx</p>
            </File>
            <File value="9">
              <p>footer.tsx</p>
            </File>
          </Folder>
          <Folder value="10" element="lib">
            <File value="11">
              <p>utils.ts</p>
            </File>
          </Folder>
        </Folder> */}
      <div>{renderFiles(files)}</div>
      </Tree>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];
