import { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import { TeethChartChecboxRow } from './TeethChartChecboxRow';
export const TeethChartCheckboxGroup = ({
  label,
  totalTeeth = 14,
  topTeeth = [],
  bottomTeeth = [],
  notes = '',
  onChange = () => {},
  readOnly = false,
}) => {
  const [topTeethSelected, setTopTeethSelected] = useState(
    topTeeth.length ? topTeeth : new Array(totalTeeth).fill(0)
  );
  const [bottomTeethSelected, setBottomTeethSelected] = useState(
    bottomTeeth.length ? bottomTeeth : new Array(totalTeeth).fill(0)
  );

  const [notesForJob, setNotesForJob] = useState(notes.length ? notes : '');

  useEffect(() => {
    console.log('--------------------------------------------');
    console.log(`${label}`);
    console.log('topTeethSelected: ', topTeethSelected);
    console.log('bottomTeethSelected: ', bottomTeethSelected);
    console.log('--------------------------------------------');

    onChange({
      label: label,
      topTeeth: topTeethSelected,
      bottomTeeth: bottomTeethSelected,
      notes: notesForJob,
    });
  }, [topTeethSelected, bottomTeethSelected, notesForJob]);

  const onTopChangeHandler = (index, checked) => {
    console.log(index, checked);
    const newValues = [...topTeethSelected];
    newValues[index] = checked ? 1 : 0;
    setTopTeethSelected(newValues);
  };

  const onBottomChangeHandler = (index, checked) => {
    console.log(index, checked);
    const newValues = [...bottomTeethSelected];
    newValues[index] = checked ? 1 : 0;
    setBottomTeethSelected(newValues);
  };

  const onNotesChangeHandler = (event) => {
    console.log('notes: ', event.target.value);
    setNotesForJob(event.target.value);
  };

  return (
    <div>
      <FormControl component='fieldset' style={{ display: 'flex' }}>
        <FormLabel component='legend'>top teeth</FormLabel>
        <TeethChartChecboxRow
          label={label}
          readOnly={readOnly}
          rowPosition={'top'}
          teethArray={topTeethSelected}
          onChange={onTopChangeHandler}
        />

        <FormLabel component='legend'>bottom teeth</FormLabel>
        <TeethChartChecboxRow
          label={label}
          readOnly={readOnly}
          rowPosition={'bottom'}
          teethArray={bottomTeethSelected}
          onChange={onBottomChangeHandler}
        />
      </FormControl>

      {/* notes */}
      {(notes.length > 0 || !readOnly) && (
        <>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              label='notes'
              variant='outlined'
              value={notesForJob}
              onChange={onNotesChangeHandler}
              disabled={readOnly === true ? true : false}
            />
          </FormControl>
        </>
      )}
    </div>
  );
};
