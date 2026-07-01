/* ============================================================
   BLUE DIAMOND CO. — PRODUCT DATA
   ------------------------------------------------------------
   HOW TO ADD A PRODUCT
   Copy a block below and fill in EVERY field. The filter
   sidebar and product pages are built automatically from this
   data — any new brand, model, metal, etc. becomes a filter
   option on its own. Each product also gets its own page at
   product.html?id=THE-ID

   WATCH — fill all of these:
   {
     id:'unique-url-id',        // letters, numbers, dashes only
     category:'watch',
     brand:'Rolex',             // -> Brand filter
     model:'Datejust 41',       // -> Model filter
     ref:'126331',              // reference number
     title:'Rolex Datejust 41', // shown on cards & page
     caseSize:'41mm',           // -> Case Size filter
     year:'2020',               // -> Year filter
     caseMaterial:'Oystersteel',// -> Case Material filter
     strap:'Oyster Bracelet',   // -> Strap filter
     papers:'Yes',              // -> Papers filter: Yes | No | New Card
     availability:'In Stock',   // -> Availability filter: In Stock | Out of Stock
     condition:'Excellent',     // shown on page
     tone:'navy',               // placeholder colour: navy | blue | gold | plain
     description:'A short paragraph about the watch.',
     images:[]                  // optional: ['assets/img/products/x-1.jpg', ...]; leave [] for placeholders
   }

   JEWELLERY — fill all of these:
   {
     id:'unique-url-id',
     category:'jewellery',
     type:'Rings',              // -> Type filter (Rings/Necklaces/Pendants/Earrings/Bracelets)
     title:'Aurora Solitaire Ring',
     metal:'White Gold',        // -> Metal filter
     stone:'Diamond',           // -> Stone filter
     price:4250,                // number in GBP (shown + Price filter)
     detail:'18ct · 1.0ct Brilliant', // small line under the title
     tone:'gold',
     description:'A short paragraph about the piece.',
     images:[]
   }
   ============================================================ */

