
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { RouterLink } from 'src/src2/components/router-link';
import { Seo } from 'src/src2/components/seo';
import { GuestGuard } from 'src/src2/guards/guest-guard';
import { IssuerGuard } from 'src/src2/guards/issuer-guard';
import { useAuth } from 'src/src2/hooks/use-auth';
import { useMounted } from 'src/src2/hooks/use-mounted';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { useRouter } from 'src/src2/hooks/use-router';
import { useSearchParams } from 'src/src2/hooks/use-search-params';
import { Layout as AuthLayout } from 'src/pages/test';
import { paths } from 'src/paths';
import { AuthIssuer } from 'src/src2/sections/auth/auth-issuer';
import { Issuer } from 'src/src2/utils/auth';
// Import the API handler functions from bundle.js
import { apiHandler } from 'src/api/bundle'; // Replace with the correct relative path to bundle.js
import CustomSnackbar  from '../components/snack';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-hot-toast';




const initialValues = {
  email: '',
  password: '',
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const Page = () => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const { issuer } = useAuth(); // Assuming useAuth provides a login method
  const isMounted = useMounted();
  const formik = useFormik({

    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await apiHandler.handleLogin(values.email, values.password);
        if (response.success && isMounted()) {
          setSnackbarMessage(response.message || 'Success!');
          toast.success('Success!')
          setSnackbarSeverity(``);
          setSnackbarOpen(true);
          setTimeout(() => {
            setSnackbarOpen(false);
            router.push(returnTo || paths.index);
          }, 3000);
        } else {

          setSnackbarMessage(response.error || 'Login failed');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: response.error });
        }
      } catch (err) {
        console.error(err);
        setSnackbarMessage(err.message || 'An error occurred');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  usePageView();

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account? &nbsp;
                <Link
                  component={RouterLink}
                  href={paths.register}
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Log in"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
              <CustomSnackbar
        open={snackbarOpen}
autoHideDuration={2000}
onClose={() => setSnackbarOpen(false)}
        handleClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
                <TextField
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
        <Stack
          spacing={3}
          sx={{ mt: 3 }}
        >

          <AuthIssuer issuer={issuer} />
        </Stack>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
