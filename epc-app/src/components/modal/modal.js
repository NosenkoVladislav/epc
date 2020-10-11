import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import ModalInput from "./modal-input";
import ApiService from "../../services/apiService";
import Btn from "../btn/btn";

const InfoModal = ({ hideModal, user, handleData }) => {
  const [userData, setData] = useState({
    firstName: user.name.first,
    lastName: user.name.last,
    phone: user.phone,
    email: user.email,
    country: user.location.country,
    username: user.login.username,
    password: user.login.password,
  });

  const {
    firstName,
    lastName,
    phone,
    email,
    country,
    username,
    password,
  } = userData;
  const usersApi = new ApiService();

  const [confirmModal, setConfirmModal] = useState(false);

  const onInputChange = (name, { target }) =>
    setData((state) => ({ ...state, [name]: target.value }));

  const handleSave = async () => {
    await usersApi.editUser(userData, user.login.uuid);
    await handleData();
    hideModal(null);
  };

  const handleDelete = async () => {
    await usersApi.deleteUser(user.login.uuid);
    await handleData();
    setConfirmModal(false);
    hideModal(null);
  };

  return (
    <Fragment>
      {confirmModal ? (
        <Modal
          onHide={() => setConfirmModal(false)}
          className="confirm-modal"
          show={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-text">
              Are you sure you want to delete user?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="modal-button-group">
              <Btn
                type={"secondary"}
                handler={setConfirmModal}
                handleValue={false}
                child={"No"}
              />
              <Btn
                type={"danger"}
                handler={handleDelete}
                handleValue={null}
                child={"Yes"}
              />
            </div>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={!!user}
          onHide={() => hideModal(null)}
          className="user-info-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-section modal-section__image">
              <img src={user.picture.large} alt="" />
            </div>
            <div className="modal-section modal-section__top">
              <ModalInput
                name={"firstName"}
                value={firstName}
                onInputChange={onInputChange}
              />
              <ModalInput
                name={"lastName"}
                value={lastName}
                onInputChange={onInputChange}
              />
              <ModalInput
                name={"phone"}
                value={phone}
                onInputChange={onInputChange}
              />
              <ModalInput
                name={"country"}
                value={country}
                onInputChange={onInputChange}
              />
            </div>
            <div className="modal-section">
              <ModalInput
                name={"email"}
                value={email}
                onInputChange={onInputChange}
              />
              <ModalInput
                name={"username"}
                value={username}
                onInputChange={onInputChange}
              />
              <ModalInput
                name={"password"}
                value={password}
                onInputChange={onInputChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="modal-button-group">
              <Btn
                type={"danger"}
                handler={setConfirmModal}
                handleValue={true}
                child={"Delete"}
              />
            </div>
            <div className="modal-button-group">
              <Btn
                type={"secondary"}
                handler={hideModal}
                handleValue={null}
                child={"Close"}
              />
              <Btn
                type={"primary"}
                handler={handleSave}
                handleValue={null}
                child={"Save Changes"}
              />
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </Fragment>
  );
};

InfoModal.propTypes = {
  user: PropTypes.object,
  hideModal: PropTypes.func,
  handleData: PropTypes.func,
};

InfoModal.defaultProps = {
  user: null,
};

export default InfoModal;
