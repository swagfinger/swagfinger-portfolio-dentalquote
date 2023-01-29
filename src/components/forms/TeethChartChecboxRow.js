import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const TeethChartChecboxRow = ({
  label = '',
  readOnly = false,
  rowPosition = '',
  teethArray = [],
  onChange = () => {},
}) => {
  return (
    <>
      <FormGroup
        aria-label='position'
        row
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        {teethArray.map((tooth, index) => {
          const name = `${label}_${rowPosition}`;

          return (
            <FormControlLabel
              key={`${rowPosition}index`}
              control={
                <Checkbox
                  name={name}
                  checked={tooth === 1 ? true : false}
                  style={{ padding: 0, margin: '7px 0px' }}
                  onChange={(event) => {
                    console.log(name, index, event.target.checked);
                    onChange(index, event.target.checked);
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
    </>
  );
};
