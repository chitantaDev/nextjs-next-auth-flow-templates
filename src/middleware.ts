import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: '/login'
    }
})

// add more routes, maybe make all protected routes inside a protected/* directory so its easier to paste it here
export const config = {
    matcher: ['/']
}