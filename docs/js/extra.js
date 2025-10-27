// Simple, safe JavaScript for header title fix only

// Fix header title on home page
function fixHeaderTitle() {
  try {
    const isHomePage = window.location.pathname.endsWith('/') || 
                       window.location.pathname.endsWith('/index.html') ||
                       (window.location.pathname.includes('/python-ml-gha-workshop/') && 
                       (window.location.pathname.split('/').pop() === '' || 
                        window.location.pathname.split('/').pop() === 'index.html'));
    
    if (isHomePage) {
      const headerTitle = document.querySelector('.md-header__title .md-header__ellipsis');
      if (headerTitle) {
        headerTitle.textContent = 'Python and AI/ML for Climate';
      }
    }
  } catch (e) {
    console.log('Header title fix error:', e);
  }
}

// Safe initialization
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Fix header title
    fixHeaderTitle();
    
    // Handle external links safely
    const links = document.querySelectorAll("a[href]");
    for (let i = 0; i < links.length; i++) {
      const a = links[i];
      if (a.host && a.host !== window.location.host && !a.href.startsWith("mailto:")) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    }
  } catch (e) {
    console.log('Initialization error:', e);
  }
});

// Backup for window load
window.addEventListener('load', function() {
  try {
    fixHeaderTitle();
  } catch (e) {
    console.log('Window load error:', e);
  }
});

// Simple back-to-top button
(function () {
  try {
    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.title = "Back to top";
    btn.innerHTML = "↑";
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--md-primary-fg-color);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(0,0,0,.2);
      z-index: 9999;
      display: none;
      font-size: 20px;
    `;
    
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(btn);
      
      btn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      
      window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      });
    });
  } catch (e) {
    console.log('Back to top button error:', e);
  }
})();

// Simple header logo (single, right side)
(function() {
  try {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        try {
          const header = document.querySelector('.md-header__inner');
          if (header && !document.querySelector('.header-partner')) {
            const basePath = window.location.pathname.includes('/python-ml-gha-workshop/') ? '/python-ml-gha-workshop/' : '/';
            
            // Single right side logo
            const rightPartner = document.createElement('div');
            rightPartner.className = 'header-partner';
            rightPartner.innerHTML = `<a href="https://icpac.net" target="_blank"><img src="${basePath}assets/ILRI.png" alt="ILRI"></a>`;
            
            header.appendChild(rightPartner);
          }
        } catch (e) {
          console.log('Header logos error:', e);
        }
      }, 500);
    });
  } catch (e) {
    console.log('Header logos setup error:', e);
  }
})();