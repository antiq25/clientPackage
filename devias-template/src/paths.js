export const paths = {
  index: '/',
  blank: '/blank',
  dashboard: '/dashboard',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify',
  notFound: '/404',
  serverError: '/500',
  trends: 'trends',
  billing: '/billing',
  map: '/map',
  pixel: '/pixel',
  docs: 'docs',
  widget: '/widget',
  accounts: '/accounts',
  test: '/test',
    jobs: {
      index: '/dashboard/jobs',
      create: '/dashboard/jobs/create',
      companies: {
        details: '/dashboard/jobs/companies/:companyId',
      },
    },
  auth: {
    jwt: {
      login: '/auth/jwt/login',
      register: '/auth/jwt/register',
      verify: '/auth/jwt/verify',
      forgotPassword: '/auth/jwt/forgot-password',
      resetPassword: '/auth/jwt/reset-password',
    },
    firebase: {
      login: '/auth/firebase/login',
      register: '/auth/firebase/register',
      verify: '/auth/firebase/verify',
      forgotPassword: '/auth/firebase/forgot-password',
      resetPassword: '/auth/firebase/reset-password',
    },
  }
    }
