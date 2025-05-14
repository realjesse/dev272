DEV272 Mobile Project, by Jesse Wattenhofer.

Supabase Configuration

The whole app is linked to remote storage (Supabase) with the painting context
provider wrapping the entire app in the root layout. The painting context
provider fetches the data from the useGetPaintings.ts hook, which is the actual
hook connected with the Supabase server.  Every component which relies on any
painting data now relies on the painting context provider. Actual configuration
for Supabase is located in the utils/supabase.ts (which is what actually links
the app to the specific remote server).

React-Query Use

A React-Query provider wraps the entire app in the root layout with 
QueryCleintProvider.  The useAddPainting and useGetPaintings hooks use the 
React-QueryProvider to function.  The painting context provider, in turn, uses
the useGetPaintings to actually fetch the data from the remote server to use
it.