import "./VideoModal.css";

const VideoModal = ({ handleCloseModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <iframe
          src="https://www.youtube.com/embed/MwYawqnHavI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className="btn-x-container">
          <button className="close-button" onClick={handleCloseModal}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
