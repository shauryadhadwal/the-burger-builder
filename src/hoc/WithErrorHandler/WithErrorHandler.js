import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { statement } from '@babel/template';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends React.Component {
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null })
            });
            axios.interceptors.response.use(null, error => {
                this.setState({ error: error })
            });
        }

        closeModalClicked = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error ? true : false} closed={this.closeModalClicked}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler;