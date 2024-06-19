"use client";
import Modal from "@/components/Modal";
import { Button } from "@headlessui/react";
import { useState } from "react";

export default function ModalTest() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Open</Button>
      <Modal title={"Hola"} isModalOpen={open} setIsModalOpen={setOpen}>
        HI IM A MODAL
      </Modal>
    </>
  );
}
