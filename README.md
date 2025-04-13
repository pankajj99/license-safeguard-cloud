
# Client License Management System

## Setup Instructions

### Environment Variables

For the application to work correctly, you need to set up the following environment variables:

1. `VITE_SUPABASE_URL`: Your Supabase project URL
2. `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

You can set these environment variables:

1. Directly in the Lovable interface under Project Settings.
2. By adding them when you deploy your application.

Example values:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup

Make sure your Supabase project has the following tables:

1. `licenses` - For storing license information
2. `clients` - For storing client information
3. `license_users` - For storing users associated with licenses
4. `documents` - For storing license-related documents
5. `notifications` - For storing system notifications
6. `license_history` - For tracking license actions

Refer to the database types in `src/types/database.types.ts` for the exact schema.
