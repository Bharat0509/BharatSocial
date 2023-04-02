import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: true
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Posts',
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  })

const commentModel = mongoose.model('Comments', commentSchema)
export default commentModel
