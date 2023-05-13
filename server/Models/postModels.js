import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String
    },
    user: {
      userId: {
        type: String
      },
      username: {
        type: String

      },
      profilePicture: {
        type: String

      }
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
