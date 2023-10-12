import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ margin: 16 }}>
      <h1>Not Found</h1>
      <p>The page you are looking for is not found.</p>
      <p>
        <Link to="/">You can click here to go back to homepage.</Link>
      </p>
    </div>
  )
}
