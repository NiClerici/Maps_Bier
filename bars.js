/* =============================================================================
   bars.js — DATEN DER BIER-KARTE AARAU
   =============================================================================

   >>> HIER neue Bars / Biere / Preise eintragen <<<

   Jede Bar ist ein Objekt mit:
     name     : Anzeigename der Bar
     adresse  : "Strasse Nr, Aarau"
     lat, lng : Koordinaten (Innenstadt Aarau ~ 47.391, 8.045)
     biere    : Liste von Bieren, je:
        name        : Biername (echte Marke verwenden, z.B. "Guinness")
        fass        : true  = vom Fass erhältlich, sonst false
        flasche     : true  = in Flasche erhältlich, sonst false
        preis       : Zahl in CHF, z.B. 7.50  (NICHT als String!)
        alkoholfrei : true  = alkoholfreies Bier, sonst false

   Tipps:
   - Ein Bier darf gleichzeitig fass=true UND flasche=true sein.
   - Nach dem Speichern einfach die Seite neu laden — das Such-Dropdown
     und die Marker erzeugen sich automatisch aus diesen Daten neu.
     (app.js muss NICHT angefasst werden.)

   ACHTUNG: Die Bar-Namen sind echte Aarauer Lokale, die Bier- und Preis-
   angaben sind jedoch frei erfundene BEISPIELDATEN und nicht real geprüft.
   ============================================================================= */

window.BARS = [
  {
    name: "Platzhirsch",
    adresse: "Rathausgasse 9, Aarau",
    lat: 47.393090941470305,
    lng: 8.04354702994581,
    biere: [
      // OFFEN (Preis = 0.3 l)
      { name: "Saisonbier",                 fass: true,  flasche: false, preis: 6.00, alkoholfrei: false },
      { name: "Feldschlösschen Lager",      fass: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Panaché",                    fass: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Valaisanne Pale Ale",        fass: true,  flasche: false, preis: 6.00, alkoholfrei: false },
      { name: "Schneider Weisse Original",  fass: true,  flasche: false, preis: 6.00, alkoholfrei: false },
      // IM FLÄSCHLI (0.33 l)
      { name: "Corona Extra",               fass: false, flasche: true,  preis: 8.00, alkoholfrei: false },
      { name: "Feldschlösschen Braufrisch", fass: false, flasche: true,  preis: 6.50, alkoholfrei: false },
      { name: "Feldschlösschen Alkoholfrei",fass: false, flasche: true,  preis: 6.50, alkoholfrei: true  },
      { name: "Stadtwächter Golden Ale",    fass: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Blue Moon",                  fass: false, flasche: true,  preis: 8.00, alkoholfrei: false },
      { name: "Pabst Blue Ribbon",          fass: false, flasche: true,  preis: 8.00, alkoholfrei: false }
    ]
  },
  {
    name: "HOBO",
    adresse: "Rathausgasse 24, Aarau",
    lat: 47.39234707409694, 
    lng: 8.043980404024822,
    biere: [
      // OFFEN / Fass (Stange = 3 dl)
      { name: "Paul 1 Lager",               fass: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Panaché",                    fass: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      // FLÄSCHLI / Spezial
      { name: "Stadtwächter Golden Ale",    fass: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Lägerebräu Stella Maris",    fass: false, flasche: true,  preis: 6.50, alkoholfrei: false },
      { name: "Innah IPA",                  fass: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Birra Moretti",              fass: false, flasche: true,  preis: 6.00, alkoholfrei: false },
      { name: "Birra Messina",              fass: false, flasche: true,  preis: 9.00, alkoholfrei: false },
      { name: "Kitchenbrew Windstill Neipa",fass: false, flasche: true,  preis: 6.00, alkoholfrei: true  }
    ]
  }
];
