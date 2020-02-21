import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Food extends Component {

    state = {
        food: "",
        brand: "",
        servings: "",
        calories: "",
        fat: "",
        sodium: "",
        sugar: "",
        cholesterol: "",
        carbs: ""
    }


    async componentDidMount() {
        const item = await (await fetch(`/api/v1/search/${this.props.match.params.query}`)).json()
        console.log(this.props.match.params.query)
        console.log(item)
        this.setState({
            food: item.foods[0].food_name,
            brand: item.foods[0].brand_name,
            servings: item.foods[0].serving_qty,
            calories: item.foods[0].nf_calories,
            fat: item.foods[0].nf_total_fat,
            sodium: item.foods[0].nf_sodium,
            sugar: item.foods[0].nf_sugars,
            cholesterol: item.foods[0].nf_cholesterol,
            carbs: item.foods[0].nf_total_carbohydrate
        })
    }

    render(){
        return(
            <div>
                this is the query page<br/>
                {/* {this.props.match.params.query} */}
                {this.state.food}<br/>
                Brand: {this.state.brand}<br/>
                Servings: {this.state.servings}<br/>
                Calories: {this.state.calories}<br/>
                Total Fat: {this.state.fat}<br/>
                Sodium: {this.state.sodium}<br/>
                Sugar: {this.state.sugar}<br/>
                Cholesterol: {this.state.cholesterol}<br/>
                Total Carbs: {this.state.carbs}<br/>
            </div>
        )
    }
}

export default withRouter(Food)