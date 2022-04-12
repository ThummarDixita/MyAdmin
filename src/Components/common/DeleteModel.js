import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ModalBody, ModalFooter } from "reactstrap";

const DeleteModal = props => {
    console.log("props", props);
    return (
        <>
            <Modal show={props.showDeleteModal} onHide={props.onHide} style={{ opacity: 1 }} dialogclassNameName="my-dialog">
                <div className="modal-content">
                    <div className="modal-header flex-column">
                        <div className="modal-title w-100">{props.title ? props.title : 'Are you sure?'}</div>
                    </div>

                    <ModalBody className="modal-body">
                        {(props.message) ? (
                            <p>{props.message}</p>
                        ) : (
                            <p>Do you really want to delete this record? This process cannot be undone.</p>
                        )}
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <Button type="button" color="secondary" data-dismiss="modal" onClick={props.clickedNo}>No</Button>
                        <Button type="button" color="primary" onClick={props.clickedYes}>Yes</Button>
                    </ModalFooter>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModal;