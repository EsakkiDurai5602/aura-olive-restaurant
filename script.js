/**
 * AURA & OLIVE - Modern Culinary House & Seat Booking Engine
 * Full-Stack JavaScript Application Logic with Supabase & Vercel Support
 * Strictly 0 Unicode Emojis - All Visuals Powered by SVG & CSS
 */

// ============================================================================
// 1. DATA REPOSITORIES & SEED STATE
// ============================================================================

const ZONES_DATA = [
  {
    id: 'main_hall',
    name: 'Main Dining Hall',
    tagline: 'Grand Chandeliers & Live Open Kitchen',
    description: 'Bask in the warm glow of artisanal brass chandeliers with a clear view of our culinary team crafting delicacies in the open woodfired hearth.',
    topLandmark: 'Open Woodfired Hearth & Executive Kitchen',
    bottomLandmark: 'Main Entrance & Hostess Reception',
    ambientNote: 'Warm acoustic jazz, vibrant social murmur',
    bestFor: 'Dinner parties, social gatherings, celebrations',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'outdoor_terrace',
    name: 'Garden Terrace',
    tagline: 'Fairy Lights, Olive Trees & Fresh Breeze',
    description: 'Surrounded by mature Tuscan olive trees, cascading ivy, and gentle heaters for cool evenings, offering an enchanting al-fresco Mediterranean experience.',
    topLandmark: 'Water Fountain & Floral Rose Trellis',
    bottomLandmark: 'Garden Courtyard Pathway',
    ambientNote: 'Gentle water fountain, soft breeze, starlight ambiance',
    bestFor: 'Romantic dates, sunset dining, leisurely weekend lunches',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'skyline_rooftop',
    name: 'Skyline Rooftop Lounge',
    tagline: 'Panoramic City Views & Signature Mixology',
    description: 'Elevate your evening on our glass-enclosed 18th floor observation deck overlooking the downtown skyline with direct access to our mixology bar.',
    topLandmark: 'Panoramic Glass Railing & Skyline Horizon',
    bottomLandmark: 'Botanical Mixology Cocktail Bar',
    ambientNote: 'Contemporary deep house lounge beats, sunset golden hour glow',
    bestFor: 'Cocktails, anniversaries, executive dining, nightcaps',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'vip_cellar',
    name: 'The Sommelier VIP Cellar',
    tagline: 'Private Leather Booths & Vintage Wine Vault',
    description: 'Subterranean stone walls lined with over 1,400 vintage reserves, dedicated private waitstaff, and plush sound-insulated velvet and leather booths.',
    topLandmark: 'Vintage Reserve Wine Library (1,400+ Bottles)',
    bottomLandmark: 'Private Cellar Vault Entrance',
    ambientNote: 'Intimate, whisper-quiet, bespoke classical recordings',
    bestFor: 'High-stakes business deals, confidential meetings, private proposals',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80'
  }
];

const INITIAL_TABLES = [
  // Main Dining Hall
  { id: 'T-101', table_number: 1, capacity: 2, zone: 'main_hall', status: 'available', features: ['Window View', 'Cozy High Table'], shape: 'round', x: 20, y: 24 },
  { id: 'T-102', table_number: 2, capacity: 2, zone: 'main_hall', status: 'available', features: ['Window View', 'Direct Natural Light'], shape: 'round', x: 20, y: 48 },
  { id: 'T-103', table_number: 3, capacity: 4, zone: 'main_hall', status: 'available', features: ['Centerpiece View', 'Spacious Seating'], shape: 'rect', x: 44, y: 26 },
  { id: 'T-104', table_number: 4, capacity: 4, zone: 'main_hall', status: 'reserved', features: ['Open Kitchen Sightline', 'Plush Cushions'], shape: 'rect', x: 44, y: 52 },
  { id: 'T-105', table_number: 5, capacity: 6, zone: 'main_hall', status: 'available', features: ['Family Table', 'Near Hearth'], shape: 'rect', x: 44, y: 78 },
  { id: 'T-106', table_number: 6, capacity: 8, zone: 'main_hall', status: 'available', features: ['Grand Banquet', 'Chandelier Overhead'], shape: 'rect', x: 76, y: 36 },
  { id: 'T-107', table_number: 7, capacity: 4, zone: 'main_hall', status: 'occupied', features: ['Corner Booth', 'Quiet Acoustic'], shape: 'booth', x: 76, y: 72 },

  // Garden Terrace
  { id: 'T-201', table_number: 11, capacity: 2, zone: 'outdoor_terrace', status: 'available', features: ['Under Olive Tree', 'Fairy Lights'], shape: 'round', x: 22, y: 30 },
  { id: 'T-202', table_number: 12, capacity: 2, zone: 'outdoor_terrace', status: 'available', features: ['Water Fountain Vista', 'Heated Lamp'], shape: 'round', x: 22, y: 64 },
  { id: 'T-203', table_number: 13, capacity: 4, zone: 'outdoor_terrace', status: 'available', features: ['Floral Pergola', 'Garden Breeze'], shape: 'rect', x: 50, y: 32 },
  { id: 'T-204', table_number: 14, capacity: 4, zone: 'outdoor_terrace', status: 'reserved', features: ['Courtyard Center', 'Sunset Facing'], shape: 'rect', x: 50, y: 70 },
  { id: 'T-205', table_number: 15, capacity: 6, zone: 'outdoor_terrace', status: 'available', features: ['Veranda Nook', 'Overhead Canopy'], shape: 'rect', x: 78, y: 50 },

  // Skyline Rooftop
  { id: 'T-301', table_number: 21, capacity: 2, zone: 'skyline_rooftop', status: 'available', features: ['Edge Glass Railing', 'City Skyline Panoramas'], shape: 'round', x: 24, y: 26 },
  { id: 'T-302', table_number: 22, capacity: 2, zone: 'skyline_rooftop', status: 'available', features: ['Golden Hour Horizon', 'Glass Railing'], shape: 'round', x: 24, y: 68 },
  { id: 'T-303', table_number: 23, capacity: 4, zone: 'skyline_rooftop', status: 'available', features: ['Firepit Adjacency', 'Lounge Seating'], shape: 'rect', x: 52, y: 32 },
  { id: 'T-304', table_number: 24, capacity: 4, zone: 'skyline_rooftop', status: 'available', features: ['Cocktail Bar Access', 'High Stools'], shape: 'rect', x: 52, y: 72 },
  { id: 'T-305', table_number: 25, capacity: 6, zone: 'skyline_rooftop', status: 'reserved', features: ['Skyline Cabana', 'Private Music Zone'], shape: 'booth', x: 80, y: 52 },

  // VIP Cellar
  { id: 'T-401', table_number: 31, capacity: 2, zone: 'vip_cellar', status: 'available', features: ['Intimate Vault Nook', 'Sommelier Service'], shape: 'booth', x: 26, y: 32 },
  { id: 'T-402', table_number: 32, capacity: 4, zone: 'vip_cellar', status: 'available', features: ['Leather Upholstery', 'Private Reserve Wall'], shape: 'booth', x: 26, y: 72 },
  { id: 'T-403', table_number: 33, capacity: 6, zone: 'vip_cellar', status: 'available', features: ['Curated Wine Racks', 'Acoustic Privacy'], shape: 'booth', x: 62, y: 36 },
  { id: 'T-404', table_number: 34, capacity: 8, zone: 'vip_cellar', status: 'reserved', features: ['Presidential Boardroom', 'Private Sommelier'], shape: 'rect', x: 66, y: 74 }
];

const MENU_DATA = [
  {
    id: 'm-01',
    name: 'Charred Spanish Octopus',
    description: 'Slow-braised then flame-seared tender octopus tentacle, saffron potato mousseline, smoked paprika emulsion, micro cilantro.',
    price: 24,
    category: 'starters',
    dietary_tags: ['gluten_free', 'chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    calories: 380,
    is_chef_special: true
  },
  {
    id: 'm-02',
    name: 'Heirloom Burrata & Roasted Figs',
    description: 'Creamy Pugliese burrata, caramelized Mission figs, aged 25-year balsamic glaze, crushed Sicilian pistachios, toasted sourdough crisps.',
    price: 21,
    category: 'starters',
    dietary_tags: ['vegetarian'],
    image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
    calories: 420,
    is_chef_special: false
  },
  {
    id: 'm-03',
    name: 'Wagyu Beef Carpaccio',
    description: 'Paper-thin Japanese A5 wagyu tenderloin, white truffle oil, shaved 36-month Parmigiano-Reggiano, caperberries, peppery baby arugula.',
    price: 26,
    category: 'starters',
    dietary_tags: ['gluten_free', 'chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    calories: 340,
    is_chef_special: true
  },
  {
    id: 'm-04',
    name: 'Dry-Aged Prime Tomahawk (42 oz)',
    description: '45-day dry-aged bone-in ribeye carved tableside, served with roasted bone marrow butter, black garlic jus, and charred seasonal alliums.',
    price: 135,
    category: 'chef_specials',
    dietary_tags: ['gluten_free', 'chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    calories: 1250,
    is_chef_special: true
  },
  {
    id: 'm-05',
    name: 'Pan-Roasted Chilean Sea Bass',
    description: 'Glazed with sweet miso mirin, served over baby bok choy, lemongrass ginger dashi broth, and crispy lotus root chips.',
    price: 48,
    category: 'chef_specials',
    dietary_tags: ['gluten_free', 'chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    calories: 520,
    is_chef_special: true
  },
  {
    id: 'm-06',
    name: 'Duck Breast à l’Orange Sanguine',
    description: 'Crispy skin Magret duck breast, blood orange reduction, parsnip puree, buttered Romanesco florets.',
    price: 42,
    category: 'woodfired_mains',
    dietary_tags: ['gluten_free'],
    image_url: 'https://images.unsplash.com/photo-1514944298352-78d1d86d70a3?auto=format&fit=crop&w=800&q=80',
    calories: 680,
    is_chef_special: false
  },
  {
    id: 'm-07',
    name: 'Wood-Oven Rack of Lamb',
    description: 'Herb-crusted Colorado lamb cutlets, mint-infused pea puree, fondant rosemary potatoes, lamb demi-glace.',
    price: 52,
    category: 'woodfired_mains',
    dietary_tags: ['gluten_free'],
    image_url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    calories: 740,
    is_chef_special: true
  },
  {
    id: 'm-08',
    name: 'Handmade Black Truffle Tagliolini',
    description: 'Fresh egg pasta tossed in churned Normandy butter, 30-month aged Grana Padano, generously shaved fresh black winter truffles.',
    price: 38,
    category: 'artisan_pastas',
    dietary_tags: ['vegetarian', 'chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80',
    calories: 610,
    is_chef_special: true
  },
  {
    id: 'm-09',
    name: 'Maine Lobster Ravioli',
    description: 'Fresh striped pasta pillows filled with sweet Atlantic lobster meat, mascarpone, saffron vermouth bisque, tarragon oil.',
    price: 44,
    category: 'artisan_pastas',
    dietary_tags: ['chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    calories: 590,
    is_chef_special: false
  },
  {
    id: 'm-10',
    name: 'Roasted Forest Morel & King Oyster Steak',
    description: 'Glazed king oyster mushrooms, wild morel ragout, creamy cauliflower-truffle puree, crispy shallot crisps.',
    price: 32,
    category: 'plant_based',
    dietary_tags: ['vegan', 'gluten_free'],
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    calories: 390,
    is_chef_special: false
  },
  {
    id: 'm-12',
    name: 'Valrhona Dark Chocolate Sphère',
    description: '70% Guanaja chocolate dome melted tableside with hot salted caramel, vanilla bean gelato, hazelnut praline crumble.',
    price: 18,
    category: 'desserts',
    dietary_tags: ['vegetarian', 'chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    calories: 510,
    is_chef_special: true
  },
  {
    id: 'm-14',
    name: 'Smoked Rosemary Old Fashioned',
    description: 'WhistlePig 10-Yr Rye, house spiced demerara syrup, Angostura bitters, served under a glass cloche with smoked applewood essence.',
    price: 22,
    category: 'handcrafted_cocktails',
    dietary_tags: ['chef_signature'],
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    calories: 210,
    is_chef_special: true
  }
];

const ADDONS_DATA = [
  {
    id: 'addon-1',
    name: 'Sommelier Wine Pairing Experience',
    price: 55,
    description: 'Four curated glasses of reserve wine selected by Head Sommelier to match courses.'
  },
  {
    id: 'addon-2',
    name: 'Chef’s Amuse-Bouche & Caviar Welcome',
    price: 38,
    description: 'Imperial Osetra caviar on toasted brioche with traditional garnishes and chilled artisan vodka sip.'
  },
  {
    id: 'addon-3',
    name: 'Celebration Sparkling Champagne & Custom Cake',
    price: 65,
    description: 'Bottle of Premier Cru Champagne on ice and a personalized dark chocolate gateau.'
  },
  {
    id: 'addon-4',
    name: 'Artisan Floral Table Centerpiece',
    price: 45,
    description: 'Fresh seasonal roses and eucalyptus centerpiece custom arranged for dining.'
  }
];

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author_name: 'Victoria Sterling',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Yesterday',
    comment: 'The skyline terrace table at twilight was an unforgettable experience. The Chilean Sea Bass melted in our mouths, and the sommelier pairing was masterfully executed. Booking online was effortless.',
    visit_type: 'Anniversary Dinner',
    verified: true
  },
  {
    id: 'rev-2',
    author_name: 'Marcus Vance',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 days ago',
    comment: 'Hosted our quarterly executive dinner in the Sommelier VIP Cellar. Exceptional privacy, impeccable service, and the Dry-Aged Tomahawk was carved flawlessly tableside. Highly recommended.',
    visit_type: 'Business Dining',
    verified: true
  },
  {
    id: 'rev-3',
    author_name: 'Elena Rostova',
    author_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Last week',
    comment: 'The hand-rolled black truffle tagliolini is worth traveling across the city for. Beautiful interior decor, warm lighting, and the live jazz in the main hall creates the perfect ambiance.',
    visit_type: 'Romantic Date',
    verified: true
  }
];

const INITIAL_RESERVATIONS = [
  {
    id: 'res-01',
    reference_code: 'AO-74192',
    guest_name: 'Sophia Laurent',
    guest_email: 'sophia.laurent@luxurymail.com',
    guest_phone: '+1 (555) 392-1084',
    guest_count: 2,
    reservation_date: '2026-10-30',
    reservation_time: '19:30',
    zone: 'skyline_rooftop',
    table_id: 'T-301',
    table_number: 21,
    occasion: 'Anniversary',
    special_requests: 'Window side please with celebration dessert candles',
    add_ons: ['Celebration Sparkling Champagne & Custom Cake'],
    status: 'confirmed',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'res-02',
    reference_code: 'AO-88231',
    guest_name: 'David Harrington',
    guest_email: 'd.harrington@globalholdings.com',
    guest_phone: '+1 (555) 749-8812',
    guest_count: 6,
    reservation_date: '2026-10-31',
    reservation_time: '20:00',
    zone: 'vip_cellar',
    table_id: 'T-403',
    table_number: 33,
    occasion: 'Business Dinner',
    special_requests: 'Executive confidential meeting, sommelier on standby',
    add_ons: ['Sommelier Wine Pairing Experience'],
    status: 'confirmed',
    created_at: new Date(Date.now() - 43200000).toISOString()
  }
];

// ============================================================================
// 2. STATE STORE & PERSISTENCE
// ============================================================================

const state = {
  currentZone: 'main_hall',
  selectedTable: null,
  selectedAddons: new Set(),
  tables: [],
  reservations: [],
  menu: [...MENU_DATA],
  reviews: [...INITIAL_REVIEWS],
  currentUser: {
    name: 'Sophia Laurent',
    email: 'sophia.laurent@luxurymail.com',
    role: 'customer'
  },
  supabaseClient: null,
  isSupabaseConnected: false
};

// Initialize State from LocalStorage
function initLocalData() {
  const storedTables = localStorage.getItem('aura_tables');
  state.tables = storedTables ? JSON.parse(storedTables) : [...INITIAL_TABLES];

  const storedRes = localStorage.getItem('aura_reservations');
  state.reservations = storedRes ? JSON.parse(storedRes) : [...INITIAL_RESERVATIONS];

  const storedReviews = localStorage.getItem('aura_reviews');
  if (storedReviews) state.reviews = JSON.parse(storedReviews);

  const storedUser = localStorage.getItem('aura_current_user');
  if (storedUser) state.currentUser = JSON.parse(storedUser);
}

function persistState() {
  localStorage.setItem('aura_tables', JSON.stringify(state.tables));
  localStorage.setItem('aura_reservations', JSON.stringify(state.reservations));
  localStorage.setItem('aura_reviews', JSON.stringify(state.reviews));
  localStorage.setItem('aura_current_user', JSON.stringify(state.currentUser));
}

// ============================================================================
// 3. SUPABASE INTEGRATION ENGINE
// ============================================================================

async function initSupabase() {
  const url = localStorage.getItem('aura_supabase_url') || '';
  const key = localStorage.getItem('aura_supabase_key') || '';

  if (url && key && window.supabase) {
    try {
      state.supabaseClient = window.supabase.createClient(url, key);
      // Quick test query to verify connection
      const { error } = await state.supabaseClient.from('restaurant_tables').select('id').limit(1);
      
      if (!error) {
        state.isSupabaseConnected = true;
        updateSupabaseBanner(true, 'Connected to Supabase (Production Database Active)');
        await syncFromSupabase();
        return;
      }
    } catch {
      // Fallback
    }
  }

  // Fallback to local demo store
  state.isSupabaseConnected = false;
  updateSupabaseBanner(false, 'Database Mode: Local Storage Demo (Ready to connect with Supabase)');
}

function updateSupabaseBanner(connected, text) {
  const dot = document.getElementById('bannerDot');
  const label = document.getElementById('bannerStatusText');
  if (dot) dot.classList.toggle('connected', connected);
  if (label) label.textContent = text;
}

async function syncFromSupabase() {
  if (!state.supabaseClient) return;

  try {
    // 1. Fetch tables
    const { data: dbTables } = await state.supabaseClient.from('restaurant_tables').select('*');
    if (dbTables && dbTables.length > 0) {
      state.tables = dbTables;
    }

    // 2. Fetch reservations
    const { data: dbRes } = await state.supabaseClient.from('reservations').select('*').order('created_at', { ascending: false });
    if (dbRes && dbRes.length > 0) {
      state.reservations = dbRes;
    }

    // 3. Fetch reviews
    const { data: dbReviews } = await state.supabaseClient.from('reviews').select('*').order('created_at', { ascending: false });
    if (dbReviews && dbReviews.length > 0) {
      state.reviews = dbReviews;
    }

    renderFloorPlan();
    renderReservationsList();
    renderReviews();
    updateAdminMetrics();
  } catch {
    // In case of network interruption, continue smoothly
  }
}

async function pushReservationToSupabase(reservation) {
  if (state.supabaseClient && state.isSupabaseConnected) {
    try {
      await state.supabaseClient.from('reservations').insert([
        {
          reference_code: reservation.reference_code,
          guest_name: reservation.guest_name,
          guest_email: reservation.guest_email,
          guest_phone: reservation.guest_phone,
          guest_count: reservation.guest_count,
          reservation_date: reservation.reservation_date,
          reservation_time: reservation.reservation_time,
          zone: reservation.zone,
          table_id: reservation.table_id,
          table_number: reservation.table_number,
          occasion: reservation.occasion,
          special_requests: reservation.special_requests,
          add_ons: reservation.add_ons,
          status: reservation.status
        }
      ]);
      // Update table status in Supabase
      await state.supabaseClient.from('restaurant_tables').update({ status: 'reserved' }).eq('id', reservation.table_id);
    } catch {
      // Local fallback continues uninterrupted
    }
  }
}

// ============================================================================
// 4. FLOOR PLAN & SEATING RENDERER
// ============================================================================

function renderZonesShowcase() {
  const container = document.getElementById('zonesCardGrid');
  if (!container) return;

  container.innerHTML = ZONES_DATA.map(zone => `
    <div class="zone-card">
      <div class="zone-image-wrap">
        <img src="${zone.image}" alt="${zone.name}" class="zone-img" loading="lazy">
        <span class="zone-badge-tag">${zone.tagline}</span>
      </div>
      <div class="zone-card-body">
        <h3 class="zone-name">${zone.name}</h3>
        <span class="zone-tagline">${zone.tagline}</span>
        <p class="zone-desc">${zone.description}</p>
        <div class="zone-meta-list">
          <div class="zone-meta-row">
            <svg class="svg-icon-xs text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span><strong>Acoustics:</strong> ${zone.ambientNote}</span>
          </div>
          <div class="zone-meta-row">
            <svg class="svg-icon-xs text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span><strong>Ideal for:</strong> ${zone.bestFor}</span>
          </div>
        </div>
        <button type="button" class="btn-zone-select" onclick="switchZone('${zone.id}')">
          <span>Book in ${zone.name}</span>
          <svg class="svg-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function switchZone(zoneId) {
  state.currentZone = zoneId;
  state.selectedTable = null;

  // Update tabs active state
  document.querySelectorAll('.zone-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.zone === zoneId);
  });

  // Update labels
  const zoneInfo = ZONES_DATA.find(z => z.id === zoneId);
  if (zoneInfo) {
    const titleEl = document.getElementById('floorPlanZoneTitle');
    const tagEl = document.getElementById('floorPlanZoneTagline');
    const topLandmark = document.getElementById('landmarkTopLabel');
    const bottomLandmark = document.getElementById('landmarkBottomLabel');

    if (titleEl) titleEl.textContent = `${zoneInfo.name} Seating Plan`;
    if (tagEl) tagEl.textContent = zoneInfo.tagline;
    if (topLandmark) topLandmark.textContent = zoneInfo.topLandmark;
    if (bottomLandmark) bottomLandmark.textContent = zoneInfo.bottomLandmark;
  }

  updateSelectedTableCallout(null);
  renderFloorPlan();

  // Scroll smoothly to floor plan
  const planSection = document.getElementById('seatBooking');
  if (planSection) {
    planSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderFloorPlan() {
  const container = document.getElementById('tablesLayer');
  if (!container) return;

  const currentZoneTables = state.tables.filter(t => t.zone === state.currentZone);

  container.innerHTML = currentZoneTables.map(t => {
    const isSelected = state.selectedTable && state.selectedTable.id === t.id;
    let statusClass = `status-${t.status}`;
    if (isSelected) statusClass = 'status-selected';

    return `
      <div 
        class="table-node ${statusClass}" 
        style="left: ${t.x}%; top: ${t.y}%;" 
        onclick="handleTableClick('${t.id}')"
        title="Table #${t.table_number} (${t.capacity} Guests) - ${t.status}"
      >
        <div class="table-shape shape-${t.shape}">
          <span class="table-number-label">T-${t.table_number}</span>
          <span class="table-capacity-label">${t.capacity} Seats</span>
        </div>
      </div>
    `;
  }).join('');
}

function handleTableClick(tableId) {
  const table = state.tables.find(t => t.id === tableId);
  if (!table) return;

  if (table.status === 'reserved' || table.status === 'occupied') {
    alert(`Table #${table.table_number} is already reserved for this service. Please choose another table highlighted in green.`);
    return;
  }

  if (table.status === 'maintenance') {
    alert(`Table #${table.table_number} is currently offline for maintenance.`);
    return;
  }

  state.selectedTable = table;
  updateSelectedTableCallout(table);
  renderFloorPlan();
}

function updateSelectedTableCallout(table) {
  const callout = document.getElementById('selectedTableCallout');
  const title = document.getElementById('calloutTableTitle');
  const meta = document.getElementById('calloutTableMeta');
  const tags = document.getElementById('calloutTableFeatures');
  const badge = document.getElementById('selectedTableBadge');
  const confirmBtn = document.getElementById('confirmBookingBtn');
  const confirmBtnText = document.getElementById('confirmBookingBtnText');
  const guestsSelect = document.getElementById('resGuests');

  if (!table) {
    if (callout) callout.classList.remove('active');
    if (title) title.textContent = 'No Table Selected Yet';
    if (meta) meta.textContent = 'Click any green glowing table on the floor plan';
    if (tags) tags.innerHTML = '';
    if (badge) {
      badge.textContent = 'Select a Table';
      badge.className = 'badge-status-gold';
    }
    if (confirmBtn) confirmBtn.disabled = true;
    if (confirmBtnText) confirmBtnText.textContent = 'Select a Table to Continue';
    return;
  }

  if (callout) callout.classList.add('active');
  if (title) title.textContent = `Table #${table.table_number} Selected (${table.capacity} Guests)`;
  if (meta) meta.textContent = `${ZONES_DATA.find(z => z.id === table.zone)?.name || 'Dining Area'} • Shape: ${table.shape.toUpperCase()}`;
  if (tags) {
    tags.innerHTML = (table.features || []).map(f => `<span class="callout-tag-pill">${f}</span>`).join('');
  }
  if (badge) {
    badge.textContent = `Table #${table.table_number} Ready`;
    badge.className = 'badge-status-green';
  }
  if (confirmBtn) confirmBtn.disabled = false;
  if (confirmBtnText) confirmBtnText.textContent = `Confirm Reservation for Table #${table.table_number}`;

  // Match guest count dropdown to table capacity
  if (guestsSelect) {
    guestsSelect.value = String(Math.min(table.capacity, 8));
  }
}

// ============================================================================
// 5. ADD-ON EXPERIENCES
// ============================================================================

function renderAddons() {
  const container = document.getElementById('addonsList');
  if (!container) return;

  container.innerHTML = ADDONS_DATA.map(addon => {
    const isChecked = state.selectedAddons.has(addon.id);
    return `
      <div class="addon-card ${isChecked ? 'selected' : ''}" onclick="toggleAddon('${addon.id}')">
        <div class="addon-info-left">
          <span class="addon-name">${addon.name}</span>
          <span class="addon-desc">${addon.description}</span>
        </div>
        <div class="addon-price-tag">+$${addon.price}</div>
      </div>
    `;
  }).join('');
}

function toggleAddon(addonId) {
  if (state.selectedAddons.has(addonId)) {
    state.selectedAddons.delete(addonId);
  } else {
    state.selectedAddons.add(addonId);
  }
  renderAddons();
}

// ============================================================================
// 6. RESERVATION SUBMISSION & BOARDING PASS
// ============================================================================

function handleReservationSubmit(e) {
  e.preventDefault();

  if (!state.selectedTable) {
    alert('Please click on a table on the floor plan before booking.');
    return;
  }

  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = parseInt(document.getElementById('resGuests').value, 10);
  const occasion = document.getElementById('resOccasion').value;
  const name = document.getElementById('resName').value.trim();
  const email = document.getElementById('resEmail').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const notes = document.getElementById('resNotes').value.trim();

  if (!date || !time || !name || !email) {
    alert('Please fill out all required contact fields.');
    return;
  }

  // Generate Reference Code: AO-XXXXX
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const refCode = `AO-${randomSuffix}`;

  // Selected add-on names
  const addonsList = Array.from(state.selectedAddons).map(id => {
    const item = ADDONS_DATA.find(a => a.id === id);
    return item ? item.name : id;
  });

  const newReservation = {
    id: 'res-' + Date.now(),
    reference_code: refCode,
    guest_name: name,
    guest_email: email,
    guest_phone: phone,
    guest_count: guests,
    reservation_date: date,
    reservation_time: time,
    zone: state.selectedTable.zone,
    table_id: state.selectedTable.id,
    table_number: state.selectedTable.table_number,
    occasion,
    special_requests: notes,
    add_ons: addonsList,
    status: 'confirmed',
    created_at: new Date().toISOString()
  };

  // Mark table as reserved locally
  state.selectedTable.status = 'reserved';
  const tableRef = state.tables.find(t => t.id === state.selectedTable.id);
  if (tableRef) tableRef.status = 'reserved';

  // Add to reservations list
  state.reservations.unshift(newReservation);
  persistState();

  // Push to Supabase if connected
  pushReservationToSupabase(newReservation);

  // Trigger Celebration Confetti (Pure visual effect, no emojis)
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#ffffff', '#3b82f6']
    });
  }

  // Show Boarding Pass Modal
  showConfirmationTicket(newReservation);

  // Reset table selection
  state.selectedTable = null;
  state.selectedAddons.clear();
  renderAddons();
  updateSelectedTableCallout(null);
  renderFloorPlan();
  renderReservationsList();
  updateAdminMetrics();
}

function showConfirmationTicket(reservation) {
  const modal = document.getElementById('confirmationModal');
  if (!modal) return;

  const zoneInfo = ZONES_DATA.find(z => z.id === reservation.zone);

  document.getElementById('passRefCode').textContent = reservation.reference_code;
  document.getElementById('passStatus').textContent = reservation.status.toUpperCase();
  document.getElementById('passGuestName').textContent = reservation.guest_name;
  document.getElementById('passGuests').textContent = `${reservation.guest_count} Guests`;
  document.getElementById('passDate').textContent = reservation.reservation_date;
  document.getElementById('passTime').textContent = reservation.reservation_time;
  document.getElementById('passZone').textContent = zoneInfo ? zoneInfo.name : reservation.zone;
  document.getElementById('passTable').textContent = `Table #${reservation.table_number || 'N/A'}`;

  const addonsBox = document.getElementById('passAddonsBox');
  const addonsList = document.getElementById('passAddonsList');
  if (addonsBox && addonsList) {
    if (reservation.add_ons && reservation.add_ons.length > 0) {
      addonsBox.style.display = 'block';
      addonsList.innerHTML = reservation.add_ons.map(a => `<div>• ${a}</div>`).join('');
    } else {
      addonsBox.style.display = 'none';
    }
  }

  modal.classList.add('active');
}

// ============================================================================
// 7. CHEF'S MENU EXPLORER
// ============================================================================

let currentMenuCategory = 'all';
let currentDietaryFilter = null;
let currentMenuSearch = '';

function renderMenu() {
  const container = document.getElementById('menuGrid');
  if (!container) return;

  const filtered = state.menu.filter(item => {
    // Category match
    const matchCat = currentMenuCategory === 'all' || item.category === currentMenuCategory;
    
    // Dietary match
    const matchDiet = !currentDietaryFilter || (item.dietary_tags && item.dietary_tags.includes(currentDietaryFilter));
    
    // Search match
    const q = currentMenuSearch.toLowerCase();
    const matchSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q);

    return matchCat && matchDiet && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p>No dishes found matching your current filter criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="menu-item-card">
      <div class="menu-item-image-wrap">
        <img src="${item.image_url}" alt="${item.name}" class="menu-item-img" loading="lazy">
        <div class="menu-item-price-tag">$${item.price}</div>
      </div>
      <div class="menu-item-body">
        <div class="menu-item-header">
          <h4 class="menu-item-name">${item.name}</h4>
        </div>
        <p class="menu-item-desc">${item.description}</p>
        <div class="menu-item-footer">
          <div class="menu-diet-tags">
            ${(item.dietary_tags || []).map(tag => {
              const isSig = tag === 'chef_signature';
              const label = tag.replace('_', ' ').toUpperCase();
              return `<span class="diet-tag-pill ${isSig ? 'signature' : ''}">${label}</span>`;
            }).join('')}
          </div>
          ${item.calories ? `<span class="text-muted">${item.calories} kcal</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================================
// 8. REVIEWS & RATINGS SYSTEM
// ============================================================================

function renderReviews() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  container.innerHTML = state.reviews.map(rev => `
    <div class="review-card">
      <div class="review-header">
        <img src="${rev.author_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}" alt="${rev.author_name}" class="review-avatar">
        <div>
          <div class="review-author-name">${rev.author_name}</div>
          <div class="review-meta">${rev.visit_type} • ${rev.date}</div>
        </div>
      </div>
      <div class="stars-row" style="justify-content: flex-start; margin-bottom: 0.75rem;">
        ${Array.from({ length: rev.rating || 5 }).map(() => `
          <svg class="svg-icon-star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        `).join('')}
      </div>
      <p class="review-comment">"${rev.comment}"</p>
      <div class="review-footer">
        <span class="verified-badge">
          <svg class="svg-icon-xs text-emerald" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Verified Patron
        </span>
      </div>
    </div>
  `).join('');
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById('reviewAuthor').value.trim();
  const rating = parseInt(document.getElementById('reviewRating').value, 10) || 5;
  const visitType = document.getElementById('reviewVisitType').value;
  const comment = document.getElementById('reviewComment').value.trim();

  if (!author || !comment) return;

  const newReview = {
    id: 'rev-' + Date.now(),
    author_name: author,
    author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating,
    date: 'Just now',
    comment,
    visit_type: visitType,
    verified: true
  };

  state.reviews.unshift(newReview);
  persistState();

  if (state.supabaseClient && state.isSupabaseConnected) {
    state.supabaseClient.from('reviews').insert([newReview]).then(() => {});
  }

  renderReviews();
  closeModal('reviewModal');
  document.getElementById('reviewForm').reset();
  alert('Thank you! Your verified dining review has been posted.');
}

// ============================================================================
// 9. MY BOOKINGS & LOOKUP
// ============================================================================

function renderReservationsList(filterQuery = '') {
  const container = document.getElementById('reservationsList');
  if (!container) return;

  let list = state.reservations;
  if (filterQuery) {
    const q = filterQuery.toLowerCase().trim();
    list = list.filter(r => 
      r.reference_code.toLowerCase().includes(q) || 
      r.guest_email.toLowerCase().includes(q) ||
      r.guest_name.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-subtle);">
        <p>No dining reservations found matching your search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(res => {
    const zoneInfo = ZONES_DATA.find(z => z.id === res.zone);
    const isCancelled = res.status === 'cancelled';

    return `
      <div class="res-item-card">
        <div class="res-item-header">
          <div>
            <div class="res-ref-code">${res.reference_code}</div>
            <div class="res-item-guest">${res.guest_name} (${res.guest_email})</div>
          </div>
          <span class="${isCancelled ? 'text-crimson' : 'badge-status-green'}">
            ${res.status.toUpperCase()}
          </span>
        </div>
        <div class="res-item-grid">
          <div>
            <span class="res-field-label">Date & Time</span>
            <span class="res-field-val">${res.reservation_date} @ ${res.reservation_time}</span>
          </div>
          <div>
            <span class="res-field-label">Table & Zone</span>
            <span class="res-field-val">T-${res.table_number || 'N/A'} • ${zoneInfo ? zoneInfo.name : res.zone}</span>
          </div>
          <div>
            <span class="res-field-label">Guests</span>
            <span class="res-field-val">${res.guest_count} Guests (${res.occasion || 'Dining'})</span>
          </div>
          <div>
            <span class="res-field-label">Created</span>
            <span class="res-field-val">${new Date(res.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div class="res-actions-bar">
          <button type="button" class="btn-pass-view" onclick="lookupAndShowPass('${res.reference_code}')">
            <svg class="svg-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>View Ticket</span>
          </button>
          ${!isCancelled ? `
            <button type="button" class="btn-pass-cancel" onclick="cancelReservation('${res.id}')">Cancel</button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function lookupAndShowPass(refCode) {
  const found = state.reservations.find(r => r.reference_code === refCode);
  if (found) {
    showConfirmationTicket(found);
  }
}

function cancelReservation(reservationId) {
  if (!confirm('Are you sure you wish to cancel this dining reservation?')) return;

  const res = state.reservations.find(r => r.id === reservationId);
  if (!res) return;

  res.status = 'cancelled';

  // Free table
  const table = state.tables.find(t => t.id === res.table_id);
  if (table) {
    table.status = 'available';
  }

  persistState();

  if (state.supabaseClient && state.isSupabaseConnected) {
    state.supabaseClient.from('reservations').update({ status: 'cancelled' }).eq('id', reservationId).then(() => {});
    if (res.table_id) {
      state.supabaseClient.from('restaurant_tables').update({ status: 'available' }).eq('id', res.table_id).then(() => {});
    }
  }

  renderReservationsList();
  renderFloorPlan();
  updateAdminMetrics();
}

// ============================================================================
// 10. STAFF / ADMIN PORTAL LOGIC
// ============================================================================

function updateAdminMetrics() {
  const total = state.reservations.length;
  const available = state.tables.filter(t => t.status === 'available').length;
  const reserved = state.tables.filter(t => t.status === 'reserved' || t.status === 'occupied').length;
  
  // Calculate expected covers
  const activeRes = state.reservations.filter(r => r.status === 'confirmed' || r.status === 'seated');
  const covers = activeRes.reduce((acc, curr) => acc + (curr.guest_count || 2), 0);

  const elTotal = document.getElementById('metricTotalBookings');
  const elAvail = document.getElementById('metricAvailableTables');
  const elRes = document.getElementById('metricReservedTables');
  const elCovers = document.getElementById('metricTotalCovers');

  if (elTotal) elTotal.textContent = total;
  if (elAvail) elAvail.textContent = available;
  if (elRes) elRes.textContent = reserved;
  if (elCovers) elCovers.textContent = covers;
}

function renderAdminReservations() {
  const tbody = document.getElementById('adminReservationsBody');
  if (!tbody) return;

  tbody.innerHTML = state.reservations.map(res => `
    <tr>
      <td><strong class="text-gold">${res.reference_code}</strong></td>
      <td>${res.guest_name}<br><small class="text-muted">${res.guest_phone || res.guest_email}</small></td>
      <td>${res.reservation_date}<br><small class="text-muted">${res.reservation_time}</small></td>
      <td>T-${res.table_number || 'N/A'}<br><small class="text-muted">${res.zone}</small></td>
      <td>${res.guest_count} Guests</td>
      <td>
        <select class="admin-status-select" onchange="changeReservationStatus('${res.id}', this.value)">
          <option value="confirmed" ${res.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
          <option value="seated" ${res.status === 'seated' ? 'selected' : ''}>Seated</option>
          <option value="completed" ${res.status === 'completed' ? 'selected' : ''}>Completed</option>
          <option value="cancelled" ${res.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
      <td>
        <button type="button" class="btn-lookup-reset" onclick="lookupAndShowPass('${res.reference_code}')">Pass</button>
      </td>
    </tr>
  `).join('');
}

function renderAdminTables() {
  const container = document.getElementById('adminTablesGrid');
  if (!container) return;

  container.innerHTML = state.tables.map(t => `
    <div class="admin-table-item ${t.status}">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>Table #${t.table_number}</strong>
        <span class="text-muted">${t.capacity} Seats</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">${t.zone} (${t.shape})</div>
      <select class="admin-status-select" onchange="changeTableStatus('${t.id}', this.value)" style="margin-top: 0.5rem;">
        <option value="available" ${t.status === 'available' ? 'selected' : ''}>Available</option>
        <option value="reserved" ${t.status === 'reserved' ? 'selected' : ''}>Reserved</option>
        <option value="occupied" ${t.status === 'occupied' ? 'selected' : ''}>Occupied</option>
        <option value="maintenance" ${t.status === 'maintenance' ? 'selected' : ''}>Maintenance</option>
      </select>
    </div>
  `).join('');
}

function changeReservationStatus(reservationId, newStatus) {
  const res = state.reservations.find(r => r.id === reservationId);
  if (!res) return;

  res.status = newStatus;
  if (newStatus === 'cancelled' && res.table_id) {
    const table = state.tables.find(t => t.id === res.table_id);
    if (table) table.status = 'available';
  } else if (newStatus === 'seated' && res.table_id) {
    const table = state.tables.find(t => t.id === res.table_id);
    if (table) table.status = 'occupied';
  }

  persistState();
  if (state.supabaseClient && state.isSupabaseConnected) {
    state.supabaseClient.from('reservations').update({ status: newStatus }).eq('id', reservationId).then(() => {});
  }

  renderReservationsList();
  renderFloorPlan();
  updateAdminMetrics();
  renderAdminReservations();
  renderAdminTables();
}

function changeTableStatus(tableId, newStatus) {
  const table = state.tables.find(t => t.id === tableId);
  if (!table) return;

  table.status = newStatus;
  persistState();

  if (state.supabaseClient && state.isSupabaseConnected) {
    state.supabaseClient.from('restaurant_tables').update({ status: newStatus }).eq('id', tableId).then(() => {});
  }

  renderFloorPlan();
  updateAdminMetrics();
  renderAdminTables();
}

// ============================================================================
// 11. AUTHENTICATION & DEMO FAST LOGIN
// ============================================================================

function initAuthUI() {
  const navUser = document.getElementById('navUserName');
  const resName = document.getElementById('resName');
  const resEmail = document.getElementById('resEmail');

  if (state.currentUser) {
    if (navUser) navUser.textContent = state.currentUser.name;
    if (resName && !resName.value) resName.value = state.currentUser.name;
    if (resEmail && !resEmail.value) resEmail.value = state.currentUser.email;
  }
}

function setDemoUser(name, email, role) {
  state.currentUser = { name, email, role };
  persistState();
  initAuthUI();
  closeModal('authModal');
  alert(`Logged in as ${name} (${role === 'admin' ? 'Staff / Administrator' : 'Guest'}).`);
}

// ============================================================================
// 12. SUPABASE DIRECT KEY CONFIGURATION IN BROWSER
// ============================================================================

async function handleSaveSupabaseKeys() {
  const url = document.getElementById('inputSupabaseUrl').value.trim();
  const key = document.getElementById('inputSupabaseKey').value.trim();
  const feedback = document.getElementById('keysFeedbackMsg');

  if (!url || !key) {
    if (feedback) {
      feedback.style.color = 'var(--crimson-400)';
      feedback.textContent = 'Please provide both your Supabase URL and Anon Key.';
    }
    return;
  }

  if (feedback) {
    feedback.style.color = 'var(--gold-300)';
    feedback.textContent = 'Testing connection to Supabase...';
  }

  try {
    if (window.supabase) {
      const client = window.supabase.createClient(url, key);
      const { error } = await client.from('restaurant_tables').select('id').limit(1);

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
      }

      localStorage.setItem('aura_supabase_url', url);
      localStorage.setItem('aura_supabase_key', key);
      state.supabaseClient = client;
      state.isSupabaseConnected = true;

      updateSupabaseBanner(true, 'Connected to Supabase (Production Database Active)');
      await syncFromSupabase();

      if (feedback) {
        feedback.style.color = 'var(--emerald-400)';
        feedback.textContent = 'Successfully connected to Supabase!';
      }
    }
  } catch (err) {
    if (feedback) {
      feedback.style.color = 'var(--crimson-400)';
      feedback.textContent = `Connection error: ${err.message}. Did you execute supabase_schema.sql?`;
    }
  }
}

function handleDisconnectSupabase() {
  localStorage.removeItem('aura_supabase_url');
  localStorage.removeItem('aura_supabase_key');
  state.supabaseClient = null;
  state.isSupabaseConnected = false;
  updateSupabaseBanner(false, 'Database Mode: Local Storage Demo (Ready to connect with Supabase)');

  const urlInput = document.getElementById('inputSupabaseUrl');
  const keyInput = document.getElementById('inputSupabaseKey');
  const feedback = document.getElementById('keysFeedbackMsg');

  if (urlInput) urlInput.value = '';
  if (keyInput) keyInput.value = '';
  if (feedback) {
    feedback.style.color = 'var(--emerald-400)';
    feedback.textContent = 'Reset to local storage demo mode.';
  }
}

// ============================================================================
// 13. MODAL CONTROLS & EVENT ATTACHMENTS
// ============================================================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', async () => {
  initLocalData();
  await initSupabase();

  // Populate UI
  renderZonesShowcase();
  renderFloorPlan();
  renderAddons();
  renderMenu();
  renderReviews();
  renderReservationsList();
  updateAdminMetrics();
  initAuthUI();

  // Pre-fill date to today or tomorrow
  const dateInput = document.getElementById('resDate');
  const quickDate = document.getElementById('quickDate');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];
  if (dateInput) dateInput.value = formattedTomorrow;
  if (quickDate) quickDate.value = formattedTomorrow;

  // Pre-fill keys in guide if stored
  const storedUrl = localStorage.getItem('aura_supabase_url');
  const storedKey = localStorage.getItem('aura_supabase_key');
  if (storedUrl) {
    const inputUrl = document.getElementById('inputSupabaseUrl');
    if (inputUrl) inputUrl.value = storedUrl;
  }
  if (storedKey) {
    const inputKey = document.getElementById('inputSupabaseKey');
    if (inputKey) inputKey.value = storedKey;
  }

  // Zone Tabs Click Event
  document.querySelectorAll('.zone-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchZone(btn.dataset.zone));
  });

  // Hero Quick Search
  const quickSearchBtn = document.getElementById('quickSearchBtn');
  if (quickSearchBtn) {
    quickSearchBtn.addEventListener('click', () => {
      const qZone = document.getElementById('quickZone').value;
      const qDate = document.getElementById('quickDate').value;
      const qTime = document.getElementById('quickTime').value;
      const qGuests = document.getElementById('quickGuests').value;

      if (dateInput) dateInput.value = qDate;
      const resTime = document.getElementById('resTime');
      if (resTime) resTime.value = qTime;
      const resGuests = document.getElementById('resGuests');
      if (resGuests) resGuests.value = qGuests;

      switchZone(qZone);
    });
  }

  // Reservation Form Submit
  const resForm = document.getElementById('reservationForm');
  if (resForm) {
    resForm.addEventListener('submit', handleReservationSubmit);
  }

  // Menu Search
  const menuSearch = document.getElementById('menuSearchInput');
  if (menuSearch) {
    menuSearch.addEventListener('input', (e) => {
      currentMenuSearch = e.target.value;
      renderMenu();
    });
  }

  // Menu Category Tabs
  document.querySelectorAll('.menu-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMenuCategory = btn.dataset.category;
      renderMenu();
    });
  });

  // Dietary Chips
  document.querySelectorAll('.dietary-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.classList.contains('active')) {
        chip.classList.remove('active');
        currentDietaryFilter = null;
      } else {
        document.querySelectorAll('.dietary-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentDietaryFilter = chip.dataset.diet;
      }
      renderMenu();
    });
  });

  // My Bookings Lookup
  const lookupBtn = document.getElementById('lookupSearchBtn');
  const lookupInput = document.getElementById('lookupCodeInput');
  const lookupResetBtn = document.getElementById('lookupResetBtn');

  if (lookupBtn && lookupInput) {
    lookupBtn.addEventListener('click', () => {
      renderReservationsList(lookupInput.value);
    });
    lookupInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') renderReservationsList(lookupInput.value);
    });
  }
  if (lookupResetBtn) {
    lookupResetBtn.addEventListener('click', () => {
      if (lookupInput) lookupInput.value = '';
      renderReservationsList();
    });
  }

  // Reviews Submit
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmit);
  }

  // Modal Open Triggers
  const openGuideBtn = document.getElementById('openSupabaseGuideBtn');
  const footerGuideBtn = document.getElementById('footerSupabaseBtn');
  if (openGuideBtn) openGuideBtn.addEventListener('click', () => openModal('supabaseModal'));
  if (footerGuideBtn) footerGuideBtn.addEventListener('click', () => openModal('supabaseModal'));

  const userProfileBtn = document.getElementById('userProfileBtn');
  if (userProfileBtn) userProfileBtn.addEventListener('click', () => openModal('authModal'));

  const openAdminBtn = document.getElementById('openAdminBtn');
  if (openAdminBtn) {
    openAdminBtn.addEventListener('click', () => {
      updateAdminMetrics();
      renderAdminReservations();
      renderAdminTables();
      openModal('adminModal');
    });
  }

  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  if (openReviewModalBtn) openReviewModalBtn.addEventListener('click', () => openModal('reviewModal'));

  // Modal Close Triggers
  const closeConfirmBtn = document.getElementById('closeConfirmationBtn');
  const ticketDoneBtn = document.getElementById('ticketDoneBtn');
  if (closeConfirmBtn) closeConfirmBtn.addEventListener('click', () => closeModal('confirmationModal'));
  if (ticketDoneBtn) ticketDoneBtn.addEventListener('click', () => closeModal('confirmationModal'));

  const closeAuthBtn = document.getElementById('closeAuthBtn');
  if (closeAuthBtn) closeAuthBtn.addEventListener('click', () => closeModal('authModal'));

  const closeAdminBtn = document.getElementById('closeAdminBtn');
  if (closeAdminBtn) closeAdminBtn.addEventListener('click', () => closeModal('adminModal'));

  const closeSupabaseBtn = document.getElementById('closeSupabaseBtn');
  if (closeSupabaseBtn) closeSupabaseBtn.addEventListener('click', () => closeModal('supabaseModal'));

  const closeReviewBtn = document.getElementById('closeReviewBtn');
  if (closeReviewBtn) closeReviewBtn.addEventListener('click', () => closeModal('reviewModal'));

  // Admin Sub-tabs
  const tabAdminRes = document.getElementById('tabAdminReservations');
  const tabAdminTab = document.getElementById('tabAdminTables');
  const contentAdminRes = document.getElementById('adminContentReservations');
  const contentAdminTab = document.getElementById('adminContentTables');

  if (tabAdminRes && tabAdminTab) {
    tabAdminRes.addEventListener('click', () => {
      tabAdminRes.classList.add('active');
      tabAdminTab.classList.remove('active');
      if (contentAdminRes) contentAdminRes.style.display = 'block';
      if (contentAdminTab) contentAdminTab.style.display = 'none';
      renderAdminReservations();
    });

    tabAdminTab.addEventListener('click', () => {
      tabAdminTab.classList.add('active');
      tabAdminRes.classList.remove('active');
      if (contentAdminRes) contentAdminRes.style.display = 'none';
      if (contentAdminTab) contentAdminTab.style.display = 'block';
      renderAdminTables();
    });
  }

  // Demo Login Buttons
  const demoCustBtn = document.getElementById('demoCustomerBtn');
  const demoStaffBtn = document.getElementById('demoStaffBtn');
  if (demoCustBtn) {
    demoCustBtn.addEventListener('click', () => {
      setDemoUser('Sophia Laurent', 'sophia.laurent@luxurymail.com', 'customer');
    });
  }
  if (demoStaffBtn) {
    demoStaffBtn.addEventListener('click', () => {
      setDemoUser('Executive Chef Julian', 'chef.julian@auraandolive.com', 'admin');
    });
  }

  // Supabase Save Keys Button
  const saveKeysBtn = document.getElementById('saveSupabaseKeysBtn');
  const disconnectBtn = document.getElementById('disconnectSupabaseBtn');
  if (saveKeysBtn) saveKeysBtn.addEventListener('click', handleSaveSupabaseKeys);
  if (disconnectBtn) disconnectBtn.addEventListener('click', handleDisconnectSupabase);
});
