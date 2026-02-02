
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gybdrgafoopayfogbgyc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5YmRyZ2Fmb29wYXlmb2diZ3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMTY4NTUsImV4cCI6MjA4NTU5Mjg1NX0.kwNbkxhvXt-N8igEx-wlWL_UCn4FWHnEphi3HQ-WMts'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
