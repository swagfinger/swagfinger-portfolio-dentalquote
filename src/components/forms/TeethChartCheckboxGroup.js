import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const TeethChartCheckboxGroup = ({ label }) => {
  const useStyles = makeStyles((theme) => ({
    noPadding: {
      padding: 0,
      margin: 0,
    },
  }));

  const [teethArray, setTeethArray] = useState(new Array(14).fill(''));
  const classes = useStyles();

  return (
    <div>
      <h3>{label}</h3>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>top teeth</FormLabel>
        <FormGroup aria-label='position' row>
          {teethArray.map((_, index) => {
            return (
              <FormControlLabel
                key={'top' + index}
                value='top'
                control={<Checkbox />}
                label={index}
                className={classes.noPadding}
                labelPlacement='bottom'
              />
            );
          })}
        </FormGroup>
        <FormLabel component='legend'>bottom teeth</FormLabel>
        <FormGroup aria-label='position' row>
          {teethArray.map((_, index) => {
            return (
              <FormControlLabel
                key={'bottom' + index}
                value='top'
                control={<Checkbox />}
                label={index}
                className={classes.noPadding}
                labelPlacement='bottom'
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
};
