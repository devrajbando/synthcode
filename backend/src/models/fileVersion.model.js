import mongoose,{Schema} from 'mongoose';
const Schema = mongoose.Schema;

// File Version Schema
const FileVersionSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    changeDescription: {
      type: String,
      required: true
    }
  });

  export const FileVersion = mongoose.model('FileVersion', FileVersionSchema);