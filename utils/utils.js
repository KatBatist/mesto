const handleClosePopup = (e) => {
    if (e.key === 'Escape') { 
        closePopup(document.querySelector('.popup_opened'));
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopup);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopup);
}