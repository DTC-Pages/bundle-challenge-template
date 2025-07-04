document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.paired-with__detail-item').forEach(item => {
    const variantsAttr = item.getAttribute('data-variants');
    if (!variantsAttr) return;
    const variants = JSON.parse(variantsAttr);

    const selects = Array.from(item.querySelectorAll('select.option-select'));
    const optionCount = selects.length;
    const selectedOptions = Array(optionCount);

    selects.forEach((select, i) => {
      selectedOptions[i] = select.value;
    });

    let match = variants.find(v =>
      v.available && v.options.every((opt, i) => opt === selectedOptions[i])
    ) || variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    ) || variants[0];
    let currentVariantId = match.id;

    const addToCartBtn = item.querySelector('.btn--add-to-cart');
    addToCartBtn.dataset.variantId = currentVariantId;

    if (!match.available) {
      addToCartBtn.textContent = 'Sold Out';
      addToCartBtn.disabled = true;
    } else {
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.disabled = false;
    }

    selects.forEach(select => {
      select.addEventListener('change', () => {
        const idx = parseInt(select.dataset.optionIndex, 10);
        const value = select.value;
        selectedOptions[idx] = value;

        const newMatch = variants.find(v =>
          v.options.every((opt, i) => opt === selectedOptions[i])
        );

        if (newMatch) {
          currentVariantId = newMatch.id.toString();
          addToCartBtn.dataset.variantId = currentVariantId;

          if (!newMatch.available) {
            addToCartBtn.textContent = 'Sold Out';
            addToCartBtn.disabled = true;
          } else {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.disabled = false;
          }

          const imageSlider = item.closest('.paired-with__content')?.querySelector('.paired-with__image-slider .swiper');
          const swiperInstance = imageSlider?.swiper;

          if (swiperInstance) {
            const slides = imageSlider.querySelectorAll('img');
            const targetIndex = Array.from(slides).findIndex(img => {
              const ids = img.dataset.variantIds?.split(',') || [];
              return ids.includes(currentVariantId);
            });

            if (targetIndex !== -1) {
              swiperInstance.slideTo(targetIndex);
            }
          }
        } else {
          addToCartBtn.textContent = 'Unavailable';
          addToCartBtn.disabled = true;
          addToCartBtn.removeAttribute('data-variant-id');
        }
      });
    });

    addToCartBtn.addEventListener('click', e => {
      e.preventDefault();

      const mainForm = document.querySelector('form[action^="/cart/add"]');
      const mainIdInput = mainForm?.querySelector('input[name="id"]');
      const mainId = parseInt(mainIdInput?.value, 10);
      const bundleId = parseInt(addToCartBtn.dataset.variantId, 10);
      const bundlePromoId = new Date().getTime();

      fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          items: [
            {
              id: bundleId, quantity: 1,
              properties: {
                _bundle_promo: "true",
                _bundle_promo_id: bundlePromoId,
                _parent_variant: '43802696843400'
              }
            },
            {
              id: mainId, quantity: 1,
              properties: {
                _bundle_promo: 'true',
                _bundle_promo_id: bundlePromoId,
                _parent_variant: '43802696843400'
              }
            }
          ]
        })
      })
        .then(res => res.json())
        .then(() => {
          const cartNotification = document.querySelector('cart-notification');
          if (!cartNotification) {
            console.warn('No se encontró el componente <cart-notification>');
            return;
          }

          fetch(`/?sections=cart-notification-product,cart-notification-button,cart-icon-bubble`)
            .then(res => res.json())
            .then(sections => {
              fetch(`${window.Shopify.routes.root}cart.js`)
                .then(res => res.json())
                .then(cartState => {
                  const lastItem = cartState.items[cartState.items.length - 1];
                  cartNotification.renderContents({
                    key: lastItem.key,
                    sections: sections
                  });
                });
            });
        })
        .catch(err => console.error('Error al añadir al carrito:', err));
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.paired-with__image-slider .swiper').forEach((el) => {
    new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      }
    });
  });
});