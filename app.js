(function () {
  "use strict";

  /* Daten aus bars.js */
  var bars = window.BARS || [];

  /* ---- Leaflet vom CDN da? ---- */
  if (typeof L === "undefined") {
    hideLoader();
    document.getElementById("map").innerHTML =
      '<div class="map-error"><h2>Karte konnte nicht geladen werden</h2>' +
      "<p>Die Kartenbibliothek <b>Leaflet</b> wird von einem Internet-Server " +
      "(unpkg.com) geladen und kommt gerade nicht durch — meist wegen fehlender " +
      "Internetverbindung oder einer Firewall / einem Blocker.</p>" +
      "<p>Verbindung prüfen und die Seite neu laden.</p></div>";
    return;
  }

  /* ---- Karte ---- */
  var map = L.map("map", { zoomControl: false }).setView([47.392791222202355, 8.043671545551746], 16); 
  L.control.zoom({ position: "bottomright" }).addTo(map);

  var tiles = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  );
  var tilesLoaded = false;
  tiles.on("load", function () { tilesLoaded = true; hideLoader(); });
  tiles.addTo(map);

  /* Sicherheits-Timeout: Loader spätestens nach 2.2 s weg */
  setTimeout(hideLoader, 2200);

  /* ---- Helfer ---- */
  function formatPreis(p) { return Number(p).toFixed(2); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  var loaderGone = false;
  function hideLoader() {
    if (loaderGone) return;
    loaderGone = true;
    var l = document.getElementById("loader");
    if (!l) return;
    l.classList.add("hidden");
    setTimeout(function () { l.style.display = "none"; }, 520);
  }

  /* Aktueller Filter-State */
  var selectedBeer = "";
  var mode = "alle";
  var sortMode = "preis";
  var selectedBar = null;

  function beerMatchesMode(b) {
    if (mode === "offen") return b.offen === true;
    if (mode === "flasche") return b.flasche === true;
    if (mode === "alkfrei") return b.alkoholfrei === true;
    return true;
  }
  /* Biere einer Bar, die zu Suche + Filter passen */
  function matchingBeers(bar) {
    return bar.biere.filter(function (b) {
      if (selectedBeer && b.name !== selectedBeer) return false;
      return beerMatchesMode(b);
    });
  }
  /* Biere einer Bar nach Ausschank-Filter (Chips) — OHNE Such-Term.
     Basis für die Detail-Ansicht: die Chips wirken dort, die Suche nicht. */
  function modeBeers(bar) { return bar.biere.filter(beerMatchesMode); }
  function cheapest(beers) {
    return beers.reduce(function (m, b) { return b.preis < m ? b.preis : m; }, Infinity);
  }

  /* ---- Bierliste einer Bar (für die Detail-Ansicht im Sheet) ---- */
  function biereListHtml(bar) {
    var beers = modeBeers(bar);            // nur Chip-gefiltert (Suche bleibt aussen vor)
    var min = cheapest(beers);
    return beers.slice().sort(function (a, b) { return a.preis - b.preis; })
      .map(function (b) {
        var badges = "";
        if (b.preis === min) badges += '<span class="badge badge-best">★ Günstigstes</span>';
        if (b.offen) badges += '<span class="badge badge-offen">Offen</span>';
        if (b.flasche) badges += '<span class="badge badge-flasche">Flasche</span>';
        if (b.alkoholfrei) badges += '<span class="badge badge-alkfrei">Alkfrei</span>';
        var cls = "bier-item" + (b.alkoholfrei ? " alkfrei" : (b.preis === min ? " cheapest" : ""));
        return (
          '<li class="' + cls + '">' +
            '<span class="bier-name">' + esc(b.name) + "</span>" +
            '<span class="bier-preis">CHF ' + formatPreis(b.preis) + "</span>" +
            '<span class="bier-badges">' + badges + "</span>" +
          "</li>"
        );
      }).join("");
  }

  /* Tiefster Preis einer Bar im aktuellen Filter (Basis für Pin-Label + Stapelung) */
  function barPrice(bar) {
    var beers = matchingBeers(bar);
    return beers.length ? cheapest(beers) : cheapest(bar.biere);
  }
  /* Stabile Stapel-Reihenfolge: günstiger = weiter vorne. Macht die Überlappung
     deterministisch (statt zufälliger DOM-Reihenfolge) — der bessere Deal liegt
     bei dicht beieinander liegenden Beizen immer oben + lesbar. */
  function zFor(bar) { return Math.round((30 - barPrice(bar)) * 100); }

  /* ---- Marker mit Preis-Tag ---- */
  function makeIcon(bar, price, isBest) {
    if (price == null) price = barPrice(bar);
    return L.divIcon({
      className: "pin-wrap",
      html:
        '<div class="pin' + (isBest ? " pin-best" : "") + '">' +
          (isBest ? '<span class="pin-star" aria-hidden="true">★</span>' : "") +
          formatPreis(price) + '<span class="pin-cur">CHF</span>' +
        "</div>",
      iconSize: [0, 0],   // 0×0-Anker: Wrapper-Ursprung liegt exakt auf der Koordinate
      iconAnchor: [0, 0]  // Pin wird per CSS (translateX -50%) mittig darüber gehängt
    });
  }

  var entries = bars.map(function (bar) {
    var marker = L.marker([bar.lat, bar.lng], { icon: makeIcon(bar) });
    marker.on("click", function () { focusBar(bar); });
    return { bar: bar, marker: marker, card: null, visible: false };
  });

  /* ---- Such-Dropdown füllen ---- */
  var validBeer = {};
  (function fillDatalist() {
    var set = {};
    bars.forEach(function (bar) { bar.biere.forEach(function (b) { set[b.name] = true; }); });
    var names = Object.keys(set).sort(function (a, b) { return a.localeCompare(b, "de"); });
    names.forEach(function (n) { validBeer[n] = true; });
    document.getElementById("bierliste").innerHTML = names.map(function (n) {
      return '<option value="' + esc(n) + '"></option>';
    }).join("");
  })();

  /* ---- Liste rendern ---- */
  var listEl = document.getElementById("barList");
  var emptyEl = document.getElementById("empty");
  var countEl = document.getElementById("count");
  var scrollEl = document.querySelector(".sheet-scroll");

  /* ---- Detail-Ansicht (Bierliste einer Bar im Sheet) ---- */
  var detailEl    = document.getElementById("barDetail");
  var detailName  = document.getElementById("detailName");
  var detailAddr  = document.getElementById("detailAddr");
  var detailBiere = document.getElementById("detailBiere");
  var detailBack  = document.getElementById("detailBack");
  var listScrollTop = 0; // gemerkte Scrollposition der Liste, um sie nach dem Detail wiederherzustellen

  function pinSvg() {
    return '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  }

  function barCard(bar, beers) {
    var price = cheapest(beers);
    var hasAlk = beers.some(function (b) { return b.alkoholfrei; });
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bar-card";

    var tags =
      '<span class="tag">' + beers.length + (beers.length === 1 ? " Bier" : " Biere") + "</span>" +
      (beers.some(function (b) { return b.offen; }) ? '<span class="tag">Offen</span>' : "") +
      (beers.some(function (b) { return b.flasche; }) ? '<span class="tag">Flasche</span>' : "") +
      (hasAlk ? '<span class="tag green">Alkoholfrei</span>' : "");

    btn.innerHTML =
      '<div class="bar-card-body">' +
        '<p class="bar-name">' + esc(bar.name) + "</p>" +
        '<p class="bar-addr">' + pinSvg() + esc(bar.adresse) + "</p>" +
        '<div class="bar-tags">' + tags + "</div>" +
      "</div>" +
      '<div class="bar-price"><small>ab</small><b>' + formatPreis(price) + "</b><span>CHF</span></div>";

    btn.addEventListener("click", function () { focusBar(bar); });
    li.appendChild(btn);
    return btn;
  }

  function renderList() {
    var visible = entries.filter(function (e) { return matchingBeers(e.bar).length > 0; });

    /* Sortierung */
    visible.sort(function (a, b) {
      if (sortMode === "name") return a.bar.name.localeCompare(b.bar.name, "de");
      return cheapest(matchingBeers(a.bar)) - cheapest(matchingBeers(b.bar));
    });

    /* Zähler */
    var beerCount = visible.reduce(function (s, e) { return s + matchingBeers(e.bar).length; }, 0);
    countEl.innerHTML = visible.length
      ? "<b>" + visible.length + "</b> " + (visible.length === 1 ? "Beiz" : "Beizen") +
        " · " + beerCount + (beerCount === 1 ? " Bier" : " Biere")
      : "Nichts gefunden";

    /* Karten neu aufbauen */
    listEl.innerHTML = "";
    entries.forEach(function (e) { e.card = null; });
    visible.forEach(function (e, i) {
      var card = barCard(e.bar, matchingBeers(e.bar));
      card.style.animationDelay = Math.min(i * 28, 280) + "ms";
      e.card = card;
      listEl.appendChild(card.parentNode);
      if (e.bar === selectedBar) card.classList.add("selected");
    });

    emptyEl.hidden = visible.length > 0;
    listEl.hidden = visible.length === 0;
  }

  /* ---- Marker ein-/ausblenden + Icons aktualisieren ---- */
  function applyMarkers() {
    /* Günstigster Preis aller sichtbaren Treffer -> dieser Pin bekommt den ★-Akzent */
    var globalMin = Infinity;
    entries.forEach(function (e) {
      var beers = matchingBeers(e.bar);
      if (beers.length) { var c = cheapest(beers); if (c < globalMin) globalMin = c; }
    });

    entries.forEach(function (e) {
      var beers = matchingBeers(e.bar);
      if (beers.length) {
        var price = cheapest(beers);
        e.marker.setIcon(makeIcon(e.bar, price, price === globalMin));
        e.marker.setZIndexOffset(zFor(e.bar));      // günstiger = oben, deterministisch
        if (!e.visible) { e.marker.addTo(map); e.visible = true; }
        if (e.bar === selectedBar) markSelectedMarker(e);
      } else if (e.visible) {
        map.removeLayer(e.marker); e.visible = false;
      }
    });
  }

  function markSelectedMarker(entry) {
    entries.forEach(function (e) {
      if (e.marker._icon) e.marker._icon.classList.remove("marker-selected");
      /* Stapel-Offset der nicht gewählten Pins auf den Preis-Wert zurücksetzen */
      if (e !== entry && e.visible) e.marker.setZIndexOffset(zFor(e.bar));
    });
    if (entry && entry.marker._icon) entry.marker._icon.classList.add("marker-selected");
    /* gewählter Pin immer ganz nach vorne — nie hinter einem Nachbarn versteckt */
    if (entry) entry.marker.setZIndexOffset(100000);
  }

  /* ---- Auswahl ---- */
  function selectBar(bar, scroll) {
    selectedBar = bar;
    var entry = null;
    entries.forEach(function (e) {
      var on = e.bar === bar;
      if (e.card) e.card.classList.toggle("selected", on);
      if (on) entry = e;
    });
    markSelectedMarker(entry);
    if (scroll !== false && entry && entry.card && scrollEl) {
      scrollEl.scrollTo({ top: Math.max(0, entry.card.parentNode.offsetTop - 12), behavior: "smooth" });
    }
  }

  /* Klick auf Pin oder Listen-Karte: zur Bar fliegen + Detail im Sheet zeigen */
  function focusBar(bar) {
    var entry = entries.find(function (e) { return e.bar === bar; });
    if (!entry) return;
    selectBar(bar, false);
    openDetail(bar);
    if (window.matchMedia("(max-width: 919px)").matches) setSheetOpen(true);
    map.flyTo([bar.lat, bar.lng], 17, { duration: .55 });
  }

  /* Detail-Inhalt füllen — ohne Scroll/Fokus anzufassen, damit man beim Filterwechsel
     in-place neu rendern kann (Scrollposition + Fokus bleiben erhalten). */
  function renderDetail(bar) {
    detailName.textContent = bar.name;
    detailAddr.innerHTML = pinSvg() + esc(bar.adresse);
    detailBiere.innerHTML = biereListHtml(bar);
  }

  /* Detail-Ansicht im Sheet öffnen (Bierliste, scrollbar) */
  function openDetail(bar) {
    if (detailEl.hidden) listScrollTop = scrollEl.scrollTop; // nur beim Wechsel Liste -> Detail merken
    renderDetail(bar);
    detailEl.hidden = false;
    sheet.classList.add("detail-open");
    scrollEl.scrollTop = 0;                       // Detail immer von oben anzeigen
    detailName.focus({ preventScroll: true });    // Überschrift = Bar-Name wird angesagt
  }

  /* Zurück zur Bar-Liste (für refresh/Filter: nur ausblenden) */
  function closeDetail() {
    if (detailEl.hidden) return;
    detailEl.hidden = true;
    sheet.classList.remove("detail-open");
  }

  /* Bewusstes Zurück (Button/Esc): Liste zeigen, Scrollposition + Fokus wiederherstellen */
  function returnToList() {
    if (detailEl.hidden) return;
    var entry = entries.find(function (e) { return e.bar === selectedBar; });
    closeDetail();
    scrollEl.scrollTop = listScrollTop;
    if (entry && entry.card) entry.card.focus();
  }

  /* Jede Filter-/Suchänderung aktualisiert Marker + Liste. Ist ein Detail offen, wird es
     mit dem aktiven Chip-Filter live mit-gefiltert (statt geschlossen). Bleibt für die Beiz
     kein passendes Bier übrig, zurück zur (gefilterten) Liste. */
  function refresh() {
    applyMarkers();
    renderList();
    if (!detailEl.hidden && selectedBar) {
      if (modeBeers(selectedBar).length > 0) renderDetail(selectedBar);
      else closeDetail();
    }
  }

  /* ---- Events: Detail schliessen (Zurück-Button + Esc) ---- */
  detailBack.addEventListener("click", returnToList);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !detailEl.hidden) returnToList();
  });

  /* ---- Events: Suche ---- */
  var input = document.getElementById("bierFilter");
  var clearBtn = document.getElementById("searchClear");
  input.addEventListener("input", function () {
    var val = input.value.trim();
    selectedBeer = validBeer[val] ? val : "";
    clearBtn.hidden = val.length === 0;
    refresh();
  });
  clearBtn.addEventListener("click", function () {
    input.value = ""; selectedBeer = ""; clearBtn.hidden = true; input.focus(); refresh();
  });

  /* Aktiven Button in einer Gruppe setzen — Klasse UND aria-pressed synchron,
     damit Screenreader den aktiven Filter/Sort hören (nicht nur sehen). */
  function setActive(group, winner) {
    group.forEach(function (b) {
      var on = b === winner;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  /* ---- Events: Filter-Chips ---- */
  var chips = document.querySelectorAll(".chip");
  chips.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setActive(chips, btn);
      mode = btn.getAttribute("data-mode");
      refresh();
    });
  });

  /* ---- Events: Sortierung ---- */
  var sortBtns = document.querySelectorAll(".sort-btn");
  sortBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setActive(sortBtns, btn);
      sortMode = btn.getAttribute("data-sort");
      renderList();
    });
  });

  /* ---- Leerer Zustand: Reset ---- */
  document.getElementById("emptyReset").addEventListener("click", function () {
    input.value = ""; selectedBeer = ""; clearBtn.hidden = true;
    mode = "alle";
    var alle = document.querySelector('.chip[data-mode="alle"]');
    setActive(chips, alle);
    refresh();
    input.focus();
  });

  /* =========================================================================
     BOTTOM-SHEET (mobil): ziehen + tippen
     ========================================================================= */
  var sheet = document.getElementById("sheet");
  var grabber = document.getElementById("grabber");
  var sheetOpen = false;

  function vh(n) { return window.innerHeight * n / 100; }

  /* Offener Ruhe-Versatz des Sheets: Oberkante knapp UNTER die Topbar, damit der
     Grabber sichtbar + ziehbar bleibt. Die Topbar-Höhe (inkl. env(safe-area-inset-top))
     wird live gemessen — ein fixer Wert würde Notch-Geräte verdecken.
       naturalTop = innerHeight - Sheet-Höhe  (= 14vh aus height:86vh)
       want       = Topbar-Unterkante + Gap − naturalTop
     Nach unten auf vh(4) geklemmt (falls Topbar mal kürzer als naturalTop). */
  function openOffset() {
    var topbar = document.querySelector(".topbar");
    var naturalTop = window.innerHeight - sheet.offsetHeight;
    var want = (topbar ? topbar.offsetHeight : 0) + 8 - naturalTop;
    return Math.min(Math.max(want, vh(4)), vh(56));
  }
  function closedOffset() { return vh(56); }   /* Peek-Höhe (Sheet zu) */

  function setSheetOpen(open) {
    sheetOpen = open;
    sheet.classList.toggle("open", open);
    sheet.style.transform = "";
    grabber.setAttribute("aria-expanded", open ? "true" : "false");
  }

  var drag = null;
  var pointerHandled = false; /* unterscheidet Zeiger-Tipp von Tastatur-Klick */
  function onDown(e) {
    if (window.matchMedia("(min-width: 920px)").matches) return;
    drag = { startY: e.clientY, base: sheetOpen ? openOffset() : closedOffset(), moved: 0 };
    sheet.classList.add("dragging");
    grabber.setPointerCapture && grabber.setPointerCapture(e.pointerId);
  }
  function onMove(e) {
    if (!drag) return;
    var dy = e.clientY - drag.startY;
    drag.moved = Math.abs(dy);
    var off = Math.min(Math.max(drag.base + dy, openOffset()), closedOffset());
    sheet.style.transform = "translateY(" + off + "px)";
  }
  function onUp() {
    if (!drag) return;
    sheet.classList.remove("dragging");
    if (drag.moved < 6) { setSheetOpen(!sheetOpen); }
    else {
      var current = parseFloat((sheet.style.transform.match(/[-\d.]+/) || [closedOffset()])[0]);
      setSheetOpen(current < (openOffset() + closedOffset()) / 2);
    }
    drag = null;
    pointerHandled = true; /* der folgende click stammt aus dieser Geste -> ignorieren */
  }
  grabber.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  /* Tastatur (Enter/Space) löst nur einen click aus, keine Pointer-Events.
     -> Bei reiner Tastaturbedienung hier das Sheet umschalten. */
  grabber.addEventListener("click", function (e) {
    e.preventDefault();
    if (pointerHandled) { pointerHandled = false; return; }
    if (!window.matchMedia("(min-width: 920px)").matches) setSheetOpen(!sheetOpen);
  });

  /* =========================================================================
     DESKTOP: Sheet-Top unter die Topbar setzen
     ========================================================================= */
  function layoutSidebar() {
    if (window.matchMedia("(min-width: 920px)").matches) {
      var tb = document.querySelector(".topbar");
      document.documentElement.style.setProperty("--sidebar-top", tb.offsetHeight + "px");
    } else {
      /* Mobil: offene Sheet-Position an die gemessene Topbar-Höhe koppeln, damit der
         Grabber unter den Filter-Chips sichtbar bleibt. Treibt auch das Boden-Padding
         der Scrollfläche (style.css: var(--sheet-open)). */
      document.documentElement.style.setProperty("--sheet-open", openOffset() + "px");
    }
    map.invalidateSize();
  }
  window.addEventListener("resize", layoutSidebar);

  /* ---- Start ---- */
  refresh();
  layoutSidebar();
  setTimeout(layoutSidebar, 300);
})();
