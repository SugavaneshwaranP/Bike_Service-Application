import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ConfirmActionModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmation</h5>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={onConfirm}>
              ✅ Yes
            </button>
            <button className="btn btn-danger" onClick={onCancel}>
              ❌ No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;
