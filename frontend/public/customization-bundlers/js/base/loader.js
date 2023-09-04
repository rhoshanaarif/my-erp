(function () {
    let loaded = false;
    
    setTimeout(() => {
      if (!loaded) {
        document.body.classList.add("spinner");
      }
    }, 500);
  
    window.addEventListener("DOMContentLoaded", () => {
      loaded = true;
    });
  })();
  