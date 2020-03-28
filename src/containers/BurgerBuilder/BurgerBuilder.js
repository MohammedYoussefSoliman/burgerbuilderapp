import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Ordersummery from '../../components/Burger/ordersummery/Ordersummery'
import Modal from '../../components/UI/modal/Modal'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order';


const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.7,
    meat: 1.5,
}

export class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        intialPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://react-burger-28285.firebaseio.com/ingredients.json').then(ings=>{
            console.log(ings)
            this.setState({ingredients:ings.data})
        }).catch(error => {this.setState({error})})
    }

    purchasinghandler = () => {
        this.setState({purchasing: true})
    }
    purchasingclosinghandler = () => {
        this.setState({purchasing: false})
    }

    purchasingPasshandle = () => {

        this.setState({loading: true})

        const order = {
            ingredients: this.state.ingredients,
            proce: this.state.initialPrice,
            costumer: {
                name: 'Mohammed Soliman',
                address: {
                    street: '8 Shafeek Ghaly',
                    zipCode: '12617',
                    country: 'Egypt'
                },
                email: 'soliman@mo.com'
            },
            deleviryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(res => {
            this.setState({loading: false, purchasing: false})
        })
        .catch(err => {
            this.setState({loading: false, purchasing: false})
            console.log(err)})
    }


    render() {

        const updatePurechasHandle = (ingredients) => {
            const sum = Object.keys(ingredients).map( ins =>{
                return ingredients[ins]
            }).reduce((sum,el)=>{
                return sum+el
            },0);

            this.setState({purchasable: sum > 0})
        }
        
        const addIngredientHandler = (type)=>{
            const oldCount = this.state.ingredients[type]
            const newCount = oldCount+1;
            let UpdatedIngs = {...this.state.ingredients}
            UpdatedIngs[type] = newCount;
            //Updating price as will
            const {intialPrice} = this.state;
            let updatedPrice = intialPrice + INGREDIENT_PRICES[type];
            this.setState({ingredients: UpdatedIngs, intialPrice: updatedPrice});
            updatePurechasHandle(UpdatedIngs)
        }

        const removeIngredientHandler = (type)=> {
            const oldCount = this.state.ingredients[type]
            const newCount = oldCount-1;
            let UpdatedIngs = {...this.state.ingredients}
            UpdatedIngs[type] = newCount;
            //Updating price as will
            const {intialPrice} = this.state;
            let updatedPrice = INGREDIENT_PRICES[type] - intialPrice;
            this.setState({ingredients: UpdatedIngs, intialPrice: updatedPrice})
            updatePurechasHandle(UpdatedIngs)
        }



        console.log(this.state.intialPrice)

        const disabledInfo = {...this.state.ingredients}
            for(let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }

            if(this.state.error) {

            return <p>Error: {this.state.error.message}</p>

            }else{
                
                return (
                    <>
                        {!this.state.ingredients &&  <Spinner />}
        
                        {this.state.ingredients &&
                        <> 
                            <Modal show={this.state.purchasing} close={this.purchasingclosinghandler}>
                                {this.state.loading && <Spinner />}
                                {!this.state.loading && <Ordersummery ingredients={this.state.ingredients} pass={this.purchasingPasshandle} close={this.purchasingclosinghandler} price={this.state.intialPrice}/>}
                            </Modal>
        
                            <Burger ingredients={this.state.ingredients} />
                            <BuildControls Addings={addIngredientHandler} deductings={removeIngredientHandler} disabled={disabledInfo} price={this.state.intialPrice} purchasable={this.state.purchasable} purchasing={this.purchasinghandler}/>
                        </>
                        }
                    </>
                )
            }
    }
}

export default withErrorHandler(BurgerBuilder, axios)
