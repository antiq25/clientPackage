import PropTypes from 'prop-types';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { BreadcrumbsSeparator } from 'src/src2/components/breadcrumbs-separator';
import { RouterLink } from 'src/src2/components/router-link';
import { paths } from 'src/src2/paths';

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

export const Layout = (props) => {
  const { breadcrumbs, children, title } = props;

  return (
    <LayoutRoot>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
          py: '120px',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {!breadcrumbs && (
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.components.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Components</Typography>
                </Link>
              </div>
            )}
            <div>
              <Typography variant="h1">{title}</Typography>
            </div>
            {breadcrumbs && (
              <div>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  {breadcrumbs.map((item, index) => {
                    const isLast = breadcrumbs.length - 1 === index;

                    if (isLast) {
                      return (
                        <Typography
                          color="text.secondary"
                          key={index}
                          variant="subtitle2"
                        >
                          {item.title}
                        </Typography>
                      );
                    }

                    return (
                      <Link
                        color="text.primary"
                        component={RouterLink}
                        href={item.href}
                        key={index}
                        variant="subtitle2"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </Breadcrumbs>
              </div>
            )}
          </Stack>
        </Container>
      </Box>
      <Divider />
      <LayoutContainer>{children}</LayoutContainer>
    </LayoutRoot>
  );
};

Layout.propTypes = {
  breadcrumbs: PropTypes.array,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};