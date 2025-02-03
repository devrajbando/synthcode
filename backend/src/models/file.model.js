import mongoose,{Schema} from 'mongoose';
const Schema = mongoose.Schema;

// File Schema 
const FileSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      enum: ['javascript', 'python', 'java'],
      required: true
    },
    lastModified: {
      type: Date,
      default: Date.now
    },
    lastModifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    versions: [FileVersionSchema],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  });

  export const File = mongoose.model('File', FileSchema);
  