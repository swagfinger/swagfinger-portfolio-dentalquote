import { useEffect, useState } from 'react';
import { css } from '@emotion/css';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const TeethChartCheckboxGroup = ({
  label,
  totalTeeth = 14,
  topTeeth = [],
  bottomTeeth = [],
  onChange = () => {},
  readOnly = false,
}) => {
  const [topTeethSelected, setTopTeethSelected] = useState(
    topTeeth.length ? topTeeth : new Array(totalTeeth).fill(0)
  );
  const [bottomTeethSelected, setBotTeethSelected] = useState(
    bottomTeeth.length ? bottomTeeth : new Array(totalTeeth).fill(0)
  );

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
    });
  }, [topTeethSelected, bottomTeethSelected]);

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

  return (
    <div>
      <h3>{label}</h3>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>top teeth</FormLabel>
        <FormGroup aria-label='position' row>
          {topTeethSelected.map((tooth, index) => {
            const name = `${label}_top`;

            return (
              <FormControlLabel
                key={'top' + index}
                control={
                  <Checkbox
                    name={name}
                    checked={tooth === 1 ? true : false}
                    style={{ padding: 0, margin: '7px' }}
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
        <FormGroup aria-label='position' row>
          {bottomTeethSelected.map((tooth, index) => {
            const name = `${label}_bottom`;

            return (
              <FormControlLabel
                key={'bottom' + index}
                control={
                  <Checkbox
                    name={name}
                    checked={tooth === 1 ? true : false}
                    style={{ padding: 0, margin: '7px' }}
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
    </div>
  );
};
