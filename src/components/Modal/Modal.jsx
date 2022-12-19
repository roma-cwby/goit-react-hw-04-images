import { useEffect, useRef } from 'react';

export const Modal = ({ closeModal }) => {
  const overlay = useRef();

  useEffect(() => {
    overlay.addEventListener('click', closeClick);
    window.addEventListener('keydown', closeEsc);

    return () => {
      overlay.removeEventListener('click', closeClick);
      window.removeEventListener('keydown', closeEsc);
    };
  }, []);

  const closeClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  const closeEsc = e => {
    if (e.code === 'Escape') closeModal();
  };

  return (
    <div ref={overlay} className="Overlay">
      <div className="Modal">{this.props.children}</div>
    </div>
  );
};
