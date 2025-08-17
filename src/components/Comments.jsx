import { useDispatch } from "react-redux"
import { commentBlog } from "../reducers/blogs"

const Comments = ({ blog }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog.id, e.target.comment.value));
    e.target.comment.value = '';
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="comment" id="comment" />
          <button type="submit">Add comment</button>
        </div>
      </form>
      {blog.comments.map((comment, i) => (
        <li key={i}>{comment}</li>
      ))}
    </div>
  )
}

export default Comments