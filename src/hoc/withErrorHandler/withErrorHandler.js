import React  from 'react'

import useHttpErrorHandler from '../../hooks/http-error-handler'
import Modal from '../../components/UI/modal/Modal';

const styles = {

    color: '#f00',
    fontWieght: 'bold'
}

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

        const [error, confirmedErrorHandler] = useHttpErrorHandler(axios);
        
            return (
                <>
                    <Modal show={error} close={confirmedErrorHandler}>
                        <div style={styles}>
                            {error ? error.message : null}
                        </div>
                    </Modal>
                    <WrappedComponent {...props}/>
                </>
            )
    }

}

export default withErrorHandler