window.BDC_PRODUCTS = [

  /* ---------------- WATCHES ---------------- */
  { id:'richard-mille-67-02', category:'watch', brand:'Richard Mille', model:'67-02', ref:'RM 67-02',
    title:'Richard Mille 67-02 Alexis Pinturault', caseSize:'38.7mm', year:'2021', caseMaterial:'Quartz TPT & Carbon TPT',
    strap:'Blue Rubber Strap', papers:'Yes', availability:'Out of Stock', condition:'Excellent', tone:'navy',
    description:'A featherweight marvel from the Alexis Pinturault collection. The bezel and caseback are in Quartz TPT and the caseband in Carbon TPT, with the bridges hand-painted in the colours of the French flag. Sold to a VVIP.',
    images:['assets/img/products/rm-67-02-1.jpg','assets/img/products/rm-67-02-2.jpg','assets/img/products/rm-67-02-3.jpg','assets/img/products/rm-67-02-4.jpg','assets/img/products/rm-67-02-5.jpg','assets/img/products/rm-67-02-6.jpg','assets/img/products/rm-67-02-7.jpg'] },

  { id:'ap-royal-oak-15400sr', category:'watch', brand:'Audemars Piguet', model:'Royal Oak', ref:'15400SR',
    title:'AP Royal Oak 15400SR', caseSize:'41mm', year:'2016', caseMaterial:'Steel & Rose Gold',
    strap:'Steel & Rose Gold Bracelet', papers:'Yes', availability:'In Stock', condition:'Great', tone:'gold',
    description:'The two-tone Royal Oak in steel and rose gold — the 15400SR pairs the octagonal bezel and "Grande Tapisserie" dial with a warm gold accent. Supplied with box and papers.',
    images:['assets/img/products/ap-ro-15400sr-1.webp','assets/img/products/ap-ro-15400sr-2.webp','assets/img/products/ap-ro-15400sr-3.webp','assets/img/products/ap-ro-15400sr-4.webp'] },

  { id:'ap-royal-oak-15305or', category:'watch', brand:'Audemars Piguet', model:'Royal Oak', ref:'15305OR',
    title:'AP Royal Oak 15305OR', caseSize:'39mm', year:'2015', caseMaterial:'18ct Rose Gold',
    strap:'Rose Gold Bracelet', papers:'Yes', availability:'In Stock', condition:'Great', tone:'gold',
    description:'A full 18ct rose gold Royal Oak with a specialised dial and integrated bracelet — understated presence on the wrist.',
    images:['assets/img/products/ap-ro-15305or-1.webp','assets/img/products/ap-ro-15305or-2.webp','assets/img/products/ap-ro-15305or-3.webp','assets/img/products/ap-ro-15305or-4.webp','assets/img/products/ap-ro-15305or-5.webp'] },

  { id:'ap-royal-oak-15400', category:'watch', brand:'Audemars Piguet', model:'Royal Oak', ref:'15400',
    title:'AP Royal Oak 15400', caseSize:'41mm', year:'2018', caseMaterial:'18ct White Gold',
    strap:'White Gold Bracelet', papers:'No', availability:'In Stock', condition:'Great', tone:'navy',
    description:'The Royal Oak in solid 18ct white gold with a striking "chandelier" dial — a rare and refined take on the icon.',
    images:['assets/img/products/ap-ro-15400wg-1.webp','assets/img/products/ap-ro-15400wg-2.webp','assets/img/products/ap-ro-15400wg-3.webp','assets/img/products/ap-ro-15400wg-4.webp','assets/img/products/ap-ro-15400wg-5.webp'] },

  { id:'ap-royal-oak-26168sr', category:'watch', brand:'Audemars Piguet', model:'Royal Oak', ref:'26168SR',
    title:'AP Royal Oak 26168SR', caseSize:'39mm', year:'2009', caseMaterial:'Rose Gold',
    strap:'Steel & Rose Gold Bracelet', papers:'Yes', availability:'In Stock', condition:'Great', tone:'gold',
    description:'A two-tone Royal Oak with a rose gold case on a steel and rose gold bracelet — vintage 2009 character with everyday wearability.',
    images:['assets/img/products/ap-ro-26168sr-1.webp','assets/img/products/ap-ro-26168sr-2.webp','assets/img/products/ap-ro-26168sr-3.webp','assets/img/products/ap-ro-26168sr-4.webp','assets/img/products/ap-ro-26168sr-5.webp'] },

  { id:'ap-offshore-26231st', category:'watch', brand:'Audemars Piguet', model:'Royal Oak Offshore', ref:'26231ST',
    title:'AP Royal Oak Offshore 26231ST', caseSize:'37mm', year:'2023', caseMaterial:'Stainless Steel',
    strap:'Rubber Strap', papers:'New Card', availability:'In Stock', condition:'Great', tone:'blue',
    description:'A 37mm Royal Oak Offshore in stainless steel with a vivid blue dial on rubber — sporty proportions, new-card fresh.',
    images:['assets/img/products/ap-offshore-26231st-1.webp','assets/img/products/ap-offshore-26231st-2.webp','assets/img/products/ap-offshore-26231st-3.webp','assets/img/products/ap-offshore-26231st-4.webp','assets/img/products/ap-offshore-26231st-5.webp'] },

  { id:'ap-offshore-25940ok', category:'watch', brand:'Audemars Piguet', model:'Royal Oak Offshore', ref:'25940OK',
    title:'AP Royal Oak Offshore 25940OK', caseSize:'42mm', year:'Undated', caseMaterial:'18ct Rose Gold',
    strap:'Rubber Strap', papers:'No', availability:'In Stock', condition:'Good', tone:'gold',
    description:'The Royal Oak Offshore in 18ct rose gold with a diamond-set dial on rubber — maximum wrist presence.',
    images:['assets/img/products/ap-offshore-25940ok-1.webp','assets/img/products/ap-offshore-25940ok-2.webp','assets/img/products/ap-offshore-25940ok-3.webp','assets/img/products/ap-offshore-25940ok-4.webp'] },

  { id:'ap-offshore-25940sk-diamond', category:'watch', brand:'Audemars Piguet', model:'Royal Oak Offshore', ref:'25940SK',
    title:'AP Royal Oak Offshore 25940SK — Diamond Dial', caseSize:'42mm', year:'2008', caseMaterial:'Stainless Steel',
    strap:'Rubber Strap', papers:'Yes', availability:'In Stock', condition:'Great', tone:'navy',
    description:'A 2008 Royal Oak Offshore in stainless steel with a custom diamond dial on rubber — supplied with papers.',
    images:['assets/img/products/ap-offshore-25940sk-d-1.webp','assets/img/products/ap-offshore-25940sk-d-2.webp','assets/img/products/ap-offshore-25940sk-d-3.webp','assets/img/products/ap-offshore-25940sk-d-4.webp'] },

  { id:'ap-offshore-25940sk-white', category:'watch', brand:'Audemars Piguet', model:'Royal Oak Offshore', ref:'25940SK',
    title:'AP Royal Oak Offshore 25940SK — White Dial', caseSize:'42mm', year:'2008', caseMaterial:'Stainless Steel',
    strap:'Rubber Strap', papers:'No', availability:'In Stock', condition:'Good', tone:'navy',
    description:'A classic stainless steel Royal Oak Offshore with a white dial on a rubber strap — the everyday Offshore.',
    images:['assets/img/products/ap-offshore-25940sk-w-1.webp','assets/img/products/ap-offshore-25940sk-w-2.webp','assets/img/products/ap-offshore-25940sk-w-3.webp','assets/img/products/ap-offshore-25940sk-w-4.webp'] },

  { id:'ap-millenary-261450r', category:'watch', brand:'Audemars Piguet', model:'Millenary', ref:'261450R',
    title:'AP Millenary 261450R', caseSize:'44mm', year:'2013', caseMaterial:'18ct Rose Gold',
    strap:'Leather Strap', papers:'No', availability:'In Stock', condition:'Good', tone:'gold',
    description:'The distinctive off-centre Millenary in 18ct rose gold, 44mm, on a leather strap — an unmistakable AP silhouette.',
    images:['assets/img/products/ap-millenary-261450r-1.webp','assets/img/products/ap-millenary-261450r-2.webp','assets/img/products/ap-millenary-261450r-3.webp','assets/img/products/ap-millenary-261450r-4.webp','assets/img/products/ap-millenary-261450r-5.webp'] },

  /* ---------------- JEWELLERY ---------------- */
  { id:'infinity-necklace', category:'jewellery', type:'Necklaces', title:'Infinity Necklace',
    metal:'Rose Gold', stone:'Diamond', price:0, detail:'Rose Gold · 20-Point Diamonds', tone:'gold',
    description:'Our newly designed Infinity Necklace, crafted to symbolise the journey of life. Set with 20-pointer diamonds, each stone reflects the light of your path. As the chain loops endlessly, may it shine just as brightly as the choices you make and the paths you choose.',
    images:['assets/img/products/infinity-1.jpg','assets/img/products/infinity-2.jpg','assets/img/products/infinity-3.jpg','assets/img/products/infinity-4.jpg','assets/img/products/infinity-5.jpg','assets/img/products/infinity-6.jpg','assets/img/products/infinity-7.jpg','assets/img/products/infinity-8.jpg'] },

  { id:'ew-eternity-ring', category:'jewellery', type:'Rings', title:'East-West Eternity Ring',
    metal:'Gold', stone:'Diamond', price:0, detail:'Gold · Diamond Eternity', tone:'gold',
    description:'An East-West set eternity ring in gold, lined with brilliant diamonds all the way round — modern, striking, and made to stack or stand alone.',
    images:['assets/img/products/ew-eternity-ring-1.webp','assets/img/products/ew-eternity-ring-2.webp','assets/img/products/ew-eternity-ring-3.webp','assets/img/products/ew-eternity-ring-4.webp'] },

  { id:'initial-pendant', category:'jewellery', type:'Pendants', title:'Gold Diamond Initial Pendant',
    metal:'Gold', stone:'Diamond', price:0, detail:'Gold · Personalised Initial', tone:'gold',
    description:'A personalised gold initial pendant, fully set with diamonds — make it yours with any letter.',
    images:['assets/img/products/initial-pendant-1.webp','assets/img/products/initial-pendant-2.webp','assets/img/products/initial-pendant-3.webp','assets/img/products/initial-pendant-4.webp','assets/img/products/initial-pendant-5.webp'] },

  { id:'moon-necklace', category:'jewellery', type:'Necklaces', title:'Gold Diamond Moon Necklace',
    metal:'Gold', stone:'Diamond', price:0, detail:'Gold · Crescent Moon', tone:'gold',
    description:'A gold crescent-moon pendant pavé-set with diamonds on a fine chain — subtle everyday sparkle.',
    images:['assets/img/products/moon-necklace-1.webp','assets/img/products/moon-necklace-2.webp','assets/img/products/moon-necklace-3.webp','assets/img/products/moon-necklace-4.webp'] },

  { id:'padlock-necklace', category:'jewellery', type:'Necklaces', title:'Gold Diamond Padlock Necklace',
    metal:'Gold', stone:'Diamond', price:0, detail:'Gold · Padlock Pendant', tone:'gold',
    description:'A diamond-set gold padlock pendant on a matching chain — a bold, symbolic statement piece.',
    images:['assets/img/products/padlock-necklace-1.webp','assets/img/products/padlock-necklace-2.webp','assets/img/products/padlock-necklace-3.webp','assets/img/products/padlock-necklace-4.webp'] },

  { id:'isabella-earrings', category:'jewellery', type:'Earrings', title:'Isabella Hexagonal Earrings',
    metal:'Gold', stone:'Diamond', price:0, detail:'Gold · Hexagonal Cluster', tone:'gold',
    description:'Isabella hexagonal cluster earrings in gold, set with brilliant diamonds — geometric and eye-catching.',
    images:['assets/img/products/isabella-earrings-1.webp','assets/img/products/isabella-earrings-2.webp','assets/img/products/isabella-earrings-3.webp','assets/img/products/isabella-earrings-4.webp'] },

  { id:'penzi-tennis-bracelet', category:'jewellery', type:'Bracelets', title:'Penzi Diamond Tennis Bracelet',
    metal:'Gold', stone:'Diamond', price:0, detail:'Gold · Diamond Tennis', tone:'gold',
    description:'The Penzi tennis bracelet — a continuous line of diamonds set in gold, timeless around the wrist.',
    images:['assets/img/products/penzi-tennis-bracelet-1.webp','assets/img/products/penzi-tennis-bracelet-2.webp','assets/img/products/penzi-tennis-bracelet-3.webp','assets/img/products/penzi-tennis-bracelet-4.webp','assets/img/products/penzi-tennis-bracelet-5.webp'] }

];
