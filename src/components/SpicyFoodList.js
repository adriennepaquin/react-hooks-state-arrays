import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All")

  const foodsToDisplay = foods.filter((food) => {
    //foodsToDisplay will be an array of all foods OR filtered foods
    if (filterBy === "All") {
      return true
    } else {
      return food.cuisine === filterBy
    }
  })

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ))

  function handleFilterChange(e){
    setFilterBy(e.target.value)
  }

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray);
  }
  
  function handleLiClick(id) {
    // to remove an element when clicked
    // const newFoodArray = foods.filter((food) => food.id !== id)
    // setFoods(newFoodArray)
    // to increase heat when element is clicked
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1
        }
      } else {
        return food
      }
    })
    setFoods(newFoodArray)
  }

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select><br></br>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
