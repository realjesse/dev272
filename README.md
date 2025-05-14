DEV272 Mobile Project, by Jesse Wattenhofer.

Supabase Configuration

The whole app is linked to remote storage (supabase) with the painting context
provider wrapping the entire app in the root layout. The painting context
provider fetches the data from the useGetPaintings.ts hook, which is the actual
hook connected with the supabase server.  Every component which relies on any
painting data now relies on the painting context provider.