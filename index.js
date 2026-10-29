const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-Memory Database Store (with realistic seed data)
const db = {
  tables: [
    { id: 'T-101', table_number: 1, capacity: 2, zone: 'main_hall', status: 'available', features: ['Window View', 'Cozy High Table'], shape: 'round', x: 18, y: 22 },
    { id: 'T-102', table_number: 2, capacity: 2, zone: 'main_hall', status: 'available', features: ['Window View', 'Direct Natural Light'], shape: 'round', x: 18, y: 45 },
    { id: 'T-103', table_number: 3, capacity: 4, zone: 'main_hall', status: 'available', features: ['Centerpiece View', 'Spacious Seating'], shape: 'rect', x: 42, y: 25 },
    { id: 'T-104', table_number: 4, capacity: 4, zone: 'main_hall', status: 'reserved', features: ['Open Kitchen Sightline', 'Plush Cushions'], shape: 'rect', x: 42, y: 50 },
    { id: 'T-105', table_number: 5, capacity: 6, zone: 'main_hall', status: 'available', features: ['Family Table', 'Near Hearth'], shape: 'rect', x: 42, y: 75 },
    { id: 'T-106', table_number: 6, capacity: 8, zone: 'main_hall', status: 'available', features: ['Grand Banquet', 'Chandelier Overhead'], shape: 'rect', x: 74, y: 35 },
    { id: 'T-107', table_number: 7, capacity: 4, zone: 'main_hall', status: 'occupied', features: ['Corner Booth', 'Quiet Acoustic'], shape: 'booth', x: 74, y: 68 },

    { id: 'T-201', table_number: 11, capacity: 2, zone: 'outdoor_terrace', status: 'available', features: ['Under Olive Tree', 'Fairy Lights'], shape: 'round', x: 20, y: 28 },
    { id: 'T-202', table_number: 12, capacity: 2, zone: 'outdoor_terrace', status: 'available', features: ['Water Fountain Vista', 'Heated Lamp'], shape: 'round', x: 20, y: 62 },
    { id: 'T-203', table_number: 13, capacity: 4, zone: 'outdoor_terrace', status: 'available', features: ['Floral Pergola', 'Garden Breeze'], shape: 'rect', x: 48, y: 32 },
    { id: 'T-204', table_number: 14, capacity: 4, zone: 'outdoor_terrace', status: 'reserved', features: ['Courtyard Center', 'Sunset Facing'], shape: 'rect', x: 48, y: 68 },
    { id: 'T-205', table_number: 15, capacity: 6, zone: 'outdoor_terrace', status: 'available', features: ['Veranda Nook', 'Overhead Canopy'], shape: 'rect', x: 76, y: 48 },

    { id: 'T-301', table_number: 21, capacity: 2, zone: 'skyline_rooftop', status: 'available', features: ['Edge Glass Railing', 'City Skyline Panoramas'], shape: 'round', x: 22, y: 25 },
    { id: 'T-302', table_number: 22, capacity: 2, zone: 'skyline_rooftop', status: 'available', features: ['Golden Hour Horizon', 'Glass Railing'], shape: 'round', x: 22, y: 65 },
    { id: 'T-303', table_number: 23, capacity: 4, zone: 'skyline_rooftop', status: 'available', features: ['Firepit Adjacency', 'Lounge Seating'], shape: 'rect', x: 50, y: 30 },
    { id: 'T-304', table_number: 24, capacity: 4, zone: 'skyline_rooftop', status: 'available', features: ['Cocktail Bar Access', 'High Stools'], shape: 'rect', x: 50, y: 70 },
    { id: 'T-305', table_number: 25, capacity: 6, zone: 'skyline_rooftop', status: 'reserved', features: ['Skyline Cabana', 'Private Music Zone'], shape: 'booth', x: 78, y: 50 },

    { id: 'T-401', table_number: 31, capacity: 2, zone: 'vip_cellar', status: 'available', features: ['Intimate Vault Nook', 'Sommelier Service'], shape: 'booth', x: 25, y: 30 },
    { id: 'T-402', table_number: 32, capacity: 4, zone: 'vip_cellar', status: 'available', features: ['Leather Upholstery', 'Private Reserve Wall'], shape: 'booth', x: 25, y: 70 },
    { id: 'T-403', table_number: 33, capacity: 6, zone: 'vip_cellar', status: 'available', features: ['Curated Wine Racks', 'Acoustic Privacy'], shape: 'booth', x: 60, y: 35 },
    { id: 'T-404', table_number: 34, capacity: 8, zone: 'vip_cellar', status: 'reserved', features: ['Presidential Boardroom', 'Private Sommelier'], shape: 'rect', x: 65, y: 72 }
  ],
  menu: [
    {
      id: 'm-01',
      name: 'Charred Spanish Octopus',
      description: 'Slow-braised then flame-seared tender octopus tentacle, saffron potato mousseline, smoked paprika emulsion, micro cilantro.',
      price: 24,
      category: 'starters',
      dietary_tags: ['gluten_free', 'chef_signature'],
      image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      calories: 380,
      is_available: true,
      is_chef_special: true,
      rating: 4.9
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
      is_available: true,
      is_chef_special: false,
      rating: 4.8
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
      is_available: true,
      is_chef_special: true,
      rating: 5.0
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
      is_available: true,
      is_chef_special: true,
      rating: 5.0
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
      is_available: true,
      is_chef_special: true,
      rating: 4.9
    },
    {
      id: 'm-08',
      name: 'Handmade Black Truffle Tagliolini',
      description: 'Egg pasta tossed in churned Normandy butter, 30-month aged Grana Padano, generously shaved fresh black winter truffles.',
      price: 38,
      category: 'artisan_pastas',
      dietary_tags: ['vegetarian', 'chef_signature'],
      image_url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80',
      calories: 610,
      is_available: true,
      is_chef_special: true,
      rating: 5.0
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
      is_available: true,
      is_chef_special: false,
      rating: 4.7
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
      is_available: true,
      is_chef_special: true,
      rating: 4.9
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
      is_available: true,
      is_chef_special: true,
      rating: 5.0
    }
  ],
  reservations: [
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
      status: 'confirmed',
      created_at: new Date(Date.now() - 43200000).toISOString()
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author_name: 'Victoria Sterling',
      author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: 'Yesterday',
      comment: 'The skyline terrace table at twilight was an unforgettable experience. The Chilean Sea Bass melted in our mouths, and the sommelier pairing was masterfully executed. Booking online was effortless.',
      visit_type: 'Anniversary Dinner',
      food_rating: 5,
      ambiance_rating: 5,
      service_rating: 5,
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
      food_rating: 5,
      ambiance_rating: 5,
      service_rating: 5,
      verified: true
    }
  ]
};

