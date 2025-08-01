const Country = ({ country }) => {
  if (!country) return null
  if (!country.found) return <div>Not found...</div>

  const { data } = country

  return (
    <div className="ctry_container">
      <h2>{data.name.common}</h2>
      <div>
        <p><strong>Official name:</strong>  {data.name.official}</p>
        <p><strong>Capital:</strong>  {data.capital} </p>
        <p><strong>Region:</strong>  {data.region}</p>
        <p><strong>Population:</strong>  {data.population}</p>
      </div>
      <img src={data.flags.png} height='150px' alt={data.flags.alt} />
    </div>
  )
}

export default Country