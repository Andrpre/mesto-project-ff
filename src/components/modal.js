function closeWithEsc(evt) {
    evt.key === "Escape" ? closeModal(document.querySelector(".popup_is-opened")) : "";
}

function closeWithOverlay(evt) {
    evt.currentTarget === evt.target ? closeModal(evt.currentTarget) : "";
}

function openModal(item) {
    item.classList.add("popup_is-opened");
    item.classList.remove("popup_is-animated");

    document.addEventListener("keydown", closeWithEsc);
    item.addEventListener("click", closeWithOverlay);
}

function closeModal(item) {
    item.classList.remove("popup_is-opened");
    item.classList.add("popup_is-animated");

    document.removeEventListener("keydown", closeWithEsc);
    item.removeEventListener("click", closeWithOverlay);
}

export { openModal, closeModal, closeWithEsc, closeWithOverlay };
