import { useState, useEffect } from "react";
import { SearchbarHeader } from "../Searchbar/Searchbar";
import { fetchArticlesWithQuery } from '../Api/Api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from "../Button/Button";
import { ModalWindow } from "../Modal/Modal";
import { Gallery } from "./ImageGallery.styled";
import { Spinner } from '../Loader/Loader';
import PropTypes from 'prop-types';


export const ImageGallery = () => {
    const [name, setName] = useState('');
    const [img, setImg] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const handleChange = name => {
        setName(name);
        setPage(1);
        setImg([]);
        setSpinner(true);
      }; 

    useEffect(() => {
        if (name === '') {
            return;
        };
        addMoreImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, page]);

    const addMoreImage = async () => {
        setSpinner(true);
        setButtonLoader(false);
        
        await fetchArticlesWithQuery(name, page).then(response => {
            try {
                setTotalHits(response.data.totalHits);
                setImg([...img, ...response.data.hits]);
                setSpinner(false);
                setButtonLoader(true);
            }
           catch {
                console.log('Error');
           }
        }); 
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const getLinkImage = (e) => {
        setModalImage(e.target.dataset.large);
    };

    const toggleModal = (e) => {
        setShowModal(!showModal);
    };
    
    const dataImage = {img, totalHits};
    
    return (
        <>
        <SearchbarHeader onSubmit={handleChange}/>

        <Gallery>
            <ImageGalleryItem dataImg={img} linkImage={getLinkImage} onClick={toggleModal}/>
         </Gallery>

        {buttonLoader && <Button onClick={nextPage} dataState={dataImage}/>}
        {spinner && <Spinner/>} 
        {<Spinner/> && !<Button onClick={nextPage} dataState={dataImage}/>}
        
        
        {showModal && <ModalWindow onClose={toggleModal}>
            {modalImage}
        </ModalWindow>}
        
        </>
    ); 
};

ImageGallery.propTypes = {
    name: PropTypes.string,
    img: PropTypes.array,
    totalHits: PropTypes.number,
    page: PropTypes.number,
    showModal: PropTypes.bool,
    buttonLoader: PropTypes.bool,
    spinner: PropTypes.bool,
    modalImage: PropTypes.string,
};

