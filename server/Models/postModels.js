import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: true
    },
    description: String,
    likes: [],
    postImage: {
      public_id: {
        type: String

      },
      url: {
        type: String
      }

    }
  },
  {
    timestamps: true
  })

const PostModel = mongoose.model('Posts', postSchema)
export default PostModel
