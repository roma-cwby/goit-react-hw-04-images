import { useEffect, useRef } from 'react';

export const Modal = ({ closeModal, children }) => {
  const overlay = useRef();

  const closeClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  const closeEsc = e => {
    if (e.code === 'Escape') closeModal();
  };

  useEffect(() => {
    overlay.current.addEventListener('click', closeClick);
    window.addEventListener('keydown', closeEsc);

    return () => {
      window.removeEventListener('keydown', closeEsc);
    };
  }, [closeClick, closeEsc]);

  return (
    <div ref={overlay} className="Overlay">
      <div className="Modal">{children}</div>
    </div>
  );
};
