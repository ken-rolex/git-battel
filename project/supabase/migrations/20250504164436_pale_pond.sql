/*
  # Create saved comparisons table

  1. New Tables
    - `saved_comparisons`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `usernames` (text array)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `saved_comparisons` table
    - Add policy for authenticated users to manage their own saved comparisons
*/

CREATE TABLE IF NOT EXISTS saved_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  usernames text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saved comparisons"
  ON saved_comparisons
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);