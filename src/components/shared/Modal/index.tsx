"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const blurIn = {
  hidden: {
    backdropFilter: "blur(2px) opacity(0)",
  },
  visible: {
    backdropFilter: "blur(2px) opacity(1)",
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    backdropFilter: "blur(2px) opacity(0)",
  },
};

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ show, onClose, children }: ModalProps) {
  const handleClickBackdrop = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClose();
    },
    [onClose],
  );

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {show && (
        <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen z-20">
          <motion.div
            variants={blurIn}
            onClick={handleClickBackdrop}
            className="fixed w-[100dvw] h-[100dvh] top-0 left-0 flex justify-center items-center bg-opacity-40"
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div
            variants={dropIn}
            className="z-30"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default Modal;
