import classes from './QuoteForm.module.css';
import { useRef, useReducer } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { TeethChartCheckboxGroup } from './TeethChartCheckboxGroup';

export const QuoteForm = ({ onAdd }) => {
  console.log('QuoteForm');
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const selectRef = useRef();

  const quoteReducer = (state, action) => {
    switch (action.type) {
      case 'thingsToQuote':
        return {
          ...state,
          thingsToQuote: {
            ...state.thingsToQuote,
            [action.payload.label]: {
              topTeeth: action.payload.topTeeth,
              bottomTeeth: action.payload.bottomTeeth,
              notes: action.payload.notes,
            },
          },
        };
      case 'removeFromThingsToQuote':
        const updated = { ...action.payload };
        return {
          ...state,
          thingsToQuote: updated,
        };

      case 'update':
        console.log('payload: ', action.payload);
        return {
          ...state,
          menuItems: action.payload.menuItems,
          options: action.payload.options,
        };
      default:
        return state;
    }
  };

  const MENU = [
    { label: 'Filling', value: 10 },
    { label: 'Crowns', value: 20 },
    { label: 'Veneers', value: 30 },
  ];

  const initialState = {
    menuItems: MENU.slice(),
    options: [],
    thingsToQuote: {},
  };
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  //interacting with select component
  const handleChange = (event) => {
    //get item in menu
    console.log('event.target: ', event.target);

    let foundItem = state.menuItems.find((item) => {
      return event.target.value === item.value;
    });

    //remove from menu
    const updatedMenu = state.menuItems.filter((item) => {
      return event.target.value !== item.value;
    });

    console.log('updatedMenu:', updatedMenu);

    dispatch({
      type: 'update',
      payload: {
        menuItems: updatedMenu,
        options: [...state.options, foundItem],
      },
    });
  };

  //remove from options
  const removeOption = (item) => {
    //remove that option at index
    const updatedOptions = state.options.filter((option) => {
      return option.value !== item.value;
    });
    console.log('updatedOptions:', updatedOptions);
    dispatch({
      type: 'update',
      payload: {
        menuItems: [...state.menuItems, item],
        options: updatedOptions,
      },
    });

    //remove from thingsToQuote
    const thingsToQuoteTemp = Object.entries(state.thingsToQuote).filter(
      ([key, value]) => {
        console.log('key: ', key);
        console.log('value:', value);
        return key !== item.label;
      }
    );

    console.log('thingsToQuoteTemp:', Object.fromEntries(thingsToQuoteTemp));

    dispatch({
      type: 'removeFromThingsToQuote',
      payload: Object.fromEntries(thingsToQuoteTemp),
    });
  };

  const toothchartUpdateHandler = (updateObject) => {
    console.log('at parent: ', updateObject);
    dispatch({
      type: 'thingsToQuote',
      payload: {
        label: updateObject.label,
        topTeeth: updateObject.topTeeth,
        bottomTeeth: updateObject.bottomTeeth,
        notes: updateObject.notes,
      },
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //reading entered values 1. use useState to capture entered values
    //reading entered values 2. use useRef

    //read access via current property
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    console.log('thingsToQuote: ', state.thingsToQuote);
    if (Object.keys(state.thingsToQuote).length === 0) {
      alert('quote is empty');
    } else {
      //date
      let date = new Date();
      let dateString = date.toISOString().slice(0, 10);
      let timeString = date.toLocaleTimeString();
      let formattedDate = `${dateString} ${timeString}`;

      console.log('state.thingsToQuote: ', state.thingsToQuote);
      //remove empty keys/values of thingsToQuote
      const filtered = Object.entries(state.thingsToQuote).filter(
        ([key, value]) => {
          console.log('val: ', value);
          //return non-empty values for each key of thingsToQuote
          const foundNonEmpty = Object.values(value).filter((each) => {
            const hasLength = typeof each === 'string' && each.length > 0;
            const hasChecked =
              typeof each === 'object' &&
              each.reduce(function (x, y) {
                return x + y;
              }, 0) > 0;

            console.log('hasLength:', hasLength);
            console.log('hasChecked:', hasChecked);

            return hasLength === true || hasChecked === true;
          });

          console.log('foundNonEmpty: ', foundNonEmpty);
          return foundNonEmpty.length > 0;
        }
      );

      console.log('filtered: ', Object.fromEntries(filtered));

      if (filtered.length > 0) {
        //prepare collected values for sending
        const collectedData = {
          name: enteredName,
          email: enteredEmail,
          thingsToQuote: Object.fromEntries(filtered),
          date: formattedDate,
        };
        console.log('collectedData: ', collectedData);
        alert('gonna send');
        onAdd(collectedData);
      } else {
        alert('form empty');
      }
    }
  };

  return (
    <>
      quote form
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete='off'
        onSubmit={onSubmitHandler}
      >
        <FormControl fullWidth>
          <TextField
            id='outlined-basic'
            label='name'
            variant='outlined'
            inputRef={nameInputRef}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id='outlined-basic'
            label='email'
            variant='outlined'
            inputRef={emailInputRef}
          />
        </FormControl>
        {state.menuItems.length > 0 && (
          <div>
            <h3>add to quote:</h3>
            <FormControl fullWidth>
              <InputLabel id='job-type'>Job type</InputLabel>

              <Select
                labelId='job-type-label'
                id='job-type'
                value=''
                label='Job type'
                name='select'
                onChange={handleChange}
                inputRef={selectRef}
              >
                {state.menuItems.map(({ value, label }, index) => {
                  return (
                    <MenuItem key={'select_' + index} value={value}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        )}
        {state.options.length > 0 && (
          <div>
            <h3>quote:</h3>
            <div>
              {state.options.map((item, index) => {
                return (
                  <div key={'option_' + item.label + item.value}>
                    <TeethChartCheckboxGroup
                      label={item.label}
                      onChange={toothchartUpdateHandler}
                    />
                    <button type='button' onClick={() => removeOption(item)}>
                      remove
                    </button>
                    <br />
                    <br />
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* put multicheckbox here... */}
        <div className={classes.actions}>
          <button>submit</button>
        </div>
      </Box>
    </>
  );
};
