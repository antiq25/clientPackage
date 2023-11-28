import CurrencyDollarIcon from '@untitled-ui/icons-react/build/esm/CurrencyDollar';
import FolderIcon from '@untitled-ui/icons-react/build/esm/Folder';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { SeverityPill } from 'src/src2/components/severity-pill';
import { logView, logClick, getViewCount, getClickCount } from 'src/components/apiWidget';

export const QuickStats2 = () => {
  // Use the counts in your component's state
  const [viewCount, setViewCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const view = await getViewCount();
      const click = await getClickCount();
      setViewCount(view);
      setClickCount(click);
      // Calculate conversion rate
      const conversion = view !== 0 ? (click / view) * 100 : 0;
      setConversionRate(conversion);
    };

    fetchCounts();
  }, []);

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',

        p: 1,
      }}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          md={4}
        >
          <Card>
            <Stack
              alignItems="center"
              direction="row"
              sx={{ p: 3 }}
              spacing={3}
            >
              <Stack
                spacing={1}
                sx={{ flexGrow: 1 }}
              >
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  Click&apos;s
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Typography variant="h5">{clickCount}</Typography>
                  <SeverityPill color="success">4%</SeverityPill>
                </Stack>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  height: 48,
                  width: 48,
                }}
              >
                <SvgIcon>
                  <CurrencyDollarIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={4}
        >
          <Card>
            <Stack
              alignItems="center"
              direction="row"
              sx={{ p: 3 }}
              spacing={2}
            >
              <Stack
                spacing={1}
                sx={{ flexGrow: 1 }}
              >
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  View&apos;s
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Typography variant="h5">{viewCount}</Typography>
                </Stack>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  height: 48,
                  width: 48,
                }}
              >
                <SvgIcon>
                  <FolderIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={4}
        >
          <Card>
            <Stack
              spacing={1}
              sx={{ p: 3 }}
            >
              <Typography
                color="text.secondary"
                variant="overline"
              >
                Conversion
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Typography variant="h5">{conversionRate.toFixed(2)}%</Typography>
                <LinearProgress
                  color="primary"
                  sx={{ flexGrow: 1 }}
                  value={74}
                  variant="determinate"
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>

  );
};


