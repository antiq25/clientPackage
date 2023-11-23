import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export const JobDetailsStep = (props) => {
  const { onBack, onNext, ...other } = props;
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2022-09-22T11:41:50'));
  const [endDate, setEndDate] = useState(new Date('2023-01-11T12:41:50'));

  const handleStartDateChange = useCallback((date) => {
    setStartDate(date);
  }, []);

  const handleEndDateChange = useCallback((date) => {
    setEndDate(date);
  }, []);

  const handleTagAdd = useCallback((tag) => {
    setTags((prevState) => {
      return [...prevState, tag];
    });
  }, []);

  const handleTagDelete = useCallback((tag) => {
    setTags((prevState) => {
      return prevState.filter((t) => t !== tag);
    });
  }, []);

  return (
    <Stack
      spacing={3}
      {...other}
    >
      <div>
        <Typography variant="h6">Widget Details</Typography>
      </div>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Widget Name"
          name="jobTitle"
          placeholder="e.g Bob's Trucking Widget"
        />
        <TextField
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  color="inherit"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    if (!tag) {
                      return;
                    }

                    handleTagAdd(tag);
                    setTag('');
                  }}
                >
                  Add
                </Button>
              </InputAdornment>
            ),
          }}
          label="Tags"
          name="tags"
          onChange={(event) => setTag(event.target.value)}
          value={tag}
        />
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          spacing={1}
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
              variant="outlined"
            />
          ))}
        </Stack>
      </Stack>
      <div>
        <Typography variant="h6">Reviews From:</Typography>
      </div>
      <Stack
        alignItems="center"
        direction="row"
        spacing={3}
      >
        <MobileDatePicker
          label="Start Date"
          format="MM/dd/yyyy"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <MobileDatePicker
          label="End Date"
          format="MM/dd/yyyy"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"
        >
          Continue
        </Button>
        <Button
          color="inherit"
          onClick={onBack}
        >
          Back
        </Button>
      </Stack>
    </Stack>
  );
};

JobDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};