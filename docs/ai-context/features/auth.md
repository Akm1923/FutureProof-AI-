# Authentication Feature

## Purpose
User authentication and session management using Supabase Auth with JWT-based authentication, providing secure access control across the application.

## Responsibilities
- User registration (sign up)
- User login (sign in)
- Session management
- User logout (sign out)
- Protected route enforcement
- Auth state persistence
- User context provision to entire app

## User Flows Supported
1. **Sign Up**: New user → Enter email/password → Create account → Auto-login
2. **Sign In**: Existing user → Enter credentials → Authenticate → Redirect to dashboard
3. **Sign Out**: Authenticated user → Click sign out → Clear session → Redirect to landing
4. **Protected Access**: Unauthenticated user tries protected route → Redirect to login
5. **Session Persistence**: User refreshes page → Session restored from Supabase

## Backend Components

### Location
No dedicated backend module - uses Supabase Auth service directly

### Integration
- Supabase handles all authentication logic
- JWT tokens issued by Supabase
- Backend validates tokens via Supabase SDK
- RLS policies enforce user isolation

## Frontend Components

### Location
`frontend/src/context/AuthContext.jsx`
`frontend/src/features/auth/`
`frontend/src/pages/Login.jsx`
`frontend/src/pages/Landing.jsx`

### Structure
```
context/
└── AuthContext.jsx        # Global auth state

features/auth/
├── components/            # Login/Signup forms
├── hooks/                 # useAuth hook
├── services/              # Auth API calls
└── pages/                 # Auth pages

pages/
├── Login.jsx              # Login/Signup page
└── Landing.jsx            # Public landing page
```

### Key Components
- **AuthContext**: React Context providing auth state globally
- **AuthProvider**: Wraps entire app, manages auth state
- **ProtectedRoute**: HOC that enforces authentication
- **useAuth**: Custom hook for accessing auth state

## API Integration

### Supabase Auth Methods

#### signUp(email, password)
- Creates new user account
- Sends verification email (if enabled)
- Returns user object and session

#### signInWithPassword(email, password)
- Authenticates existing user
- Returns session with JWT token
- Token stored in localStorage

#### signOut()
- Invalidates current session
- Clears localStorage
- Redirects to landing page

#### getSession()
- Retrieves current session
- Called on app initialization
- Restores user state

#### onAuthStateChange(callback)
- Listens for auth state changes
- Triggers on login/logout
- Updates React state automatically

## Data Flow

```
User Action (Login/Signup)
    ↓
Frontend Form Submission
    ↓
Supabase Auth API
  - signInWithPassword()
  - signUp()
    ↓
Supabase Backend
  - Validate credentials
  - Generate JWT token
  - Create session
    ↓
Response
  - User object
  - Session object
  - JWT token
    ↓
AuthContext State Update
  - setUser(user)
  - Store in localStorage
    ↓
App Re-render
  - Protected routes accessible
  - User-specific data loads
  - Dashboard displays
```

## Dependencies

### External Services
- **Supabase Auth**: Complete authentication service
  - User management
  - JWT token generation
  - Session handling
  - Email verification (optional)

### JavaScript Libraries
- `@supabase/supabase-js`: Supabase client
- `React`: Context API for state management
- `React Router`: Navigation and protected routes
- `React Hot Toast`: Auth notifications

## Authentication Flow

### Sign Up Flow
```
┌─────────────────────────────────────┐
│  User enters email/password         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Frontend: signUp(email, password)  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Supabase Auth Service              │
│  - Validate email format            │
│  - Hash password                    │
│  - Create user record               │
│  - Generate JWT token               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Return: { user, session }          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  AuthContext: setUser(user)         │
│  Store session in localStorage      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Navigate to /dashboard             │
└─────────────────────────────────────┘
```

### Sign In Flow
```
┌─────────────────────────────────────┐
│  User enters credentials            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Frontend: signIn(email, password)  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Supabase Auth Service              │
│  - Verify credentials               │
│  - Generate new JWT token           │
│  - Create session                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Return: { user, session }          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  AuthContext: setUser(user)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Navigate to /dashboard             │
└─────────────────────────────────────┘
```

### Protected Route Flow
```
┌─────────────────────────────────────┐
│  User navigates to /dashboard       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  ProtectedRoute Component           │
│  - Check: user exists?              │
└──────────────┬──────────────────────┘
               │
         ┌─────┴─────┐
         │           │
    Yes  │           │  No
         ▼           ▼
┌──────────────┐  ┌──────────────┐
│ Render       │  │ Navigate to  │
│ Dashboard    │  │ /login       │
└──────────────┘  └──────────────┘
```

## Owned Files

### Frontend
- `frontend/src/context/AuthContext.jsx` (PRIMARY)
- `frontend/src/features/auth/**`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Landing.jsx`
- `frontend/src/lib/supabase.js` (Supabase client initialization)
- `frontend/src/App.jsx` (ProtectedRoute wrapper)

### Configuration
- `frontend/.env` (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

### Database
- Supabase `auth.users` table (managed by Supabase)

## Interaction With Other Features

### Provides To
- **All Features**: User authentication state via `useAuth()` hook
- **Dashboard**: User object (email, id)
- **Resume**: user_id for RLS policies
- **Roadmap**: user_id for data isolation
- **Skills Analytics**: user_id for data queries

### Dependencies
- **Supabase**: Complete dependency on Supabase Auth service

### Integration Points
- **App.jsx**: AuthProvider wraps entire app
- **All Protected Pages**: Use ProtectedRoute wrapper
- **All API Calls**: Include user_id from auth context

## Extension Points

### Adding OAuth Providers
1. Enable provider in Supabase dashboard
2. Add provider button in Login.jsx
3. Call `supabase.auth.signInWithOAuth({ provider })`

### Adding Email Verification
1. Enable in Supabase dashboard
2. Configure email templates
3. Handle verification flow in frontend

### Adding Password Reset
1. Add "Forgot Password" link
2. Call `supabase.auth.resetPasswordForEmail()`
3. Handle reset token in callback URL

### Adding Multi-Factor Authentication
1. Enable MFA in Supabase
2. Add MFA enrollment flow
3. Handle MFA challenges

## Security Considerations

### JWT Tokens
- Stored in localStorage (Supabase default)
- Auto-refreshed by Supabase client
- Expire after configured duration
- Validated on every API request

### Row Level Security (RLS)
- All database tables use RLS
- Policies check `auth.uid() = user_id`
- Prevents unauthorized data access
- Enforced at database level

### Password Security
- Hashed by Supabase (bcrypt)
- Never stored in plain text
- Never sent to frontend
- Minimum length enforced

## Error Handling

### Common Errors
- **Invalid credentials**: Show error toast
- **Email already exists**: Show error toast
- **Network error**: Retry mechanism
- **Session expired**: Auto-redirect to login

### Error Messages
- User-friendly messages displayed
- Technical errors logged to console
- No sensitive information exposed

## Performance Considerations
- Session check on app load: ~100ms
- Login/signup: ~500ms
- Token refresh: Automatic, transparent
- Auth state changes: Instant React updates

## Testing Considerations
- Test with valid/invalid credentials
- Test session persistence across refreshes
- Test protected route enforcement
- Test logout clears all state

## Future Enhancements
- OAuth providers (Google, GitHub)
- Email verification
- Password reset flow
- Multi-factor authentication (MFA)
- Magic link authentication
- Session management dashboard
- Account deletion
- Profile settings

---

**Feature Status**: FULLY IMPLEMENTED  
**Last Updated**: 2026-02-22  
**Maintainer**: Development Team
