// src/components/ConfirmActionModal.jsx

import React from "react";
 // optional external CSS file

function ConfirmActionModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-modal-overlay" role="dialog" aria-modal="true">
      <div className="confirm-modal-content">
        <h3>Confirmation</h3>
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <button className="btn-confirm" onClick={onConfirm}>
            ✅ Yes
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            ❌ No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;
