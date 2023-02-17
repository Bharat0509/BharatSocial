import './comments.scss'

const Comments = () => {
  return (
    <div className="comments">
        <div className="currUserComment">
        <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
       
            <input type="text" placeholder='Write a comment...' />
            <button>Send</button>
       
    

        </div>
        <div className="comment">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <div className="info">
                <span>John Doe</span>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam natus vero eius omnis in sunt molestiae cum est dignissimos. Delectus?</p>
            </div>
            <div className="date">1 hour ago</div>
        </div>

    </div>
  )
}

export default Comments