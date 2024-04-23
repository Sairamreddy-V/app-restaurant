
import {Component} from 'react'
import './index.css'

class DishCard extends Component {
  state = {quantity: 0}

  render() {
    const {quantity} = this.state
    const {details, quantityIncrement, quantityDecrement} = this.props
    const updatedDetails = {
      dishName: details.dish_name,
      dishPrice: details.dish_price,
      dishImage: details.dish_image,
      dishCurrency: details.dish_currency,
      dishCalories: details.dish_calories,
      dishDescription: details.dish_description,
      dishAvailability: details.dish_Availability,
      dishType: details.dish_Type,
      dishUrl: details.nexturl,
      addonLength: details.addonCat.length,
    }
    const ondecrement = () => {
      console.log('decrement triggerd')
      if (quantity > 0) {
        this.setState(
          prevState => ({quantity: prevState.quantity - 1}),
          quantityDecrement(),
        )
      }
    }
    const onincrement = () => {
      this.setState(
        prevState => ({quantity: prevState.quantity + 1}),
        quantityIncrement(),
      )
    }
    const dishtype =
      updatedDetails.dishType === 2
        ? 'DishTypeContainerNonVeg'
        : 'DishTypeContainerVeg'
    return (
      <li key={updatedDetails.dishName}>
        <div className="DishCardContainer">
          <div className={dishtype}>
            <span className="DishTypeInner">
              {updatedDetails.dishType !== 2 ? 'V' : 'NV'}
            </span>
          </div>
          <div className="DishTextContainer">
            <h1 className="DishHeading">{updatedDetails.dishName}</h1>
            <div className="DishPricingContainer">
              <p className="DishPricingPara">
                {updatedDetails.dishCurrency} {updatedDetails.dishPrice}
              </p>
            </div>
            <p className="DishDescription">{updatedDetails.dishDescription}</p>
            {updatedDetails.dishAvailability && (
              <div className="DishCustomContainer">
                <button className="DishCustomButton" onClick={ondecrement}>
                  -
                </button>
                <p className="DishQuantity">{quantity}</p>
                <button className="DishCustomButton" onClick={onincrement}>
                  +
                </button>
              </div>
            )}
            {updatedDetails.addonLength > 0 && (
              <p className="DishAvailable">Customization Available</p>
            )}
            {updatedDetails.dishAvailability === false && (
              <p className="DishNotAvailable"> Not available </p>
            )}
          </div>
          <div className="DishCaloriesContainer">
            <p>
              {updatedDetails.dishCalories}
              Calories
            </p>
          </div>
          <img
            className="DishImage"
            alt="dishImage"
            src={updatedDetails.dishImage}
          />
        </div>
      </li>
    )
  }
}

export default DishCard
