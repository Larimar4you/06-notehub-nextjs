"use client";

import { useEffect, type ReactNode, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeClick);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
