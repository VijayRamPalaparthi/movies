import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const {
    isHome,
    isPopular,
    isSearch,
    onChangeSearch,
    search,
    searchText,
  } = props
  const home = isHome ? 'header-name home-active' : 'header-name'
  const popular = isPopular ? 'header-name home-active' : 'header-name'

  const onChangeSearchInput = event => {
    onChangeSearch(event.target.value)
  }
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left-part">
          <Link to="/" className="link-container">
            <img
              src="https://res.cloudinary.com/djlwgb6z2/image/upload/v1704261345/Movies%20Mini%20Projects/Group_7399_bzwfor.png"
              className="header-logo"
              alt="website logo"
            />
          </Link>

          <Link to="/" className="link-container">
            <h1 className={home}>Home</h1>
          </Link>

          <Link to="/popular" className="link-container">
            <h1 className={popular}>Popular</h1>
          </Link>
        </div>

        <div className="header-right-part">
          {isSearch ? (
            <div className="search-container">
              <input
                type="search"
                value={searchText}
                className="search"
                onChange={onChangeSearchInput}
              />
              <button
                className="search-button"
                type="button"
                onClick={search}
                testid="searchButton"
                placeholder="Search"
              >
                <HiOutlineSearch size="17" color="#ffffff" />
              </button>
            </div>
          ) : (
            <Link to="/search" className="link-container">
              <HiOutlineSearch size="25" color="#ffffff" />
            </Link>
          )}

          <Link to="/account" className="link-container">
            <img
              src="https://res.cloudinary.com/djlwgb6z2/image/upload/v1704261450/Movies%20Mini%20Projects/Avatar_wyxhgh.png"
              alt="profile"
              className="profile-image"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
