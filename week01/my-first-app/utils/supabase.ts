import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://akzmutrbyxuvyrzsguay.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrem11dHJieXh1dnlyenNndWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTMzMTMsImV4cCI6MjA2MjY2OTMxM30.X1kIAH_1hgfswIz2reTg9gFkKBYZYYSJaquv6h2iTKc",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
        