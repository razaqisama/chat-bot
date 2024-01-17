"use client";

import Modal from "@/components/shared/Modal";
import { useCallback, useState } from "react";

function ModalButton() {
  const [show, setShow] = useState<boolean>(false);

  const handleShowModal = useCallback(
    (value: boolean) => () => {
      setShow(value);
    },
    [],
  );

  return (
    <div>
      <button type="button" onClick={handleShowModal(true)}>
        SHOW MODAL
      </button>
      <Modal show={show} onClose={handleShowModal(false)}>
        <div>HEHEHE</div>
      </Modal>
    </div>
  );
}

export default ModalButton;
