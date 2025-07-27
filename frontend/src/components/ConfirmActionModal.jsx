// Importing React to use JSX
import React from "react";
// Importing Bootstrap styles for modal and buttons
import "bootstrap/dist/css/bootstrap.min.css";

// Functional component that displays a confirmation modal
// Props: message (text to show), onConfirm (callback when Yes clicked), onCancel (callback when No clicked)
function ConfirmActionModal({ message, onConfirm, onCancel }) {
  return (
    // Modal outer wrapper with Bootstrap classes
    <div
      className="modal fade show d-block" // 'show d-block' makes modal visible
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // Dark transparent background overlay
    >
      <div className="modal-dialog modal-dialog-centered"> {/* Centered modal box */}
        <div className="modal-content"> {/* Modal structure container */}
        
          {/* Header section of modal */}
          <div className="modal-header">
            <h5 className="modal-title">Confirmation</h5> {/* Modal title */}
          </div>

          {/* Body section where custom message is shown */}
          <div className="modal-body">
            <p>{message}</p> {/* Message passed from parent component */}
          </div>

          {/* Footer section with Yes and No buttons */}
          <div className="modal-footer">
            <button className="btn btn-success" onClick={onConfirm}>
               Yes {/* Calls the onConfirm function when clicked */}
            </button>
            <button className="btn btn-danger" onClick={onCancel}>
               No {/* Calls the onCancel function when clicked */}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Exporting the modal so it can be used in other components
export default ConfirmActionModal;
