-- Insert airlines data
INSERT INTO airlines (name, code) VALUES
  ('LATAM', 'LA'),
  ('Tudo Azul', 'TUDOAZUL'),
  ('Azul pelo Mundo', 'AZULMUNDO'),
  ('Smiles', 'SMILES'),
  ('Iberia', 'IB'),
  ('Qatar Airways', 'QR')
ON CONFLICT (code) DO NOTHING;
