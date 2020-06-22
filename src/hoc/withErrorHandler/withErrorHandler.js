import React, { Component } from 'react'

import Modal from '../../components/UI/modal/Modal'

const styles = {

    color: '#f00',
    fontWieght: 'bold'
}

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        confirmedErrorHandler = () => {
            this.setState({error: null})
        }

        componentWillMount() {
            this.reqInt = axios.interceptors.request.use( req => {
                this.setState({error: null})
                return req
            });
            this.resInt = axios.interceptors.response.use(res => res, error => {
                this.setState({error})
            });
        }

        componentWillUnmount() {
            console.log('unmounted', this.reqInt, this.resInt)
            axios.interceptors.request.eject(this.reqInt);
            axios.interceptors.response.eject(this.resInt);
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} close={this.confirmedErrorHandler}>
                        <div style={styles}>
                            {this.state.error ? this.state.error.message : null}
                        </div>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </>
            )
        }
    }

}

export default withErrorHandler
