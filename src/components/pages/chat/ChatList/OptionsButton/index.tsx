"use client";

import Modal from "@/components/shared/Modal";
import {
  ArrowPathIcon,
  RectStackIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@/icons";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import FeedbackForm, { FeedbackType } from "./FeedbackForm";

interface OptionsButtonProps {
  messageId: string;
  copyText?: string;
  ratingStatus: number | null | undefined;
}

function OptionsButton({
  messageId,
  ratingStatus,
  copyText,
}: OptionsButtonProps) {
  const [rating, setRating] = useState(ratingStatus);

  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [modalFeedbackType, setModalFeedbackType] =
    useState<FeedbackType>("like");

  const handleShowFeedbackModal = useCallback(
    (value: boolean, type?: FeedbackType) => () => {
      if (type) {
        setModalFeedbackType(type);
      }
      setShowFeedbackModal(value);
    },
    [],
  );

  const handleCopyText = useCallback(() => {
    if (copyText) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          toast.info("Text copied to clipboard");
        })
        .catch(() => {
          toast.error("Failed to copy text: ");
        });
    }
  }, [copyText]);

  const handleFormSubmitted = useCallback((value: number) => {
    setRating(value);
  }, []);

  return (
    <div className="pt-2 flex justify-end gap-2">
      <button type="button">
        <ArrowPathIcon className="w-4 h-4" />
      </button>
      {copyText && (
        <button type="button" onClick={handleCopyText}>
          <RectStackIcon className="w-4 h-4" />
        </button>
      )}
      <button
        type="button"
        disabled={!!rating}
        className={`${rating === 1 ? "text-[#979CFF]" : "currentColor"}`}
        onClick={handleShowFeedbackModal(true, "like")}
      >
        <ThumbsUpIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        className={`${rating === -1 ? "text-[#FFC267]" : "currentColor"}`}
        disabled={!!rating}
        onClick={handleShowFeedbackModal(true, "dislike")}
      >
        <ThumbsDownIcon className="w-4 h-4" />
      </button>
      <Modal show={showFeedbackModal} onClose={handleShowFeedbackModal(false)}>
        <FeedbackForm
          id={messageId}
          type={modalFeedbackType}
          onClose={handleShowFeedbackModal(false)}
          onFormSubmitted={handleFormSubmitted}
        />
      </Modal>
    </div>
  );
}

export default OptionsButton;
