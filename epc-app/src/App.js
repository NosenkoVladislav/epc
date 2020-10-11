import React, { useState, useEffect } from "react";
import ApiService from "./services/apiService";
import { ListGroup } from "react-bootstrap";
import "./App.scss";
import UserItem from "./components/user-item/user-item";
import InfoModal from "./components/modal/modal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const App = () => {
  const [users, setUsers] = useState([]);
  const [modalState, setModalState] = useState(null);
  const usersApi = new ApiService();

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () =>
    usersApi.getAllUsers().then((data) => {
      setUsers(data);
    });

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    const selectedUser = users[source.index];
    users.splice(source.index, 1);
    users.splice(destination.index, 0, selectedUser);
    setUsers(users);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ListGroup
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {users.map((user, index) => (
                <UserItem
                  key={user.login.uuid}
                  user={user}
                  isModalOpen={modalState}
                  setModalShow={setModalState}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
      {modalState ? (
        <InfoModal
          user={modalState}
          hideModal={setModalState}
          setUsers={setUsers}
          handleData={handleData}
        />
      ) : null}
    </div>
  );
};

export default App;
