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
        offen       : true  = offen ausgeschenkt erhältlich, sonst false
        flasche     : true  = in Flasche erhältlich, sonst false
        preis       : Zahl in CHF, z.B. 7.50  (NICHT als String!)
        alkoholfrei : true  = alkoholfreies Bier, sonst false
   ============================================================================= */

window.BARS = [
  {
    name: "Platzhirsch",
    adresse: "Rathausgasse 9, Aarau",
    lat: 47.393090941470305,
    lng: 8.04354702994581,
    biere: [
      // OFFEN (Preis = 0.3 l)
      { name: "Saisonbier",                 offen: true,  flasche: false, preis: 6.00, alkoholfrei: false },
      { name: "Feldschlösschen Lager",      offen: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Panaché",                    offen: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Valaisanne Pale Ale",        offen: true,  flasche: false, preis: 6.00, alkoholfrei: false },
      { name: "Schneider Weisse Original",  offen: true,  flasche: false, preis: 6.00, alkoholfrei: false },
      // IM FLÄSCHLI (0.33 l)
      { name: "Corona Extra",               offen: false, flasche: true,  preis: 8.00, alkoholfrei: false },
      { name: "Feldschlösschen Braufrisch", offen: false, flasche: true,  preis: 6.50, alkoholfrei: false },
      { name: "Feldschlösschen Alkoholfrei",offen: false, flasche: true,  preis: 6.50, alkoholfrei: true  },
      { name: "Stadtwächter Golden Ale",    offen: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Blue Moon",                  offen: false, flasche: true,  preis: 8.00, alkoholfrei: false },
      { name: "Pabst Blue Ribbon",          offen: false, flasche: true,  preis: 8.00, alkoholfrei: false }
    ]
  },
  {
    name: "HOBO",
    adresse: "Rathausgasse 24, Aarau",
    lat: 47.39234707409694, 
    lng: 8.043980404024822,
    biere: [
      // OFFEN (Stange = 3 dl)
      { name: "Paul 1 Lager",               offen: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Panaché",                    offen: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      // FLÄSCHLI / Spezial
      { name: "Stadtwächter Golden Ale",    offen: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Lägerebräu Stella Maris",    offen: false, flasche: true,  preis: 6.50, alkoholfrei: false },
      { name: "Innah IPA",                  offen: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Birra Moretti",              offen: false, flasche: true,  preis: 6.00, alkoholfrei: false },
      { name: "Birra Messina",              offen: false, flasche: true,  preis: 9.00, alkoholfrei: false },
      { name: "Kitchenbrew Windstill Neipa",offen: false, flasche: true,  preis: 6.00, alkoholfrei: true  }
    ]
  },
  {
    name: "Theo",
    adresse: "Pelzgasse 29, Aarau",
    lat: 47.39235149525987,
    lng: 8.044456014723215,
    biere: [
      // OFFEN (Stange = 3 dl)
      { name: "Erusbacher Urtyp",                     offen: true,  flasche: false, preis: 4.80, alkoholfrei: false },
      // FLASCHEN (3.3 dl)
      { name: "Lägerebräu Original",                  offen: false, flasche: true,  preis: 6.00, alkoholfrei: false },
      { name: "Lägerebräu Stella Maris",              offen: false, flasche: true,  preis: 7.00, alkoholfrei: false },
      { name: "Lägerebräu Pale Ale",                  offen: false, flasche: true,  preis: 7.00, alkoholfrei: false },
      { name: "Lägerebräu Indian Pale Ale",           offen: false, flasche: true,  preis: 7.00, alkoholfrei: false },
      { name: "Lägerebräu Weizen",                    offen: false, flasche: true,  preis: 8.00, alkoholfrei: false },
      { name: "Lägerebräu Federleicht",               offen: false, flasche: true,  preis: 5.50, alkoholfrei: true  },
      { name: "Lägerebräu Barrique Blend Cognac Imperial Stout", offen: false, flasche: true, preis: 11.50, alkoholfrei: false }
    ]
  }
];
