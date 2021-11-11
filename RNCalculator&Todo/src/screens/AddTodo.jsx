import axios from "axios";
import { Button, Modal, FormControl, Input, Alert } from "native-base";
import React, { useState } from "react";

export default function AddTodo(props) {
  const url = "http://192.168.1.23:4000/api/v1/";
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    try {
      const data = {
        title,
      };

      const response = await axios.post(`${url}/todo`, data);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const onPressButton = () => {
    handleSubmit();
    setShowModal(false);
  };
  return (
    <>
      <Button
        bg="primary.700"
        onPress={() => setShowModal(true)}
        style={{ width: 90, backgroundColor: "#3F0713" }}
      >
        Add Todo
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" style={{ backgroundColor: "#F1D1D0" }}>
          <Modal.Header>Add Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input
                value={title}
                autoFocus={true}
                onChangeText={(nextValue) => setTitle(nextValue)}
                style={{ backgroundColor: "#fff" }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#F1D1D0" }}>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                color="#3F0713"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={onPressButton} style={{ backgroundColor: "#3F0713" }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
