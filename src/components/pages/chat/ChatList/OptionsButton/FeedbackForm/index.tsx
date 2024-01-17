"use client";

import { createMessageFeedback } from "@/lib/chat/createMessageFeedback";
import { ThumbsDownIcon, ThumbsUpIcon, XMarkIcon } from "@/icons";
import { FormEvent, useCallback } from "react";

export type FeedbackType = "like" | "dislike";

interface FeedbackFormProps {
  id: string;
  type: FeedbackType;
  onClose: () => void;
  onFormSubmitted: (value: number) => void;
}

function FeedbackForm({
  id,
  type,
  onClose,
  onFormSubmitted,
}: FeedbackFormProps) {
  const handleSubmitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const feedback = (e.target as HTMLFormElement).elements.namedItem(
        "form-feedback",
      ) as HTMLInputElement;

      const { data } = await createMessageFeedback({
        id,
        ratingStatus: type === "like" ? 1 : -1,
        feedback: feedback.value,
      });

      if (data?.ratingStatus) {
        onFormSubmitted(data.ratingStatus);
      }

      onClose();
    },
    [id, onClose, onFormSubmitted, type],
  );

  return (
    <div className="card w-96 bg-base-100 shadow-xl border-[1px]">
      <div className="card-body gap-4">
        <div className="card-title justify-between">
          <h3>Rating</h3>
          <button type="button" onClick={onClose}>
            <XMarkIcon />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div
            className={`w-12 h-12 rounded-full p-2 ${
              type === "like" ? "bg-[#F0F1FF]" : "bg-[#FFF6E9]"
            }`}
          >
            {type === "like" ? (
              <ThumbsUpIcon className="w-full h-full" color="#979CFF" />
            ) : (
              <ThumbsDownIcon className="w-full h-full" color="#FFC267" />
            )}
          </div>
        </div>
        <div>
          <h3 className="text-center font-bold">
            Kamu {type === "dislike" && "tidak"} menyukai balasan AI
          </h3>
          <h4 className="text-center">
            Ceritakan pengalaman tentang balasan chat ini
          </h4>
        </div>
        <form onSubmit={handleSubmitForm}>
          <textarea
            name="form-feedback"
            placeholder="Berikan tanggapanmu..."
            className="input input-bordered w-full h-20 p-2"
          />
          <button type="submit" className="btn rounded-full w-full">
            KIRIM
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
