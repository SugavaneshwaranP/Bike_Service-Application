// src/components/ConfirmActionModal.jsx

import React from "react";

function ConfirmActionModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <p>{message}</p>
        <div>
          <button onClick={onConfirm}>✅ Yes</button>
          <button onClick={onCancel}>❌ No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;
