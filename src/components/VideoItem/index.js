import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {obj} = props
  const {posterUrl, title, id} = obj
  return (
    <Link to={`/movie/${id}`}>
      <img src={posterUrl} alt={title} className="movie-poster" />
    </Link>
  )
}

export default VideoItem
