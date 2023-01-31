import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
export const TeethChartCheckboxRow = ({
  id = '',
  readOnly = false,
  rowPosition,
  teethArray = [],
  onChange = () => {},
}) => {
  return (
    <FormGroup
      aria-label='position'
      row
      style={{
        display: 'flex',
      }}
    >
      {teethArray.map((tooth, index) => {
        const name = `${id}_${rowPosition}`;

        return (
          <div key={`${rowPosition}_${index}`}>
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  checked={!!tooth} //converts 1's and 0's to boolean
                  style={{ padding: 0, margin: '7px 1px' }}
                  onChange={(event) => {
                    console.log(name, index, event.target.checked);
                    onChange(rowPosition, index, event.target.checked);
                  }}
                  disabled={readOnly === true ? true : false}
                />
              }
              label={index + 1}
              labelPlacement='bottom'
              style={{ padding: 0, margin: 0 }}
            />
          </div>
        );
      })}
    </FormGroup>
  );
};
