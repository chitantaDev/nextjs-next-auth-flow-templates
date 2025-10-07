TODO:
Document the templates setup:
- all npm packages
- sql creation script
- database structure diagram
- auth workflow
- directory structure intro
- enviroment variables / .env* setup
- google smtp server setup: create account -> 2FA -> App Password -> create App + password -> paste into env
- Database file location - Where SQLite file gets created
- Database initialization - How to create the database file and run the SQL script
- NextAuth configuration - Secret generation, URL setup
- Node.js, Nextjs, NextAuth version requirements - Which version you used/recommend
- Secret generation



Features: 
- Role handling (currently no use case, no admin dashboard, no nothing, only user functionality. roles not needed rn)
  - maybe it will be needed so not just anoyone can inject a custom user id from a postman client and change other ppls databases
  or does the session provider provide authorized access and thats impossible to begin with
  - no need to cover this. nextauth handles authorized access, no one else can access someonelses sql table
- handle Loading state, insert skeletons or something to let the user know its loading
  - maybe not always necessary cuz rn useSession runs anew on refresh as it should, but navigating throuhg the website will no destroy the session
    so the data will be persisted in memory (in memory, do we need Zustand for global state management? idk, worth to consider for future use cases)
- Delete Account functionality (button in header)
- 2 Pages, Home Page and Dummy Page to have back and forth navigation with buttons or something
- Registration needs 2 password fields so u can check if u misstyped
- clean up global.css and maybe put the styles into the directories of the components / pages

Quality of Life improvments (necessities)
- sanitize SQL Statements to protect from SQLInjections
- rate limit access to my backend api routes 
- think about component and page structure, shared-ui, core components, shared-components (dumb components) and specific 
smart components for its one specific use case in one component or page
- repository, controller, service setup and directory structure: its easy and nice to have SQL statements where u need them
but when I scale the template into a product, this will get too messy

Where to depoy? Nextjs free vercel deployment eventho i have a backend? is the backend lightweight enough so i dont 
have to rent a server like for a java spring app, can i host for free? sqlite3 so i dont need a db server

# Claude Sonnet AI Feedback on what TODOS to add to my list:

## Security & Production Readiness
- **Environment validation** - Ensure all required env vars are present on startup
- **HTTPS enforcement** - Redirect HTTP to HTTPS in production
- **Secure headers** - Add security headers (HSTS, CSP, X-Frame-Options)
- **Password strength validation** - Min 8 chars, special chars, etc.
- **Account lockout** - Lock accounts after failed login attempts
- 
## Error Handling & Monitoring
- **Global error boundary** - Catch and handle React errors gracefully
- **API error standardization** - Consistent error response format
- **Logging system** - Structured logging for debugging production issues
- **Health check endpoint** - `/api/health` for monitoring

## User Experience
- **Loading states** - Proper loading indicators for all async operations
- **Form validation** - Client-side validation with proper error messages
- **Toast notifications** - Success/error messages instead of alerts
- **Responsive design** - Mobile-first approach
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support

## Database & Performance
- **Database migrations** - Version control for schema changes
- **Connection pooling** - Proper database connection management
- **Backup strategy** - Automated database backups
- **Database indexes optimization** - Review and optimize all queries

## DevOps & Deployment
- **Docker containerization** - For consistent deployments
- **CI/CD pipeline** - Automated testing and deployment
- **Environment configs** - Dev/staging/prod environment separation
- **Database seeding** - Scripts for initial data setup

## Legal & Compliance
- **Privacy policy** - GDPR/CCPA compliance if needed
- **Terms of service** - User agreement
- **Cookie consent** - If using tracking cookies
- **Data retention policy** - How long to keep user data

# GDPR Concenrs (EU Laws / German Laws I have to adhere to when creating a website)

# EU Compliance for One-Man SaaS (Build Fast Ship Fast)

## GDPR Essentials (Can't Skip)
- **Privacy Policy** - Simple template from a generator (30 mins)
- **Data collection notice** - "We collect email/username for account creation"
- **Right to deletion** - Your delete account feature covers this ✅
- **Data breach notification** - If you get hacked, notify users within 72 hours

## Cookies (Simple Fix)
- **If you're ONLY using NextAuth session cookies** - No banner needed (essential cookies)
- **If you add Google Analytics later** - Then you need a cookie banner
- **For now** - Skip the cookie banner, you're good

## Password Storage (You're Already Compliant)
- **bcrypt hashing** ✅ - You're already doing this correctly
- **No plain text storage** ✅ - You hash immediately

## Terms of Service
- **Basic template** - "Don't abuse the service, we can terminate accounts"
- **Liability disclaimer** - "Service provided as-is"

## What You DON'T Need (Build Fast Mode)
- ❌ Cookie consent banners (unless tracking users)
- ❌ Complex data processing agreements
- ❌ GDPR officer appointment (under 250 employees)
- ❌ Data protection impact assessments
- ❌ Detailed audit logs

## Quick Implementation (1 day max)
1. **Privacy policy generator** - Use a free template
2. **Terms generator** - Use a free template
3. **Add links in footer** - Privacy | Terms
4. **Delete account button** - You already planned this

**That's it!** You're 95% compliant with minimal effort. Launch first, optimize compliance later when you have revenue.


06.10.2025

- make landingpage available to the public and protected user
- always show header, when user is not logged in, dont display session.name and logout button, instead make login button that directs user to login page

07.10.2025
- Start thinkink about saving the PDFS
  - before saving them, implement FES signature
  - make the process for allowing the contractor (me, the current user) to FES sign 
    - and then send it out to the client
  - Then think about how to enable the client to sign it from his "email" ? directly from his mailbox?
    - or do i send the email with the pdf as a preview and a link to my website, where the client ON MY PAGE actually goes through and signs there 

not optimized for phones
- pdf preview also sucks on phone because the text gets compressed to the middle.
- figure out how to have the same preview that u have when u open the contract on google mail