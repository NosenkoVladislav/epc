import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

const UserItem = ({ user, setModalShow, index }) => {
  const { name, location } = user;
  return (
    <Draggable draggableId={user.login.uuid} index={index}>
      {(provided, snapshot) => (
        <ListGroupItem
          className={`list-item ${snapshot.isDragging ? "dragging" : ""}`}
          onClick={() => {
            setModalShow(user);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="item-info">
            <div className="item-info__block">
              {`${name.first} ${name.last} `}
            </div>
            <div className="item-info__block __sm">{location.country}</div>
          </div>
        </ListGroupItem>
      )}
    </Draggable>
  );
};

export default UserItem;
