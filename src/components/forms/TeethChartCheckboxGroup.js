import { useEffect, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

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
  const [bottomTeethSelected, setBotTeethSelected] = useState(
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

  const onBotChangeHandler = (index, checked) => {
    console.log(index, checked);
    const newValues = [...bottomTeethSelected];
    newValues[index] = checked ? 1 : 0;
    setBotTeethSelected(newValues);
  };

  const onNotesChangeHandler = (event) => {
    console.log('notes: ', event.target.value);
    setNotesForJob(event.target.value);
  };

  return (
    <div>
      <FormControl component='fieldset' style={{ display: 'flex' }}>
        <FormLabel component='legend'>top teeth</FormLabel>
        <FormGroup
          aria-label='position'
          row
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          {topTeethSelected.map((tooth, index) => {
            const name = `${label}_top`;

            return (
              <FormControlLabel
                key={'top' + index}
                control={
                  <Checkbox
                    name={name}
                    checked={tooth === 1 ? true : false}
                    style={{ padding: 0, margin: '7px 1px' }}
                    onChange={(event) => {
                      console.log(name, index, event.target.checked);
                      onTopChangeHandler(index, event.target.checked);
                    }}
                    disabled={readOnly === true ? true : false}
                  />
                }
                label={index + 1}
                labelPlacement='bottom'
                style={{ padding: 0, margin: 0 }}
              />
            );
          })}
        </FormGroup>

        <FormLabel component='legend'>bottom teeth</FormLabel>
        <FormGroup
          aria-label='position'
          row
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          {bottomTeethSelected.map((tooth, index) => {
            const name = `${label}_bottom`;

            return (
              <FormControlLabel
                key={'bottom' + index}
                control={
                  <Checkbox
                    name={name}
                    checked={tooth === 1 ? true : false}
                    style={{ padding: 0, margin: '7px 1px' }}
                    onChange={(event) => {
                      console.log(name, index, event.target.checked);
                      onBotChangeHandler(index, event.target.checked);
                    }}
                    disabled={readOnly === true ? true : false}
                  />
                }
                label={index + 1}
                labelPlacement='bottom'
                style={{ padding: 0, margin: 0 }}
              />
            );
          })}
        </FormGroup>
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
