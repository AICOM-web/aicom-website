document.addEventListener("DOMContentLoaded", function() {
  const banners = document.querySelectorAll(".org-section__banner");
  if (banners.length === 0) return;

  banners.forEach(banner => {
    // Add accessibility attributes to make it a button if not already
    if (!banner.hasAttribute("role")) {
      banner.setAttribute("role", "button");
      banner.setAttribute("tabindex", "0");
      banner.setAttribute("aria-label", "View banner image");
    }
    banner.style.cursor = "pointer";

    banner.addEventListener("click", () => openBannerLightbox(banner));
    banner.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBannerLightbox(banner);
      }
    });
  });

  function openBannerLightbox(bannerElement) {
    // Extract background image url
    const style = window.getComputedStyle(bannerElement);
    const bgImage = style.backgroundImage;
    // bgImage might look like: linear-gradient(...), url("...")
    // Extract the url part
    const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
    if (!urlMatch || !urlMatch[1]) return;
    
    let imageUrl = urlMatch[1];

    // Check if lightbox already exists, create if not
    let lightbox = document.getElementById("genericBannerLightbox");
    let imgElement;
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.className = "org-lightbox";
      lightbox.id = "genericBannerLightbox";
      lightbox.setAttribute("aria-hidden", "true");

      const backdrop = document.createElement("div");
      backdrop.className = "org-lightbox__backdrop";

      const dialog = document.createElement("div");
      dialog.className = "org-lightbox__dialog";
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");

      const closeBtn = document.createElement("button");
      closeBtn.className = "org-lightbox__close";
      closeBtn.type = "button";
      closeBtn.innerHTML = "&times;";
      closeBtn.setAttribute("aria-label", "Close preview");

      imgElement = document.createElement("img");
      imgElement.className = "org-lightbox__image";
      
      // Ensure the image fits nicely
      imgElement.style.objectFit = "contain";
      imgElement.style.width = "100%";
      imgElement.style.maxHeight = "calc(90vh - 28px)";

      dialog.appendChild(closeBtn);
      dialog.appendChild(imgElement);
      lightbox.appendChild(backdrop);
      lightbox.appendChild(dialog);
      document.body.appendChild(lightbox);

      const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        if (!document.body.classList.contains("menu-open")) {
          document.body.style.overflow = "";
        }
      };

      backdrop.addEventListener("click", closeLightbox);
      closeBtn.addEventListener("click", closeLightbox);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
          closeLightbox();
        }
      });
    } else {
      imgElement = lightbox.querySelector(".org-lightbox__image");
    }

    imgElement.src = imageUrl;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
});
