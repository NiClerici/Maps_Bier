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
      { name: "Schneider Weisse",           offen: true,  flasche: false, preis: 6.00, alkoholfrei: false },
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
  },
  {
    name: "The Penny",
    adresse: "Bahnhofstrasse 57, 5000 Aarau",
    lat: 47.391809944596076,
    lng: 8.049225338836765,
    biere: [
      // OFFEN / ON TAP (kleinere Grösse: 2.5/3.3 dl)
      { name: "Feldschlösschen Lager",              offen: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Feldschlösschen Helvetic",           offen: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Feldschlösschen Braufrisch",         offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Panaché",                            offen: true,  flasche: false, preis: 5.00, alkoholfrei: false },
      { name: "Kronenburg 1664 Blanc",              offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Valaisanne Pale Ale",                offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Super Bock Lager",                   offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Brooklyn Stonewall IPA",             offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Guinness",                           offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Guinness IPA",                       offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Guinness Hop House 13 Lager",        offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Kilkenny Irish Red Ale",             offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Smithwicks",                         offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Grimbergen Blonde",                  offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Grimbergen Season",                  offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      { name: "Magners Apple Cider",                offen: true,  flasche: false, preis: 5.90, alkoholfrei: false },
      // FLASCHEN
      { name: "Magners Pear Cider",                 offen: false, flasche: true,  preis: 10.50, alkoholfrei: false, groesse: "0.5 l" },
      { name: "Magners Berry Cider",                offen: false, flasche: true,  preis: 10.50, alkoholfrei: false, groesse: "0.5 l" },
      { name: "Schneider Weisse",                   offen: false, flasche: true,  preis: 8.50, alkoholfrei: false, groesse: "0.5 l" },
      { name: "Super Bock Gluten Free",             offen: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Smirnoff Ice",                       offen: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      // ALKOHOLFREI
      { name: "Feldschlösschen Alkoholfrei",        offen: false, flasche: true,  preis: 6.20, alkoholfrei: true },
      { name: "Guinness 0.0",                       offen: false, flasche: true,  preis: 8.60, alkoholfrei: true },
      { name: "Schneider Weisse Alkoholfrei",       offen: false, flasche: true,  preis: 7.80, alkoholfrei: true, groesse: "0.5 l" }
    ]
  },
  {
    name: "Tuchlaube Café Bar",
    adresse: "Metzgergasse 18, 5000 Aarau",
    lat: 47.394061022366174,
    lng: 8.043920880739948,
    biere: [
      // OFFEN (Preis = 3 dl)
      { name: "Boxer",                      offen: true,  flasche: false, preis: 5.50, alkoholfrei: false },
      { name: "Saisonales Bier",            offen: true,  flasche: false, preis: 6.00, alkoholfrei: false },
      // FLASCHEN (3.3 dl)
      { name: "Tuchlaube Lager",            offen: false, flasche: true,  preis: 6.50, alkoholfrei: false },
      { name: "Stadtwächter Irma Golden Ale", offen: false, flasche: true, preis: 8.00, alkoholfrei: false },
      { name: "Köhler-Bier Amber",          offen: false, flasche: true,  preis: 7.00, alkoholfrei: false },
      { name: "Appenzeller IPA",            offen: false, flasche: true,  preis: 7.50, alkoholfrei: false },
      { name: "Appenzeller Weizenbier",     offen: false, flasche: true,  preis: 8.50, alkoholfrei: false, groesse: "0.5 l" },
      // ALKOHOLFREI
      { name: "Chopfab Bleifrei Pale Ale",  offen: false, flasche: true,  preis: 6.50, alkoholfrei: true },
      { name: "Birra Moretti Zero",         offen: false, flasche: true,  preis: 6.50, alkoholfrei: true }
    ]
  }
];
