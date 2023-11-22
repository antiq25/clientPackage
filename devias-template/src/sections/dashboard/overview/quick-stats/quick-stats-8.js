import RefreshCcw02Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw02';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { OtherPage } from 'src/components/setData';
import { Chart } from 'src/src2/components/chart';




const chartSeries = [
  {
    name: 'Counts',
    data: [clickCount],
  },
];

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
  };
};

export const QuickStats8 = () => {
  const chartOptions = useChartOptions();
    const [clickCount, setClickCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
      (async () => {
        const data = await getCounts();
        if (data) {
          setClickCount(data.clickCount);
          setViewCount(data.viewCount);
        }
      })();
    }, []);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
        p: 3,
      }}
    >
      <Box
        maxWidth="sm"
        sx={{ mx: 'auto' }}
      >
        <Card>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <SvgIcon>
                <RefreshCcw02Icon />
              </SvgIcon>
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                color="text.secondary"
                noWrap
                variant="body1"
              >
                Conversions
              </Typography>
              <Typography variant="h4">361</Typography>
            </Box>
            <Box sx={{ maxWidth: 200 }}>
              <Chart
                height={100}
                type="line"
                options={chartOptions}
                series={chartSeries}
                data={[{ name: 'Counts', clickCount, viewCount }]}
              />
            </Box>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};