// Serve Static Frontend Assets
app.use(express.static(__dirname));

// ==========================================
// REST API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Aura & Olive Restaurant API',
    supabaseConfigured: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)
  });
});

// Config Endpoint for Client-Side Supabase Key Initialization
app.get('/api/config', (req, res) => {
  const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const cleanUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const key = process.env.SUPABASE_ANON_KEY || 
              process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
              process.env.SUPABASE_PUBLISHABLE_KEY || '';
  res.json({
    supabaseUrl: cleanUrl,
    supabaseAnonKey: key
  });
});

// Get Tables (optionally filtered by zone)
app.get('/api/tables', (req, res) => {
  const { zone } = req.query;
  if (zone) {
    return res.json(db.tables.filter(t => t.zone === zone));
  }
  res.json(db.tables);
});

// Update Table Status (Admin Staff)
app.patch('/api/tables/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const table = db.tables.find(t => t.id === id);
  if (!table) {
    return res.status(404).json({ error: 'Table not found' });
  }
  if (status) table.status = status;
  res.json({ success: true, table });
});

// Get Menu Items
app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    return res.json(db.menu.filter(m => m.category === category));
  }
  res.json(db.menu);
});

// Add Menu Item (Admin)
app.post('/api/menu', (req, res) => {
  const item = {
    id: 'm-' + Date.now(),
    ...req.body,
    is_available: true,
    rating: 5.0
  };
  db.menu.push(item);
  res.status(201).json(item);
});

// Get Reservations
app.get('/api/reservations', (req, res) => {
  const { email, code } = req.query;
  if (code) {
    const found = db.reservations.find(r => r.reference_code.toUpperCase() === code.toUpperCase());
    return res.json(found ? [found] : []);
  }
  if (email) {
    return res.json(db.reservations.filter(r => r.guest_email.toLowerCase() === email.toLowerCase()));
  }
  res.json(db.reservations);
});

// Create Reservation
app.post('/api/reservations', (req, res) => {
  const {
    guest_name,
    guest_email,
    guest_phone,
    guest_count,
    reservation_date,
    reservation_time,
    zone,
    table_id,
    table_number,
    occasion,
    special_requests,
    add_ons
  } = req.body;

  if (!guest_name || !guest_email || !reservation_date || !reservation_time || !table_id) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  // Generate Reference Code: AO-XXXXX
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const reference_code = `AO-${randomSuffix}`;

  const newReservation = {
    id: 'res-' + Date.now(),
    reference_code,
    guest_name,
    guest_email,
    guest_phone: guest_phone || '',
    guest_count: parseInt(guest_count, 10) || 2,
    reservation_date,
    reservation_time,
    zone,
    table_id,
    table_number: table_number || null,
    occasion: occasion || 'Dining',
    special_requests: special_requests || '',
    add_ons: add_ons || [],
    status: 'confirmed',
    created_at: new Date().toISOString()
  };

  // Mark table as reserved in memory
  const table = db.tables.find(t => t.id === table_id);
  if (table) {
    table.status = 'reserved';
    if (!newReservation.table_number) newReservation.table_number = table.table_number;
  }

  db.reservations.unshift(newReservation);
  res.status(201).json(newReservation);
});

// Update Reservation Status (Confirmed, Seated, Cancelled)
app.patch('/api/reservations/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const reservation = db.reservations.find(r => r.id === id || r.reference_code === id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found' });
  }

  reservation.status = status;

  // If cancelled, make table available again
  if (status === 'cancelled' && reservation.table_id) {
    const table = db.tables.find(t => t.id === reservation.table_id);
    if (table) table.status = 'available';
  }

  res.json({ success: true, reservation });
});

// Get Reviews
app.get('/api/reviews', (req, res) => {
  res.json(db.reviews);
});

// Add Review
app.post('/api/reviews', (req, res) => {
  const { author_name, rating, comment, visit_type } = req.body;
  if (!author_name || !comment) {
    return res.status(400).json({ error: 'Author name and comment are required' });
  }
  const review = {
    id: 'rev-' + Date.now(),
    author_name,
    author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: parseInt(rating, 10) || 5,
    date: 'Just now',
    comment,
    visit_type: visit_type || 'Dinner',
    food_rating: 5,
    ambiance_rating: 5,
    service_rating: 5,
    verified: true
  };
  db.reviews.unshift(review);
  res.status(201).json(review);
});

// Serve frontend for any unmatched route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Aura & Olive Restaurant server running on port ${PORT}`);
  });
}

module.exports = app;
