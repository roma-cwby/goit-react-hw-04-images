export const Modal = ({ closeModal, children }) => {
  const closeClick = e => {
    if (e.target === e.currentTarget) close();
  };

  const closeEsc = e => {
    if (e.code === 'Escape') close();
  };

  const close = () => {
    window.removeEventListener('keydown', closeEsc);
    closeModal();
  };

  window.addEventListener('keydown', closeEsc);

  return (
    <div onClick={closeClick} className="Overlay">
      <div className="Modal">{children}</div>
    </div>
  );
};
