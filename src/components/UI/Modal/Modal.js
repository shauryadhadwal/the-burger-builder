import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class MainModal extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.closed}>
                    <Modal.Body>{this.props.children}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.props.success}>Continue</Button>
                        <Button variant="danger" onClick={this.props.closed}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment >
        )
    }
}

export default MainModal;