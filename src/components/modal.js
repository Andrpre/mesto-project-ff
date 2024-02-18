function closeWithEsc(evt, item) {
    evt.key === "Escape" ? closeModal(item) : "";
}

function closeWithOverlay(evt, item) {
    item === evt.target ? (item.style.display = "none") : "";
}

function openModal(item, closeWithEsc, closeWithOverlay) {
    item.style.display = "flex";

    const listenerEsc = (evt) => closeWithEsc(evt, item);
    document.addEventListener("keydown", listenerEsc);

    const listenerOverlay = (evt) => closeWithOverlay(evt, item);
    item.addEventListener("click", listenerOverlay);
}

function closeModal(item, closeWithEsc, closeWithOverlay) {
    item.style.display = "none";

    const listenerEsc = (evt) => closeWithEsc(evt, item);
    document.removeEventListener("keydown", listenerEsc);

    const listenerOverlay = (evt) => closeWithOverlay(evt, item);
    item.removeEventListener("click", listenerOverlay);
}

function addingCurrentData(profileTitle, profileDescription, nameInput, jobInput) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}


function handleFormSubmit(evt, popupEditProfile) {
    evt.preventDefault();

    const jobInput = evt.target.elements.name.value;
    const nameInput = evt.target.elements.description.value;

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = jobInput;
    profileDescription.textContent = nameInput;

    closeModal(popupEditProfile);
}

export { openModal, closeModal, closeWithEsc, closeWithOverlay, addingCurrentData, handleFormSubmit };
