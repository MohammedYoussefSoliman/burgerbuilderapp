import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addIngredient, removeIngredient, fetchIntialIngredients, purchasedBurger} from '../../store/actions/index';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Ordersummery from '../../components/Burger/ordersummery/Ordersummery'
import Modal from '../../components/UI/modal/Modal'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order';

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
        this.props.onInitIngredients()

    }

    purchasinghandler = () => {
        this.setState({purchasing: true})
    }
    purchasingclosinghandler = () => {
        this.setState({purchasing: false})
    }

    purchasingPasshandle = () => {
        /*
        const queryParams = [];
        const ings = {...this.state.ingredients}
        queryParams.push(encodeURIComponent('price') +'='+ encodeURIComponent(this.state.intialPrice))
        // queryParams = ['price=4']
        for(let p in ings) {
            queryParams.push(encodeURIComponent(p) +'='+ encodeURIComponent(ings[p]))
            // queryParams = ['price=4', 'becon=2', 'cheese=1', 'meat=2', 'salad=4']
        }
        const queryString = queryParams.join('&')
        // queryString = 'price=4&becon=2&cheese=1&meat=2&salad=4'
        */
       this.props.onInitpurchase()
        this.props.history.push({
            pathname: '/checkout'
        })
    }


    render() {

        const updatePurechasHandle = (ingredients) => {
            const sum = Object.keys(ingredients).map( ins =>{
                return ingredients[ins]
            }).reduce((sum,el)=>{
                return sum+el
            },0);

            return sum > 0
        }
        
        // const addIngredientHandler = (type)=>{
        //     const oldCount = this.state.ingredients[type]
        //     const newCount = oldCount+1;
        //     let UpdatedIngs = {...this.state.ingredients}
        //     UpdatedIngs[type] = newCount;
        //     //Updating price as will
        //     const {intialPrice} = this.state;
        //     let updatedPrice = intialPrice + INGREDIENT_PRICES[type];
        //     this.setState({ingredients: UpdatedIngs, intialPrice: updatedPrice});
        //     updatePurechasHandle(UpdatedIngs)
        // }

        // const removeIngredientHandler = (type)=> {
        //     const oldCount = this.state.ingredients[type]
        //     const newCount = oldCount-1;
        //     let UpdatedIngs = {...this.state.ingredients}
        //     UpdatedIngs[type] = newCount;
        //     //Updating price as will
        //     const {intialPrice} = this.state;
        //     let updatedPrice = INGREDIENT_PRICES[type] - intialPrice;
        //     this.setState({ingredients: UpdatedIngs, intialPrice: updatedPrice})
        //     updatePurechasHandle(UpdatedIngs)
        // }




        const disabledInfo = {...this.props.ings}
            for(let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }

            if(this.state.error) {

            return <p>Error: {this.state.error.message}</p>

            }else{
                            
                return (
                    <>
                        {!this.props.ings &&  <Spinner />}
        
                        {this.props.ings &&
                        <> 
                            <Modal show={this.state.purchasing} close={this.purchasingclosinghandler}>
                                {this.state.loading && <Spinner />}
                                {!this.state.loading && <Ordersummery ingredients={this.props.ings} pass={this.purchasingPasshandle} close={this.purchasingclosinghandler} price={this.props.price}/>}
                            </Modal>
        
                            <Burger ingredients={this.props.ings} />
                            <BuildControls Addings={this.props.onIngredientAdded} deductings={this.props.onIngredientRemoved} disabled={disabledInfo} price={this.props.price} purchasable={updatePurechasHandle(this.props.ings)} purchasing={this.purchasinghandler}/>
                        </>
                        }
                    </>
                )
            }
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.intialPrice,
        error: state.burgerReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(removeIngredient(name)),
        onInitIngredients: () => dispatch(fetchIntialIngredients()),
        onInitpurchase: () => dispatch(purchasedBurger())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
