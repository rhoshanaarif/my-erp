class DashboardVisual{constructor(){jQuery().barrating?this._initRatings():console.error("[CS] jQuery().barrating is undefined."),this._initProgressBars()}_initProgressBars(){document.querySelectorAll(".progress-bar").forEach((t=>{const r=t.getAttribute("aria-valuenow");t.style.width=r+"%"}))}_initRatings(){document.querySelectorAll(".recentRating").forEach((t=>{const r=t.getAttribute("data-initial-rating"),i=t.getAttribute("data-readonly");jQuery(t).barrating({initialRating:r,readonly:i,onSelect:function(t,r){},onClear:function(t,r){}})}))}}