import React , { useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import FormUser from './FormUser'
const AddAccount = () => {

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
      setVisible(false);
      // console.log("closed");
    };


  return (
    <div className='Add-compte'>
        <Button auto ghost color="primary" onPress={handler}>
        Ajouter Compte
        </Button>
      <Modal
        closeButton
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            
            <Text b size={20}>
              Ajouter un Compte
            </Text>
            <hr/>
            <FormUser/>
            
          </Text>
        </Modal.Header>
        <Modal.Body>
        
          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Annuler
          </Button>
          <Button auto onPress={closeHandler} >
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddAccount