-- Demo seed data so the product feels alive from the first run.
-- NOTE: run this only against a dev/staging project. It assumes at least
-- one auth user already exists (sign up first, then replace :admin_id).

-- 1) Create the demo organization
insert into organizations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Demo Company')
on conflict do nothing;

-- 2) Point your first authenticated user at it as admin
--    (replace :admin_id with the auth.users.id from your Supabase dashboard)
-- insert into profiles (id, organization_id, name, email, role)
-- values (':admin_id', '00000000-0000-0000-0000-000000000001', 'Admin Demo', 'admin@demo.company', 'admin');

-- 3) Monthly target: €10,000
insert into financial_goals (organization_id, month, target_amount)
values ('00000000-0000-0000-0000-000000000001', date_trunc('month', now()), 10000)
on conflict do nothing;

-- 4) ~10 revenue entries totalling ≈ €6,700
insert into revenue (organization_id, date, description, client, category, amount, status, created_by)
select '00000000-0000-0000-0000-000000000001', d.date, d.description, d.client, d.category, d.amount, d.status, p.id
from (values
  (current_date - 21, 'Website redesign', 'Café Luna',      'services', 1200.00, 'paid'),
  (current_date - 18, 'Monthly retainer', 'Ferretería Sol', 'retainer',  450.00, 'paid'),
  (current_date - 15, 'Landing page',     'Gimnasio Vita',  'services',  800.00, 'paid'),
  (current_date - 12, 'SEO package',      'Café Luna',      'services',  600.00, 'pending'),
  (current_date - 10, 'Monthly retainer', 'Panadería Ana',  'retainer',  450.00, 'paid'),
  (current_date - 8,  'Logo + branding',  'Estudio Ruiz',   'design',    950.00, 'paid'),
  (current_date - 6,  'Monthly retainer', 'Ferretería Sol', 'retainer',  450.00, 'pending'),
  (current_date - 4,  'E-commerce setup', 'Tienda Rio',     'services', 1100.00, 'paid'),
  (current_date - 2,  'Maintenance',      'Gimnasio Vita',  'support',   200.00, 'paid'),
  (current_date - 1,  'Consulting hours', 'Estudio Ruiz',   'consulting',500.00, 'pending')
) as d(date, description, client, category, amount, status)
cross join lateral (select id from profiles where organization_id = '00000000-0000-0000-0000-000000000001' limit 1) as p
on conflict do nothing;

-- 5) ~10 expenses totalling ≈ €2,150
insert into expenses (organization_id, date, description, supplier, category, amount, created_by)
select '00000000-0000-0000-0000-000000000001', d.date, d.description, d.supplier, d.category, d.amount, p.id
from (values
  (current_date - 20, 'Office rent',       'Inmobiliaria Centro', 'rent',        600.00),
  (current_date - 19, 'Software subscriptions', 'Various SaaS',   'software',    180.00),
  (current_date - 17, 'Electricity',        'Iberdrola',          'utilities',   120.00),
  (current_date - 14, 'Freelance designer', 'Estudio Pixel',      'contractors', 350.00),
  (current_date - 11, 'Office supplies',    'Amazon',             'supplies',     60.00),
  (current_date - 9,  'Internet',           'Movistar',           'utilities',    45.00),
  (current_date - 7,  'Marketing ads',      'Meta Ads',           'marketing',   300.00),
  (current_date - 5,  'Coffee & snacks',    'Mercadona',          'office',       40.00),
  (current_date - 3,  'Accounting service', 'Gestoría López',     'services',    250.00),
  (current_date - 1,  'Domain & hosting',   'Vercel',             'software',    205.00)
) as d(date, description, supplier, category, amount)
cross join lateral (select id from profiles where organization_id = '00000000-0000-0000-0000-000000000001' limit 1) as p
on conflict do nothing;

-- 6) A handful of posts for the feed
insert into posts (organization_id, author_id, content)
select '00000000-0000-0000-0000-000000000001', p.id, c.content
from (values
  ('Welcome to Company OS! 🎉'),
  ('New coffee machine arrived in the office ☕'),
  ('Great job closing the Tienda Rio project this week!'),
  ('Reminder: team lunch this Friday at 2pm'),
  ('We hit 60% of our monthly revenue target 🚀'),
  ('Please submit your expense receipts by end of month')
) as c(content)
cross join lateral (select id from profiles where organization_id = '00000000-0000-0000-0000-000000000001' limit 1) as p;
