import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class MainModal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
            || nextProps.children !== this.props.children
    }

    render() {

        let successButton = <Button variant="primary" onClick={this.props.success}>Continue</Button>
        if(this.props.success === undefined || this.props.success === null){
            successButton = null;
        }

        return (
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.closed} centered>
                    <Modal.Body>{this.props.children}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closed}>Close</Button>
                        {successButton}
                    </Modal.Footer>
                </Modal>
            </React.Fragment >
        )
    }
}

export default MainModal;