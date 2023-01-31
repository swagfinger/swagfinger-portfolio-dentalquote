import { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import { TeethChartCheckboxRow } from './TeethChartCheckboxRow';
export const TeethChartCheckboxGroup = ({
  id,
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
    // console.log('--------------------------------------------');
    // console.log(`${label}`);
    // console.log('topTeethSelected: ', topTeethSelected);
    // console.log('bottomTeethSelected: ', bottomTeethSelected);
    // console.log('--------------------------------------------');

    //pass to calling handler function
    onChange({
      jobType: id,
      saveData: {
        topTeeth: topTeethSelected,
        bottomTeeth: bottomTeethSelected,
        notes: notesForJob,
      },
      validate: validate,
    });
  }, [topTeethSelected, bottomTeethSelected, notesForJob]);

  const validate = () => {
    console.log('hello..');
  };

  const onRowChangeHandler = (rowPosition, index, checked) => {
    console.log(rowPosition, index, checked);

    //create a copy of the current *TeethSelected state
    const newValues =
      rowPosition === 'top' ? [...topTeethSelected] : [...bottomTeethSelected];

    //change 'true'/'false' values to 1s and 0s
    newValues[index] = checked ? 1 : 0;

    //update *TeethSelected state
    rowPosition === 'top'
      ? setTopTeethSelected(newValues)
      : setBottomTeethSelected(newValues);
  };

  const onNotesChangeHandler = (event) => {
    console.log('notes: ', event.target.value);
    setNotesForJob(event.target.value);
  };

  return (
    <div>
      <FormControl component='fieldset' style={{ display: 'flex' }}>
        <FormLabel component='legend'>top teeth</FormLabel>
        <TeethChartCheckboxRow
          id={id}
          readOnly={readOnly}
          rowPosition='top'
          teethArray={topTeethSelected}
          onChange={onRowChangeHandler}
        />
        <br />
        <FormLabel component='legend'>bottom teeth</FormLabel>
        <TeethChartCheckboxRow
          id={id}
          readOnly={readOnly}
          rowPosition='bottom'
          teethArray={bottomTeethSelected}
          onChange={onRowChangeHandler}
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
