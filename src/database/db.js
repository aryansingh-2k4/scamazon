/**
 * Scamazon In-Memory SQL Engine & Catalog Database
 */

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Scamazon Echo Dot (5th Gen) - Smart Speaker with Alexa",
    category: "Electronics",
    price: 49.99,
    original_price: 69.99,
    rating: 4.7,
    reviews_count: 14820,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60",
    description: "Our best sounding Echo Dot yet. Enjoy improved audio experience with clearer vocals, deeper bass, and vibrant sound in any room."
  },
  {
    id: 2,
    name: "Scamazon Fire TV Stick 4K Max Streaming Device",
    category: "Electronics",
    price: 39.99,
    original_price: 59.99,
    rating: 4.8,
    reviews_count: 32910,
    badge: "Amazon's Choice",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60",
    description: "Cinematic 4K streaming with Wi-Fi 6 support, Dolby Vision, HDR10+, and immersive Dolby Atmos audio."
  },
  {
    id: 3,
    name: "Scamazon Basics High-Speed 4K HDMI Cable 6 Feet",
    category: "Accessories",
    price: 8.99,
    original_price: 12.99,
    rating: 4.6,
    reviews_count: 8520,
    badge: null,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
    description: "High-speed HDMI cable connects Blu-ray players, Fire TV, Apple TV, PS4, PS3, XBox one, Xbox 360, and computers."
  },
  {
    id: 4,
    name: "Kindle Paperwhite (16 GB) - 6.8\" Glare-Free Display",
    category: "Devices",
    price: 139.99,
    original_price: 159.99,
    rating: 4.9,
    reviews_count: 42100,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&auto=format&fit=crop&q=60",
    description: "Now with a 6.8\" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns."
  },
  {
    id: 5,
    name: "Wireless Active Noise Cancelling Over-Ear Headphones",
    category: "Audio",
    price: 89.99,
    original_price: 149.99,
    rating: 4.5,
    reviews_count: 9410,
    badge: "Deal of the Day",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    description: "Premium sound engineering with active hybrid noise cancellation, 40-hour playtime, and ultra-plush memory foam earcups."
  },
  {
    id: 6,
    name: "Pro Gaming Mechanical Keyboard (RGB Backlit Blue Switches)",
    category: "Gaming",
    price: 45.99,
    original_price: 79.99,
    rating: 4.6,
    reviews_count: 6300,
    badge: null,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    description: "Compact 87-key tenkeyless design with tactile clicky blue switches, customizable dynamic RGB lighting presets, and anti-ghosting."
  }
];

class ScamazonDatabase {
  constructor() {
    this.products = [...INITIAL_PRODUCTS];
    this.reviews = [];
  }

  /**
   * Simulated SQL Query Executor
   * Intentionally evaluates raw strings to simulate SQL injection behavior (CWE-89)
   */
  async query(sqlString) {
    const raw = sqlString.toLowerCase();

    // Check for SQL injection payloads like ' OR 1=1 or UNION SELECT
    if (raw.includes("' or '1'='1") || raw.includes("' or 1=1") || raw.includes("or '1'='1'")) {
      console.log(`[SQL Engine] SQL Injection triggered via query: ${sqlString}`);
      return this.products; // Returns all records (classic SQLi exploit)
    }

    // Standard SELECT query parsing
    if (raw.startsWith('select')) {
      const match = sqlString.match(/like\s*'%([^%']*)%'/i);
      if (match && match[1]) {
        const term = match[1].toLowerCase().trim();
        return this.products.filter(p =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
        );
      }
      return this.products;
    }

    return [];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === parseInt(id)) || null;
  }

  addReview(productId, author, rating, comment) {
    const review = {
      id: this.reviews.length + 1,
      productId: parseInt(productId),
      author,
      rating: parseInt(rating) || 5,
      comment,
      createdAt: new Date().toISOString()
    };
    this.reviews.push(review);
    return review;
  }

  getReviews(productId) {
    return this.reviews.filter(r => r.productId === parseInt(productId));
  }
}

const db = new ScamazonDatabase();
module.exports = db;
