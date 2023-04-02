import './comments.scss'

const Comments = () => {
  return (
    <div className="comments">
      <div className="currUserComment">
        <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />

        <input type="text" placeholder='Write a comment...' />
        <button>Send</button>



      </div>
    </div>
  )
}

export default Comments