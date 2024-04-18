import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import {IoCartSharp} from 'react-icons/io5'
import DishCard from '../DishCard'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: [],
      cartItems: 0,
      showDishes: 0,
      menuCategory: [],
      isApiSuccess: false,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    if (response.ok) {
      const data = await response.json()
      console.log(data[0].restaurant_image)
      const updatedData = {
        restaurantName: data[0].restaurant_name,
        restaurantImage: data[0].restaurant_image,
        nexturl: data[0].nexturl,
        tableMenuList: data[0].table_menu_list,
      }
      this.setState({
        details: updatedData,
        menuCategory: updatedData.tableMenuList.map((eachOne, index) => ({
          menuCategory: eachOne.menu_category,
          isClicked: index === 0,
        })),
        isApiSuccess: true,
      })
    }
  }

  onCategoryClick = event => {
    const value = event.target.outerText
    const {details, menuCategory} = this.state
    const newMenuData = details.tableMenuList.map(eachOne => ({
      menuCategory: eachOne.menu_category,
      isClicked: eachOne.menu_category === value,
    }))
    const newShowDishes = details.tableMenuList.findIndex(
      eachOne => eachOne.menu_category === value,
    )
    this.setState({
      menuCategory: newMenuData,
      showDishes: newShowDishes,
    })
  }

  onQuantityIncrement = () => {
    this.setState(prevState => ({cartItems: prevState.cartItems + 1}))
  }

  onQuantityDecrement = () => {
    this.setState(prevState => {
      if (prevState.cartItems > 0) {
        return {cartItems: prevState.cartItems - 1}
      }
      return null
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" size="55" />
    </div>
  )

  renderCategoryMenu = () => {
    const {menuCategory} = this.state
    return (
      <ul className="CategoryUlContainer">
        {menuCategory.map(eachOne => {
          const name = eachOne.isClicked
            ? 'CategoryLiItemActive'
            : 'CategoryLiItem'
          const buttonName = eachOne.isClicked
            ? 'CategoryButtonActive'
            : 'CategoryButton'
          return (
            <li>
              <button
                key={eachOne.menuCategory}
                className={buttonName}
                value={eachOne.menuCategory}
                onClick={this.onCategoryClick}
              >
                <p className={name}>{eachOne.menuCategory}</p>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderHeader = () => {
    const {details, cartItems} = this.state
    const {restaurantName} = details
    return (
      <nav className="NavContainer">
        <h1>{restaurantName}</h1>
        <div className="NavCartContainer">
          <p className="NavPara">My Orders</p>
          <IoCartSharp color="blue" size="55" />
          <p className="NavCartCount">{cartItems}</p>
        </div>
      </nav>
    )
  }

  renderDishes = () => {
    const {isApiSuccess, details, showDishes} = this.state
    return (
      isApiSuccess && (
        <ul className="DishesUlcontainer">
          {details.tableMenuList[showDishes].category_dishes.map(eachOne => (
            <DishCard
              quantityIncrement={this.onQuantityIncrement}
              quantityDecrement={this.onQuantityDecrement}
              key={eachOne.dish_name}
              details={eachOne}
            />
          ))}
        </ul>
      )
    )
  }

  render() {
    const {isApiSuccess} = this.state
    return isApiSuccess ? (
      <>
        {this.renderHeader()}
        {this.renderCategoryMenu()}
        {this.renderDishes()}
      </>
    ) : (
      this.renderLoadingView()
    )
  }
}

export default Home
