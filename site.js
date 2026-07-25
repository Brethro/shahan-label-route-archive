const slides = [
  [1, "Final Label Route Archive", "Introduction"],
  [2, "Selected Route Index", "Introduction"],
  [3, "Cult Pantry A — Diagonal Split", "Foundational Cult Pantry"],
  [
    4,
    "Cult Pantry B — Architectural Cross-Section",
    "Foundational Cult Pantry",
  ],
  [5, "Cult Pantry C — Risograph Seed Current", "Foundational Cult Pantry"],
  [6, "One-Pass A — Botanical Linocut", "Complete One-Pass Labels"],
  [7, "One-Pass B — Architectural Chambers", "Complete One-Pass Labels"],
  [8, "One-Pass C — Seed Stream", "Complete One-Pass Labels"],
  [9, "Organic Frequency", "Expanded 1 L Concepts"],
  [10, "Market Tapestry", "Expanded 1 L Concepts"],
  [11, "Night Orchard", "Expanded 1 L Concepts"],
  [12, "Seed Chorus", "Bottle-Aware Development"],
  [13, "Blue Hour", "New Concept Studio"],
  [14, "Wild Type — Remastered", "New Concept Studio"],
  [15, "Orchard Ribbon", "New Concept Studio"],
  [16, "Orchard Afterimage", "Skill-Proof Concepts"],
  [17, "Signal Press", "Signal Press Studio"],
  [18, "Ruby Proof", "North American Market Concepts"],
  [19, "Scarlet Table — Remastered", "North American Market Concepts"],
  [20, "Seed Signal", "North American Market Concepts"],
  [21, "Harvest Walk", "North American Market Concepts"],
  [22, "Orchard Current", "North American Market Concepts"],
  [23, "Roseburg Orchard Press", "North American Market Concepts"],
  [24, "One Archive. One Visual Standard.", "Closing"],
];

const featuredGroups = [
  "Foundational Cult Pantry",
  "Complete One-Pass Labels",
  "Expanded 1 L Concepts",
  "New Concept Studio",
  "North American Market Concepts",
];

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
  return `./slides/slide-${String(number).padStart(2, "0")}.webp`;
}

function renderArchive() {
  groupLinks.innerHTML = featuredGroups
    .map((group) => `<a href="#${slugify(group)}">${group}</a>`)
    .join("");

  let previousGroup = "";
  gallery.innerHTML = slides
    .map(([number, title, group]) => {
      const startsGroup = number > 2 && group !== previousGroup;
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

renderArchive();
