-- Seed flight prices for demonstration and testing
-- Popular routes with realistic prices in BRL and miles

-- GRU (São Paulo) to MIA (Miami)
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'MIA', CURRENT_DATE + INTERVAL '30 days', 2450.00, 45000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'MIA', CURRENT_DATE + INTERVAL '30 days', 2680.00, 50000 FROM airlines WHERE code = 'TUDOAZUL'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'MIA', CURRENT_DATE + INTERVAL '30 days', 2890.00, 52000 FROM airlines WHERE code = 'AZULMUNDO'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'MIA', CURRENT_DATE + INTERVAL '30 days', 2550.00, 48000 FROM airlines WHERE code = 'SMILES'
ON CONFLICT DO NOTHING;

-- GRU to LIS (Lisbon)
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'LIS', CURRENT_DATE + INTERVAL '45 days', 3200.00, 60000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'LIS', CURRENT_DATE + INTERVAL '45 days', 2980.00, 55000 FROM airlines WHERE code = 'IB'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'LIS', CURRENT_DATE + INTERVAL '45 days', 3450.00, 62000 FROM airlines WHERE code = 'TUDOAZUL'
ON CONFLICT DO NOTHING;

-- GRU to MAD (Madrid)
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'MAD', CURRENT_DATE + INTERVAL '60 days', 3100.00, 58000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'MAD', CURRENT_DATE + INTERVAL '60 days', 2850.00, 52000 FROM airlines WHERE code = 'IB'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'MAD', CURRENT_DATE + INTERVAL '60 days', 3350.00, 60000 FROM airlines WHERE code = 'AZULMUNDO'
ON CONFLICT DO NOTHING;

-- GRU to DOH (Doha)
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'DOH', CURRENT_DATE + INTERVAL '90 days', 4200.00, 75000 FROM airlines WHERE code = 'QR'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'DOH', CURRENT_DATE + INTERVAL '90 days', 4850.00, 82000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

-- GIG (Rio) to MIA
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GIG', 'MIA', CURRENT_DATE + INTERVAL '35 days', 2350.00, 42000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GIG', 'MIA', CURRENT_DATE + INTERVAL '35 days', 2580.00, 46000 FROM airlines WHERE code = 'TUDOAZUL'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GIG', 'MIA', CURRENT_DATE + INTERVAL '35 days', 2420.00, 44000 FROM airlines WHERE code = 'SMILES'
ON CONFLICT DO NOTHING;

-- CGH (São Paulo Congonhas) to GIG (Rio)
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'CGH', 'GIG', CURRENT_DATE + INTERVAL '15 days', 450.00, 8000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'CGH', 'GIG', CURRENT_DATE + INTERVAL '15 days', 380.00, 7500 FROM airlines WHERE code = 'TUDOAZUL'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'CGH', 'GIG', CURRENT_DATE + INTERVAL '15 days', 420.00, 7800 FROM airlines WHERE code = 'AZULMUNDO'
ON CONFLICT DO NOTHING;

-- GRU to NYC (New York)
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'JFK', CURRENT_DATE + INTERVAL '50 days', 2950.00, 55000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'JFK', CURRENT_DATE + INTERVAL '50 days', 3180.00, 58000 FROM airlines WHERE code = 'TUDOAZUL'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'JFK', CURRENT_DATE + INTERVAL '50 days', 2880.00, 52000 FROM airlines WHERE code = 'SMILES'
ON CONFLICT DO NOTHING;

-- GRU to LON (London)
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'LHR', CURRENT_DATE + INTERVAL '70 days', 3600.00, 65000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'LHR', CURRENT_DATE + INTERVAL '70 days', 3450.00, 62000 FROM airlines WHERE code = 'IB'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'GRU', 'LHR', CURRENT_DATE + INTERVAL '70 days', 3280.00, 60000 FROM airlines WHERE code = 'QR'
ON CONFLICT DO NOTHING;

-- BSB (Brasília) to GRU
INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'BSB', 'GRU', CURRENT_DATE + INTERVAL '20 days', 580.00, 10000 FROM airlines WHERE code = 'LA'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'BSB', 'GRU', CURRENT_DATE + INTERVAL '20 days', 520.00, 9500 FROM airlines WHERE code = 'TUDOAZUL'
ON CONFLICT DO NOTHING;

INSERT INTO flight_prices (airline_id, origin, destination, departure_date, price_brl, miles_required) 
SELECT id, 'BSB', 'GRU', CURRENT_DATE + INTERVAL '20 days', 550.00, 9800 FROM airlines WHERE code = 'AZULMUNDO'
ON CONFLICT DO NOTHING;
