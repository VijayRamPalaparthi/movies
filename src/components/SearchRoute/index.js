import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {RiAlertFill} from 'react-icons/ri'
import VideoItem from '../VideoItem'
import Header from '../Header'

import './index.css'

class SearchRoute extends Component {
  state = {
    searchResultMoviesList: [],
    resultApiStatus: 'initial',
    searchText: '',
  }

  onChangeSearchText = text => {
    if (text === '') {
      this.setState({searchText: text}, this.getSearchedMovies)
      //  this.setState({searchText: text}, this.getSearchedMovies())  --> don't write like this
    } else {
      this.setState({searchText: text})
    }
  }

  onClickSearchButton = () => {
    this.getSearchedMovies()
  }

  componentDidMount = () => {
    this.getSearchedMovies()
  }

  getSearchedMovies = async () => {
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({resultApiStatus: 'loader'})
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const fetchedData = await fetch(url, options)

    const data = await fetchedData.json()
    if (fetchedData.ok) {
      const updatedData = data.results.map(each => ({
        backdropImageUrl: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterUrl: each.poster_path,
        title: each.title,
      }))
      this.setState({
        searchResultMoviesList: updatedData,
        resultApiStatus: 'success',
      })
    } else {
      this.setState({resultApiStatus: 'failure'})
    }
  }

  renderSearchResultSuccessView = () => {
    const {searchResultMoviesList, searchText} = this.state
    const moviesCount = searchResultMoviesList.length

    if (moviesCount === 0) {
      return (
        <div className="no-result-view-container">
          <img
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670000784/Movies%20App/Not_Found_qfz2oz.png"
            alt="no movies"
            className="no-result-image"
          />
          <p className="no-result-text">
            {`
          Your search for ${searchText} did not find any matches.`}
          </p>
        </div>
      )
    }

    return (
      <div className="popular-videoItem-container">
        {searchResultMoviesList.map(each => (
          <VideoItem obj={each} key={each.id} />
        ))}
      </div>
    )
  }

  retryPopular = () => {
    this.getSearchedMovies()
  }

  renderFailureView = () => (
    <div className="popular-failure-container">
      <div className="failure-desc-container">
        <RiAlertFill size="40" color="#D81F26" />
        <p className="failure-content">
          Something went wrong. Please try again
        </p>
        <button
          className="try-button"
          type="button"
          onClick={this.retryPopular}
        >
          Try Again{' '}
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  switchSearchResult = () => {
    const {resultApiStatus} = this.state
    switch (resultApiStatus) {
      case 'loader':
        return this.renderLoadingView()

      case 'success':
        return this.renderSearchResultSuccessView()

      case 'failure':
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {searchText} = this.props
    return (
      <div className="popular-bg-container">
        <Header
          isSearch
          onChangeSearch={this.onChangeSearchText}
          search={this.onClickSearchButton}
          searchText={searchText}
        />
        {this.switchSearchResult()}
      </div>
    )
  }
}

export default SearchRoute
