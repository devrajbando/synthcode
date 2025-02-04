import mongoose,{Schema} from 'mongoose';
import {Folder} from './folder.model.js'

// Project Schema 
const ProjectSchema = new mongoose.Schema({
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
      type: String,
      required: true
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    membersId: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    members: [{
      type:String
    }],
    joiningCode: {
      type: String,
      required: true,
      unique: true
    },
    rootFolder: {

      type: Schema.Types.ObjectId,
      ref: 'Folder'
    },
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



