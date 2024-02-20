function closeWithEsc(evt, item) {
    evt.key === "Escape" ? closeModal(item) : "";
}

function closeWithOverlay(evt, item) {
    item === evt.target ? closeModal(item) : "";
}

function openModal(item, closeWithEsc, closeWithOverlay) {
    item.classList.add("popup_is-opened");
    item.classList.remove("popup_is-animated");

    const listenerEsc = (evt) => closeWithEsc(evt, item);
    document.addEventListener("keydown", listenerEsc);

    const listenerOverlay = (evt) => closeWithOverlay(evt, item);
    item.addEventListener("click", listenerOverlay);
}

function handleOpenImage(imageElementPopup, name, link) {
    const popupImage = imageElementPopup.querySelector(".popup__image");
    const popupClose = imageElementPopup.querySelector(".popup__close");

    popupImage.src = link;
    popupImage.alt = name;
    imageElementPopup.querySelector(".popup__caption").textContent = name;

    openModal(imageElementPopup, closeWithEsc, closeWithOverlay);
    popupClose.addEventListener("click", () => closeModal(imageElementPopup, closeWithEsc, closeWithOverlay));
}

function closeModal(item, closeWithEsc, closeWithOverlay) {
    item.classList.remove("popup_is-opened");
    item.classList.add("popup_is-animated");

    const listenerEsc = (evt) => closeWithEsc(evt, item);
    document.removeEventListener("keydown", listenerEsc);

    const listenerOverlay = (evt) => closeWithOverlay(evt, item);
    item.removeEventListener("click", listenerOverlay);
}

function addCurrentData(profileTitle, profileDescription, nameInput, jobInput) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleFormSubmit(evt, popupEditProfile, profileTitle, profileDescription) {
    evt.preventDefault();

    const jobInput = evt.target.elements.name.value;
    const nameInput = evt.target.elements.description.value;

    profileTitle.textContent = jobInput;
    profileDescription.textContent = nameInput;

    closeModal(popupEditProfile);
}

export { openModal, closeModal, closeWithEsc, closeWithOverlay, addCurrentData, handleFormSubmit, handleOpenImage };
