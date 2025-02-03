import mongoose,{Schema} from 'mongoose';
const Schema = mongoose.Schema;

// Comment Schema
const CommentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    // Can be associated with either a file or the project
    context: {
      type: String,
      enum: ['File', 'Project'],
      required: true
    },
    // Reference to either file or project based on context
    contextId: {
      type: Schema.Types.ObjectId,
      required: true,
      
    },
  });

  export const Comment = mongoose.model('Comment', CommentSchema);