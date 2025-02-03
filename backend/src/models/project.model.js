import mongoose,{Schema} from 'mongoose';
const Schema = mongoose.Schema;

// Project Schema 
const ProjectSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    joiningCode: {
      type: String,
      required: true,
      unique: true
    },
    rootFolder: FolderSchema,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastActive: {
      type: Date,
      default: Date.now
    }
  }, {
    pre: ['save', function(next) {
      if (this.members.length > 5) {
        next(new Error('Maximum project capacity reached (6 users including admin)'));
      }
      next();
    }]
  });






  export const Project = mongoose.model('Project', ProjectSchema);



