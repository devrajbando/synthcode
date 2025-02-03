import mongoose,{Schema} from 'mongoose';

// Folder Schema
const FolderSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    files: [
        {file:{

            type: Schema.Types.ObjectId,
            ref: 'File'
        }}
    ],
    
    subfolders: [{
      type: Schema.Types.ObjectId,
      ref: 'Folder'
    }],
    parentFolder: {
      type: Schema.Types.ObjectId,
      ref: 'Folder'
    }
  });
  
  export const Folder = mongoose.model('Folder', FolderSchema);