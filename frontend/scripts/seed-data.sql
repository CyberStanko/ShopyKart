-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Electronics', 'Latest electronic devices and cutting-edge gadgets', '/placeholder.svg?height=200&width=200'),
('Wearables', 'Smart watches, fitness trackers and wearable tech', '/placeholder.svg?height=200&width=200'),
('Furniture', 'Modern, ergonomic and stylish furniture', '/placeholder.svg?height=200&width=200'),
('Gaming', 'Gaming accessories, peripherals and equipment', '/placeholder.svg?height=200&width=200'),
('Accessories', 'Various tech accessories and essentials', '/placeholder.svg?height=200&width=200')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, original_price, category_id, image_url, stock, rating, review_count, featured, trending) VALUES
('Premium Wireless Headphones', 'High-quality wireless headphones with active noise cancellation, premium sound quality, and 30-hour battery life', 299.99, 399.99, 1, '/placeholder.svg?height=300&width=300', 50, 4.8, 1247, true, true),
('Smart Fitness Watch', 'Advanced fitness tracking with heart rate monitoring, GPS, smartphone integration, and waterproof design', 199.99, 249.99, 2, '/placeholder.svg?height=300&width=300', 75, 4.6, 892, true, false),
('Ergonomic Office Chair', 'Professional ergonomic chair with lumbar support, adjustable height, and premium materials for all-day comfort', 449.99, 599.99, 3, '/placeholder.svg?height=300&width=300', 25, 4.9, 634, false, true),
('4K Ultra HD Monitor', '27-inch 4K monitor with HDR support, USB-C connectivity, and color-accurate display for professionals', 329.99, 429.99, 1, '/placeholder.svg?height=300&width=300', 40, 4.7, 1156, true, false),
('Mechanical Gaming Keyboard', 'RGB backlit mechanical keyboard with customizable keys, tactile switches, and gaming optimization', 159.99, 199.99, 4, '/placeholder.svg?height=300&width=300', 60, 4.5, 743, false, true),
('Wireless Charging Pad', 'Fast wireless charging pad compatible with all Qi-enabled devices, sleek design with LED indicators', 49.99, 69.99, 5, '/placeholder.svg?height=300&width=300', 100, 4.3, 521, false, false),
('Bluetooth Speaker', 'Portable waterproof Bluetooth speaker with 360-degree sound, deep bass, and 12-hour battery', 89.99, 119.99, 1, '/placeholder.svg?height=300&width=300', 80, 4.4, 892, false, false),
('Gaming Mouse', 'High-precision gaming mouse with customizable DPI, RGB lighting, and ergonomic design for competitive gaming', 79.99, 99.99, 4, '/placeholder.svg?height=300&width=300', 45, 4.6, 567, false, false),
('Standing Desk', 'Height-adjustable standing desk with memory presets, cable management, and sturdy construction', 599.99, 799.99, 3, '/placeholder.svg?height=300&width=300', 15, 4.8, 234, true, true),
('Smartphone Case', 'Premium leather smartphone case with card slots, magnetic closure, and drop protection', 39.99, 49.99, 5, '/placeholder.svg?height=300&width=300', 200, 4.2, 1023, false, false);

-- Insert sample user (for testing)
INSERT INTO users (email, name, picture, google_id) VALUES
('demo@shopykart.com', 'Demo User', '/placeholder.svg?height=150&width=150', 'demo_google_id')
ON CONFLICT (email) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
(1, 1, 5, 'Amazing sound quality and incredibly comfortable to wear for long periods! Best headphones I have ever owned.'),
(1, 2, 4, 'Great fitness tracking features and accurate heart rate monitoring. Battery life could be slightly better but overall excellent.'),
(1, 4, 5, 'Crystal clear 4K display and perfect for both work and gaming. The color accuracy is outstanding for photo editing.');
