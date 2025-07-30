const Anecdote = ({ anecdota }) => {
  return (
    <div className='content_containers' >
      <h2>Anecdotes</h2>
      <strong style={{ marginBottom: '15px' }}>{anecdota.content}</strong>
      <p>By {anecdota.author}</p>
      <a href={anecdota.info}>{anecdota.info}</a>
      <p>Has {anecdota.votes} votes</p>
    </div>
  )
}

export default Anecdote