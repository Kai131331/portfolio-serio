const glow = document.getElementById('glow');
  const hero = document.getElementById('hero');
  let mx = 50, my = 50, tx = 50, ty = 50;
  hero.addEventListener('mousemove', (e)=>{
    const r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width) * 100;
    ty = ((e.clientY - r.top) / r.height) * 100;
  });
  function loop(){
    mx += (tx-mx)*0.12;
    my += (ty-my)*0.12;
    glow.style.setProperty('--mx', mx+'%');
    glow.style.setProperty('--my', my+'%');
    requestAnimationFrame(loop);
  }
  loop();

  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('image-modal-image');
  const closeModalButton = imageModal.querySelector('.image-modal__close');
  let lastPreviewTrigger;

  function openImagePreview(card){
    lastPreviewTrigger = card;
    modalImage.src = card.dataset.image;
    modalImage.alt = card.dataset.imageAlt;
    imageModal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeModalButton.focus();
  }

  function closeImagePreview(){
    imageModal.hidden = true;
    modalImage.src = '';
    document.body.style.overflow = '';
    lastPreviewTrigger?.focus();
  }

  document.querySelectorAll('.proj-card--preview').forEach((card)=>{
    card.addEventListener('click', ()=>openImagePreview(card));
    card.addEventListener('keydown', (event)=>{
      if(event.key === 'Enter' || event.key === ' '){
        event.preventDefault();
        openImagePreview(card);
      }
    });
  });

  closeModalButton.addEventListener('click', closeImagePreview);
  imageModal.addEventListener('click', (event)=>{
    if(event.target === imageModal) closeImagePreview();
  });
  document.addEventListener('keydown', (event)=>{
    if(event.key === 'Escape' && !imageModal.hidden) closeImagePreview();
  });

  async function copyText(text){
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand('copy');
    textArea.remove();
    if(!copied) throw new Error('Copy failed');
  }

  document.querySelectorAll('.proj-card').forEach((card)=>{
    card.addEventListener('click', ()=>{
      const externalUrl = card.dataset.externalUrl;
      if(externalUrl){
        window.open(externalUrl, '_blank', 'noopener,noreferrer');
        return;
      }

      if(card.classList.contains('proj-card--preview')){
        openImagePreview(card);
      }
    });

    card.addEventListener('keydown', (event)=>{
      if(event.key === 'Enter' || event.key === ' '){
        event.preventDefault();
        card.click();
      }
    });
  });

  closeModalButton.addEventListener('click', closeImagePreview);
  imageModal.addEventListener('click', (event)=>{
    if(event.target === imageModal) closeImagePreview();
  });
  document.addEventListener('keydown', (event)=>{
    if(event.key === 'Escape' && !imageModal.hidden) closeImagePreview();
  });
