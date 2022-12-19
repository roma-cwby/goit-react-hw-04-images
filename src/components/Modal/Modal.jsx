import { useRef, useEffect } from 'react';

export const Modal = ({ closeModal, children }) => {
  const overlay = useRef();

  const closeClick = e => {
    if (e.target === e.currentTarget) close();
  };

  const closeEsc = e => {
    if (e.code === 'Escape') close();
  };

  const close = () => {
    overlay.current.removeEventListener('click', closeClick);
    window.removeEventListener('keydown', closeEsc);
    closeModal();
  };

  useEffect(() => {
    overlay.current.addEventListener('click', closeClick);
    window.addEventListener('keydown', closeEsc);
  }, []);

  return (
    <div ref={overlay} className="Overlay">
      <div className="Modal">{children}</div>
    </div>
  );
};
