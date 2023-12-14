import { format, subHours, subMinutes, subSeconds } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const now = new Date();

const GridList1 = ({ posts }) => (
  <Box
    sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
      p: 3,
    }}
  >
    <Grid
      container
      spacing={3}
    >
      {posts.map((post) => (
        <Grid
          key={post.id}
          xs={12}
          md={4}
        >
          <Card
            sx={{
              height: '100%',
              p: 2,
            }}
          >
            <Box
              sx={{
                pt: 'calc(100% * 4 / 4)',
                position: 'relative',
              }}
            >
              <CardMedia
                image={post.cover}
                sx={{
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <div>
                <Chip
                  label={post.category}
                  variant="outlined"
                />
              </div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  my: 2,
                }}
              >
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">{post.author.name}</Typography>
                  <Typography
                    color="text.secondary"
                    variant="caption"
                  >
                    {`${format(post.publishedAt, 'dd MMM')} · ${post.readTime} read`}
                  </Typography>
                </Box>
              </Box>
              <Link
                color="text.primary"
                variant="h6"
              >
                {post.title}
              </Link>
              <Typography
                color="text.secondary"
                sx={{
                  height: 72,
                  mt: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
                variant="body1"
              >
                {post.shortDescription}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default GridList1;
