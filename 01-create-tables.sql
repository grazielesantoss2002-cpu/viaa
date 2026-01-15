-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create flight_searches table to store search history
CREATE TABLE IF NOT EXISTS flight_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE,
  search_type TEXT NOT NULL, -- 'cash' or 'miles'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create airlines table
CREATE TABLE IF NOT EXISTS airlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create flight_prices table to store manual price entries
CREATE TABLE IF NOT EXISTS flight_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID REFERENCES flight_searches(id),
  airline_id UUID REFERENCES airlines(id),
  price_cash DECIMAL(10, 2),
  price_miles INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quote_requests table for public quote requests
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE,
  passengers INTEGER DEFAULT 1,
  message TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE airlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users (only authenticated users can see their own data)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- RLS Policies for flight_searches (only authenticated users can CRUD their searches)
CREATE POLICY "Users can view own searches" ON flight_searches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own searches" ON flight_searches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own searches" ON flight_searches
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own searches" ON flight_searches
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for airlines (authenticated users can read all airlines)
CREATE POLICY "Authenticated users can view airlines" ON airlines
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert airlines" ON airlines
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for flight_prices (users can manage prices for their searches)
CREATE POLICY "Users can view prices for own searches" ON flight_prices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM flight_searches 
      WHERE flight_searches.id = flight_prices.search_id 
      AND flight_searches.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create prices for own searches" ON flight_prices
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM flight_searches 
      WHERE flight_searches.id = flight_prices.search_id 
      AND flight_searches.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update prices for own searches" ON flight_prices
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM flight_searches 
      WHERE flight_searches.id = flight_prices.search_id 
      AND flight_searches.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete prices for own searches" ON flight_prices
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM flight_searches 
      WHERE flight_searches.id = flight_prices.search_id 
      AND flight_searches.user_id = auth.uid()
    )
  );

-- RLS Policies for quote_requests (public can insert, authenticated can view all)
CREATE POLICY "Anyone can create quote requests" ON quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view all quote requests" ON quote_requests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update quote requests" ON quote_requests
  FOR UPDATE USING (auth.role() = 'authenticated');
