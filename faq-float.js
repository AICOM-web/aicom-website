/**
 * This script handles the floating buttons (QR Code and FAQ) and their modals.
 * It injects the necessary HTML and sets up the logic for all pages.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Create S2S Load Button
  const s2sBtn = document.createElement('button');
  s2sBtn.id = 's2s-load-btn';
  s2sBtn.className = 'floating-btn';
  s2sBtn.setAttribute('aria-label', 'Load S2S Internet');
  s2sBtn.style.position = 'fixed';
  s2sBtn.style.bottom = '176px';
  s2sBtn.style.right = '32px';
  s2sBtn.style.width = '56px';
  s2sBtn.style.height = '56px';
  s2sBtn.style.borderRadius = '50%';
  s2sBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
  s2sBtn.style.boxShadow = '4px 4px 16px #c8e0de, -4px -4px 16px #ffffff, 0 2px 8px rgba(54,214,204,0.10)';
  s2sBtn.style.border = 'none';
  s2sBtn.style.color = '#0e3c39';
  s2sBtn.style.cursor = 'pointer';
  s2sBtn.style.zIndex = '9999';
  s2sBtn.style.display = 'flex';
  s2sBtn.style.alignItems = 'center';
  s2sBtn.style.justifyContent = 'center';
  s2sBtn.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease, color 0.3s ease';
  s2sBtn.innerHTML = '<span class="material-icons" style="font-size:1.7rem;vertical-align:middle;">qr_code_scanner</span>';

  // Hover effects for S2S Button
  s2sBtn.addEventListener('mouseenter', () => {
    s2sBtn.style.transform = 'scale(1.12) translateY(-6px)';
    s2sBtn.style.background = 'linear-gradient(145deg, #d0f3f0 0%, #f0fffe 100%)';
    s2sBtn.style.boxShadow = '6px 8px 24px rgba(54, 214, 204, 0.25), -4px -4px 16px #ffffff, 0 8px 20px rgba(54, 214, 204, 0.15)';
    s2sBtn.style.color = '#36d6cc';
  });
  s2sBtn.addEventListener('mouseleave', () => {
    s2sBtn.style.transform = 'scale(1)';
    s2sBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
    s2sBtn.style.boxShadow = '4px 4px 16px #c8e0de, -4px -4px 16px #ffffff, 0 2px 8px rgba(54,214,204,0.10)';
    s2sBtn.style.color = '#0e3c39';
  });
  s2sBtn.addEventListener('touchstart', () => {
    s2sBtn.style.transform = 'scale(1.08) translateY(-3px)';
    s2sBtn.style.background = 'linear-gradient(145deg, #d0f3f0 0%, #f0fffe 100%)';
  });
  s2sBtn.addEventListener('touchend', () => {
    s2sBtn.style.transform = 'scale(1)';
    s2sBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
  });

  // Create FAQ Button
  const faqBtn = document.createElement('button');
  faqBtn.id = 'faq-float-btn';
  faqBtn.className = 'floating-btn';
  faqBtn.setAttribute('aria-label', 'FAQs');
  faqBtn.style.position = 'fixed';
  faqBtn.style.bottom = '32px';
  faqBtn.style.right = '32px';
  faqBtn.style.width = '56px';
  faqBtn.style.height = '56px';
  faqBtn.style.borderRadius = '50%';
  faqBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
  faqBtn.style.boxShadow = '4px 4px 16px #c8e0de, -4px -4px 16px #ffffff, 0 2px 8px rgba(54,214,204,0.10)';
  faqBtn.style.border = 'none';
  faqBtn.style.color = '#0e3c39';
  faqBtn.style.cursor = 'pointer';
  faqBtn.style.zIndex = '9999';
  faqBtn.style.display = 'flex';
  faqBtn.style.alignItems = 'center';
  faqBtn.style.justifyContent = 'center';
  faqBtn.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease, color 0.3s ease';
  faqBtn.innerHTML = '<span class="material-icons" style="font-size:1.7rem;vertical-align:middle;">help_outline</span>';

  // Hover effects for FAQ Button
  faqBtn.addEventListener('mouseenter', () => {
    faqBtn.style.transform = 'scale(1.12) translateY(-6px)';
    faqBtn.style.background = 'linear-gradient(145deg, #d0f3f0 0%, #f0fffe 100%)';
    faqBtn.style.boxShadow = '6px 8px 24px rgba(54, 214, 204, 0.25), -4px -4px 16px #ffffff, 0 8px 20px rgba(54, 214, 204, 0.15)';
    faqBtn.style.color = '#36d6cc';
  });
  faqBtn.addEventListener('mouseleave', () => {
    faqBtn.style.transform = 'scale(1)';
    faqBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
    faqBtn.style.boxShadow = '4px 4px 16px #c8e0de, -4px -4px 16px #ffffff, 0 2px 8px rgba(54,214,204,0.10)';
    faqBtn.style.color = '#0e3c39';
  });
  faqBtn.addEventListener('touchstart', () => {
    faqBtn.style.transform = 'scale(1.08) translateY(-3px)';
    faqBtn.style.background = 'linear-gradient(145deg, #d0f3f0 0%, #f0fffe 100%)';
  });
  faqBtn.addEventListener('touchend', () => {
    faqBtn.style.transform = 'scale(1)';
    faqBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
  });

  const floatingModalsHtml = `
        <!-- S2S Load Modal -->
        <div id="s2s-load-modal" style="display:none;position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.32);align-items:center;justify-content:center;backdrop-filter:blur(3px);">
            <div class="s2s-modal-container" style="background:#fff;border-radius:24px;box-shadow:0 12px 40px rgba(0,0,0,0.2);max-width:95vw;width:720px;padding:32px;position:relative;text-align:left;max-height:90vh;overflow-y:auto;">
                <button id="s2s-load-modal-close" aria-label="Close Modal" style="position:absolute;top:15px;right:20px;background:none;border:none;font-size:2.2rem;cursor:pointer;color:#0e3c39;z-index:11;">
                    <span class="material-icons" style="font-size:2.2rem;">close</span>
                </button>
                
                <h2 style="margin-top:0;font-size:1.6rem;color:#0e3c39;font-family:'Segoe UI',Arial,sans-serif;margin-bottom:24px;text-align:center;font-weight:800;">How to Load S2S Internet</h2>
                
                <div class="s2s-modal-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:30px;align-items:start;">
                    <!-- Column 1: QR and Header Info -->
                    <div>
                        <div style="background:#f0f9f8;padding:24px;border-radius:20px;border:2px dashed #36d6cc;text-align:center;margin-bottom:20px;">
                            <img src="assets/QR.jpg" alt="S2S Load QR Code" style="width:100%;max-width:240px;border-radius:12px;margin-bottom:12px;box-shadow:0 8px 16px rgba(0,0,0,0.06);" />
                            <p style="font-size:0.9rem;margin:0;font-weight:700;color:#0e3c39;letter-spacing:0.02em;">SCAN FOR PAYMENT</p>
                        </div>
                        
                        <div style="font-size:0.88rem;color:#1d3b43;">
                            <p style="margin:0;line-height:1.4;"><strong>Office Location:</strong><br>
                            2nd Floor, AICOM Building, Caltex Road, Sta. Rita, Batangas City.</p>
                        </div>
                    </div>

                    <!-- Column 2: Contacts and Steps -->
                    <div style="font-size:0.94rem;color:#1d3b43;line-height:1.6;">
                        <div style="margin-bottom:20px;">
                            <p style="margin-bottom:8px;font-weight:700;color:#0a6b64;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.05em;">Contact Channels</p>
                            <p style="margin-bottom:8px;"><strong>Hotline:</strong> 0953 259 1982</p>
                            <p style="margin:0;"><strong>Facebook Accounts:</strong></p>
                            <ul style="padding-left:22px;margin:5px 0 0 0;font-size:0.88rem;">
                                <li>AICOM S2S</li>
                                <li>AICOM Surf2Sawa NCR</li>
                                <li>AICOM Surf2Sawa Cavite</li>
                            </ul>
                        </div>

                        <hr style="border:0;border-top:1px solid #eee;margin:20px 0;">

                        <div>
                            <p style="margin-bottom:8px;font-weight:700;color:#0a6b64;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.05em;">Steps to Load</p>
                            <ul style="padding-left:22px;margin:0;">
                                <li style="margin-bottom:8px;">Scan the official QR code (left) or on your modem.</li>
                                <li style="margin-bottom:8px;">Send proof of payment to our Facebook pages.</li>
                                <li style="margin-bottom:8px;">Wait for 5 minutes for processing.</li>
                                <li>AICOM will send your proof of loading.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @media (max-width: 680px) {
                .s2s-modal-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
                .s2s-modal-container { padding: 24px !important; }
            }
        </style>


    `;

  // 2. Append elements to body
  if (!document.getElementById('s2s-load-btn')) {
    document.body.appendChild(s2sBtn);
    document.body.appendChild(faqBtn);

    const div = document.createElement('div');
    div.innerHTML = floatingModalsHtml;
    while (div.firstChild) {
      document.body.appendChild(div.firstChild);
    }
  }

  // 3. Logic for S2S Load Modal
  const currentS2sBtn = document.getElementById('s2s-load-btn');
  const s2sModal = document.getElementById('s2s-load-modal');
  const s2sClose = document.getElementById('s2s-load-modal-close');

  if (currentS2sBtn && s2sModal && s2sClose) {
    currentS2sBtn.addEventListener('click', () => {
      s2sModal.style.display = 'flex';
      document.body.classList.add('modal-open');
    });

    const closeS2SModal = () => {
      s2sModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    };

    s2sClose.addEventListener('click', closeS2SModal);
    s2sModal.addEventListener('click', (e) => {
      if (e.target === s2sModal) closeS2SModal();
    });
  }

  // 4. Logic for FAQ Redirect
  const currentFaqBtn = document.getElementById('faq-float-btn');

  if (currentFaqBtn) {
    currentFaqBtn.addEventListener('click', () => {
      window.location.href = 'faq.html';
    });
  }
});
