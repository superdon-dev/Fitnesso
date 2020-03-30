import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import './Modal.css';
function ModalForm(props) {
    return (
        <Modal show={props.show} onHide={props.handleToggle} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          {props.content ? <Modal.Body>{props.content}</Modal.Body> : null}
          <Modal.Footer>
            <Button className="btn btn-block btn-warning text-white mb-2" onClick={props.handleToggle}>
              <i className="fas fa-reply mr-2"></i>
              Back
            </Button>
            <Button className="btn btn-block btn-danger mb-2" onClick={props.handleDelete}>
                <i className="fas fa-trash-alt mr-2"></i>
                Delete
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default ModalForm
