const slides = [
  [1, "Persian Label Studio · Volume II", "Introduction"],
  [2, "Garden Air", "Concept Systems"],
  [3, "Silk Medallion", "Concept Systems"],
  [4, "Calligraphic Orchard", "Concept Systems"],
  [5, "Turquoise Tile Press", "Concept Systems"],
  [6, "Silk Orchard Current", "Concept Systems"],
  [7, "Qajar Ruby Poster", "Concept Systems"],
  [8, "Ardabil Woven Mark", "Concept Systems"],
  [9, "Shelf Signals · I", "Comparison"],
  [10, "Shelf Signals · II", "Comparison"],
  [11, "Choose the Cultural Engine", "Closing"],
];

const featuredGroups = ["Concept Systems", "Comparison"];
const gallery = document.querySelector("#slide-gallery");
const groupLinks = document.querySelector("#group-links");
const modal = document.querySelector("#slide-modal");
const modalImage = document.querySelector("#modal-image");
const modalCount = document.querySelector("#modal-count");
const modalTitle = document.querySelector("#modal-title");
const previousButton = document.querySelector("#modal-previous");
const nextButton = document.querySelector("#modal-next");
let activeSlide = 1;

function slugify(value) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function slideSource(number) {
  return `./slides/slide-${String(number).padStart(2, "0")}.png`;
}

function renderStudio() {
  groupLinks.innerHTML = featuredGroups
    .map((group) => `<a href="#${slugify(group)}">${group}</a>`)
    .join("");

  let previousGroup = "";
  gallery.innerHTML = slides
    .map(([number, title, group]) => {
      const startsGroup = number > 1 && group !== previousGroup;
      previousGroup = group;
      const heading = startsGroup
        ? `<p class="group-heading" id="${slugify(group)}"><span>${group}</span></p>`
        : "";

      return `${heading}
        <article class="slide-card">
          <button
            type="button"
            data-slide="${number}"
            aria-label="Open slide ${number}: ${title}"
          >
            <span class="slide-image">
              <img
                src="${slideSource(number)}"
                alt="Slide ${number}: ${title}"
                loading="${number > 4 ? "lazy" : "eager"}"
              />
            </span>
            <span class="slide-caption">
              <span class="slide-number">${String(number).padStart(2, "0")}</span>
              <span>
                <small>${group}</small>
                <strong>${title}</strong>
              </span>
              <span class="open-mark" aria-hidden="true">↗</span>
            </span>
          </button>
        </article>`;
    })
    .join("");

  gallery.querySelectorAll("[data-slide]").forEach((button) => {
    button.addEventListener("click", () => openSlide(Number(button.dataset.slide)));
  });
}

function openSlide(number) {
  activeSlide = Math.max(1, Math.min(slides.length, number));
  const [, title] = slides[activeSlide - 1];
  modalImage.src = slideSource(activeSlide);
  modalImage.alt = `Slide ${activeSlide}: ${title}`;
  modalCount.textContent = `${String(activeSlide).padStart(2, "0")} / ${slides.length}`;
  modalTitle.textContent = title;
  previousButton.disabled = activeSlide === 1;
  nextButton.disabled = activeSlide === slides.length;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  document.querySelector("#modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

document.querySelector("#hero-cover").addEventListener("click", () => openSlide(1));
document.querySelector("#modal-close").addEventListener("click", closeModal);
previousButton.addEventListener("click", () => openSlide(activeSlide - 1));
nextButton.addEventListener("click", () => openSlide(activeSlide + 1));

modal.addEventListener("mousedown", (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener("keydown", (event) => {
  if (modal.hidden) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowLeft") openSlide(activeSlide - 1);
  if (event.key === "ArrowRight") openSlide(activeSlide + 1);
});

renderStudio();
