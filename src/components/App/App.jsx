import { useState, useEffect } from 'react';
import { fetchImg } from 'api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Error } from 'components/Error/Error';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    async function onRequest() {
      if (request)
        try {
          setIsLoad(true);
          setError(false);
          setIsAll(false);
          const newImgs = await fetchImg(request, page);

          if (newImgs[0].length < 1) throw new Error();
          if (newImgs[1]) setIsAll(true);

          setImages(state => [...state, ...newImgs[0]]);
        } catch (error) {
          setError(true);
        } finally {
          setIsLoad(false);
        }
    }

    onRequest();
  }, [request, page]);

  const onRequest = e => {
    e.preventDefault();
    const input = e.target.elements[1].value;
    e.target.reset();
    if (request !== input) {
      setRequest(input);
      setPage(1);
      setImages([]);
    }
  };

  const onLoad = () => {
    setPage(state => state + 1);
  };

  const onModal = e => {
    const largeImg = images.filter(
      item => item.id === Number(e.target.closest('li').id)
    );

    setModalImg(largeImg[0].largeImageURL);
  };

  const closeModal = () => {
    setModalImg(null);
  };

  return (
    <>
      <Searchbar onSubmit={onRequest} />

      {modalImg && (
        <Modal img={modalImg} closeModal={closeModal}>
          {<img src={modalImg} alt="" />}
        </Modal>
      )}

      {images.length > 0 && <ImageGallery images={images} onClick={onModal} />}

      {isLoad && <Loader />}

      {error && !isAll && <Error message="Error" />}

      {isAll && <Error message="Is all" />}

      {images.length > 0 && !isLoad && !error && !isAll && (
        <Button text="Load more" click={onLoad} />
      )}
    </>
  );
};
