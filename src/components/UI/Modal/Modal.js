import React, { } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const mainModal = (props) => {

    let successButton = <Button variant="primary" onClick={props.success}>Continue</Button>
    if (props.success === undefined || props.success === null) {
        successButton = null;
    }

    return (
        <React.Fragment>
            <Modal show={props.show} onHide={props.closed} centered>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closed}>Close</Button>
                    {successButton}
                </Modal.Footer>
            </Modal>
        </React.Fragment >
    )
}

export default React.memo(mainModal, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show
            && prevProps.children === nextProps.children
});