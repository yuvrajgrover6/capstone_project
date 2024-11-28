// src/components/ConfirmationPopup.tsx
import React from "react";

interface ConfirmationPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  message,
  onConfirm,
  onCancel,
}) => (
  <div className="confirmation-popup bg-white p-4 shadow rounded-lg">
    <p className="text-lg">{message}</p>
    <div className="flex justify-end space-x-4 mt-4">
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Confirm
      </button>
    </div>
  </div>
);
