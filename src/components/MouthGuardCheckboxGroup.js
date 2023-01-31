import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import TextField from '@mui/material/TextField';

export const MouthGuardCheckboxGroup = ({
  id,
  top = false,
  bottom = false,
  notes = '',
  onChange = () => {},
  readOnly = false,
}) => {
  const [topSelected, setTopSelected] = useState(top ? top : false);
  const [bottomSelected, setBottomSelected] = useState(bottom ? bottom : false);

  const [notesForJob, setNotesForJob] = useState(notes.length ? notes : '');

  useEffect(() => {
    //pass to calling handler function
    onChange({
      jobType: id,
      saveData: {
        top: topSelected,
        bottom: bottomSelected,
        notes: notesForJob,
      },
    });
  }, [topSelected, bottomSelected, notesForJob]);

  const onTopChangeHandler = (event) => {
    setTopSelected(event.target.checked);
  };

  const onBottomChangeHandler = (event) => {
    setBottomSelected(event.target.checked);
  };

  const onNotesChangeHandler = (event) => {
    console.log('notes: ', event.target.value);
    setNotesForJob(event.target.value);
  };

  return (
    <div>
      <FormControl component='fieldset' style={{ display: 'flex' }}>
        <FormControlLabel
          control={
            <Checkbox
              name={id}
              checked={topSelected}
              style={{ padding: 0, margin: '7px 1px' }}
              onChange={onTopChangeHandler}
              disabled={readOnly === true ? true : false}
            />
          }
          label='top'
          labelPlacement='end'
          style={{ padding: 0, margin: 0 }}
        />
      </FormControl>

      <FormControl component='fieldset' style={{ display: 'flex' }}>
        <FormControlLabel
          control={
            <Checkbox
              name={id}
              checked={bottomSelected}
              style={{ padding: 0, margin: '7px 1px' }}
              onChange={onBottomChangeHandler}
              disabled={readOnly === true ? true : false}
            />
          }
          label='bottom'
          labelPlacement='end'
          style={{ padding: 0, margin: 0 }}
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
