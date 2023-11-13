import React, { useState, useEffect } from 'react';
import { Avatar, Card, Typography, Button, Grid, CardHeader } from '@mui/material';

const ReviewCard = ({ review }) => {
  const [style, setStyle] = useState('angled');
  const [font, setFont] = useState('default');
  const fontFamily = font === 'default' ? '"Arial", sans-serif' : '"Courier New", serif';
  const [expanded, setExpanded] = useState(false);

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  if (!review) return <div>Select a review to display details</div>;

  return (
    <Card sx={{ height: 390 }}>
      <CardHeader
        title="Review Card"
        subheader="Review Card Preview"
      />
      <container
        style={getCardStyle(style, font)}
        sx={{ height: 240, padding: 3 }}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
        >
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
          >
            <Avatar
              alt="Profile Picture"
              src={review.userPic}
              style={{ width: 160, height: 160 }}
            />
          </Grid>
          <Grid
            item
            xs={8}
            container
            direction="column"
            justifyContent="center"
          >
            <Typography
              sx={{ justifyContent: 'center', fontFamily }}
              variant="h4"
            >
              {'⭐'.repeat(review.rating)}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ overflow: 'auto', textOverflow: 'ellipsis', height: 100, fontFamily }}
            >
              {expanded ? review.text : truncateText(review.text)}
              {review.text.length > 150 && (
                <Button
                  onClick={() => setExpanded(!expanded)}
                  sx={{ overflow: 'auto', textOverflow: 'ellipsis', height: 100, fontFamily }}
                >
                  {expanded ? 'Read Less' : 'Read More'}
                </Button>
              )}
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: '15px', fontFamily }}
            >
              Call Now
            </Button>
          </Grid>
        </Grid>
      </container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: '10px' }}
      >
        <Grid
          item
          xs={4}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={() => setStyle(style === 'angled' ? 'rounded' : 'angled')}
          >
            STYLE
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Button variant="contained">COLOR</Button>
        </Grid>
        <Grid
          item
          xs={4}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={() => setFont(font === 'default' ? 'alternative' : 'default')}
          >
            FONT
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

function getCardStyle(style, font) {
  let cardStyles = {};
  if (style === 'angled') {
    cardStyles.borderRadius = '15px';
  } else {
    cardStyles.borderRadius = '0px';
  }
  return cardStyles;
}

export default ReviewCard;
