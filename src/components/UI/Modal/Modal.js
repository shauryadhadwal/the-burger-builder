import React from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <React.Fragment>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    // <React.Fragment>
    //     <Backdrop show={props.show} closed={props.closed} />
    //     <div className={classes.Modal}
    //         style={{
    //             transform: props.show ? 'translate(0)' : 'translateY(-100vh)',
    //             opacity: props.show ? 1 : 0
    //         }}>
    //         {props.children}
    //     </div>
    // </React.Fragment>
);

export default modal;