-- Remove the old script approach - Supabase Auth manages users
-- Users should be created through the sign-up process or Supabase dashboard

-- Just ensure RLS policies are set correctly
ALTER TABLE flight_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE airlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_prices ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all airlines
CREATE POLICY "Anyone authenticated can view airlines"
  ON airlines
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to manage their own searches
CREATE POLICY "Users can manage own searches"
  ON flight_searches
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Allow authenticated users to view all searches (for admin dashboard)
CREATE POLICY "Users can view all searches"
  ON flight_searches
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow anyone to create quote requests
CREATE POLICY "Anyone can create quote requests"
  ON quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to view all quote requests
CREATE POLICY "Authenticated users can view all quotes"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to manage flight prices
CREATE POLICY "Users can manage flight prices"
  ON flight_prices
  FOR ALL
  TO authenticated
  USING (true);
