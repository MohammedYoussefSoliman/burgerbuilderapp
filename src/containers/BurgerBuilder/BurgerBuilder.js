import React, { useState, useEffect, useCallback } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {addIngredient, removeIngredient, fetchIntialIngredients, purchasedBurger, authRedirect} from '../../store/actions/index';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Ordersummery from '../../components/Burger/ordersummery/Ordersummery'
import Modal from '../../components/UI/modal/Modal'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order';

const BurgerBuilder = props=> {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch(),

    onIngredientAdded = (name) => dispatch(addIngredient(name)),
    onIngredientRemoved = (name) => dispatch(removeIngredient(name)),
    onInitIngredients = useCallback(() => dispatch(fetchIntialIngredients()), []),
    onInitpurchase = () => dispatch(purchasedBurger()),
    onSetAuthRedirectPath = path => dispatch(authRedirect(path));

    const ings = useSelector(state => state.burgerReducer.ingredients);
    const price = useSelector(state => state.burgerReducer.intialPrice);
    const loading = useSelector(state => state.burgerReducer.loading);
    const error = useSelector(state => state.burgerReducer.error);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);


    useEffect(()=>{
        onInitIngredients()
    },[onInitIngredients])

    const purchasinghandler = () => {
        if(isAuthenticated) {
            setPurchasing(true)
        }else{
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }
    const purchasingclosinghandler = () => {
        setPurchasing(false)
    }

    const purchasingPasshandle = () => {
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
       onInitpurchase()
        props.history.push({
            pathname: '/checkout'
        })
    }

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


    const disabledInfo = {...ings}
    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if(error) {

    return <p>Error: {error.message}</p>

    }else{
                    
        return (
            <>
                {!ings &&  <Spinner />}

                {ings &&
                <> 
                    <Modal show={purchasing} close={purchasingclosinghandler}>
                        {loading && <Spinner />}
                        {!loading && <Ordersummery ingredients={ings} pass={purchasingPasshandle} close={purchasingclosinghandler} price={price}/>}
                    </Modal>

                    <Burger ingredients={ings} />
                    <BuildControls Addings={onIngredientAdded} deductings={onIngredientRemoved} disabled={disabledInfo} price={price} purchasable={updatePurechasHandle(ings)} purchasing={purchasinghandler} isAuth={isAuthenticated}/>
                </>
                }
            </>
        )
    }
}

export default (withErrorHandler(BurgerBuilder, axios))
