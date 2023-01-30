import classes from './QuoteForm.module.css';
import { useRef, useReducer, useEffect, useState, Suspense, lazy } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { filterObjectEmptyData } from '../../utilities/filterObjectEmptyData';
import { withNamedExport } from '../../utilities/withNamedExport';

export const QuoteForm = ({ onAdd }) => {
  console.log('QuoteForm');
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const [jobTypes, setJobTypes] = useState([]);

  // -----------------------------------------------------------------------------------
  //reducers

  const quoteReducer = (state, action) => {
    switch (action.type) {
      case 'thingsToQuote':
        return {
          ...state,
          thingsToQuote: {
            ...state.thingsToQuote,
            // key is the jobType
            //value is what to save for the job type
            [action.payload.jobType]: action.payload.saveData,
          },
        };
      case 'cleanupThingsToQuote':
        return {
          ...state,
          thingsToQuote: action.payload.thingsToQuote,
        };
      default:
        return state;
    }
  };

  const [quoteState, quoteDispatch] = useReducer(quoteReducer, {
    thingsToQuote: {},
  });

  const selectReducer = (state, action) => {
    switch (action.type) {
      case 'updateSelect':
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

  const [selectState, selectDispatch] = useReducer(selectReducer, {
    menuItems: jobTypes,
    options: [],
  });

  // -----------------------------------------------------------------------------------
  // useEffects

  useEffect(() => {
    const getServerData = async () => {
      const response = await fetch(
        'https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/users/myid.json'
      );
      const responseData = await response.json();
      console.log('responseData: ', responseData); //returns an object with jobTypes and jobTypesComponent

      // jobTypes
      const jobTypes = [];

      const fetchedJobTypes = responseData['jobTypes'];
      const fetchedJobTypesComponent = responseData['jobTypesComponent'];

      for (const key in fetchedJobTypes) {
        jobTypes.push({
          id: key,
          component: fetchedJobTypesComponent[key].edit, //the edit component (see firebase db)
          label: fetchedJobTypes[key].label,
          price: fetchedJobTypes[key].price,
        });
      }
      setJobTypes(jobTypes);
    };
    getServerData();
  }, []);

  useEffect(() => {
    selectDispatch({
      type: 'updateSelect',
      payload: {
        menuItems: jobTypes,
        options: [],
      },
    });
  }, [jobTypes]);

  // -----------------------------------------------------------------------------------
  //select handlers

  //interacting with select component - find Select value
  const handleSelectChange = (event) => {
    //get item in menu
    console.log('event.target: ', event.target);

    let foundItem = selectState.menuItems.find((item) => {
      return event.target.value === item.id;
    });

    //remove from menu
    const updatedMenu = selectState.menuItems.filter((item) => {
      return event.target.value !== item.id;
    });

    console.log('updatedMenu:', updatedMenu);

    selectDispatch({
      type: 'updateSelect',
      payload: {
        menuItems: updatedMenu,
        options: [...selectState.options, foundItem],
      },
    });
  };

  //remove from options
  const removeFormComponent = (item) => {
    //remove that option at index
    const updatedOptions = selectState.options.filter((option) => {
      return option.id !== item.id;
    });
    console.log('updatedOptions:', updatedOptions);
    selectDispatch({
      type: 'updateSelect',
      payload: {
        menuItems: [...selectState.menuItems, item],
        options: updatedOptions,
      },
    });

    //for <select> - but quote related
    quoteDispatch({
      type: 'cleanupThingsToQuote',
      payload: {
        thingsToQuote: Object.fromEntries(
          // value is set as 'id' in select
          Object.entries(quoteState.thingsToQuote).filter(([key, value]) => {
            console.log('key: ', key);
            console.log('value:', value);
            return key !== item.id; //compare the selected "id" to thingsToQuote[id]
          })
        ),
      },
    });
  };
  // -----------------------------------------------------------------------------------

  //quote related
  const formComponentUpdateHandler = (updateObject) => {
    console.log('at parent: ', updateObject);
    quoteDispatch({
      type: 'thingsToQuote',
      payload: {
        jobType: updateObject.jobType,
        saveData: updateObject.saveData,
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
    console.log('thingsToQuote: ', quoteState.thingsToQuote);
    if (
      Object.keys(quoteState.thingsToQuote).length === 0 ||
      enteredName.length === 0 ||
      enteredEmail.length === 0
    ) {
      alert('missing information');
    } else {
      //date
      let date = new Date();
      let dateString = date.toISOString().slice(0, 10);
      let timeString = date.toLocaleTimeString();
      let formattedDate = `${dateString} ${timeString}`;

      //remove empty keys/values of thingsToQuote
      const filtered = Object.entries(quoteState.thingsToQuote).filter(
        ([key, value]) => {
          //return non-empty values for each key of thingsToQuote
          return filterObjectEmptyData(value).length > 0;
        }
      );

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

  // -----------------------------------------------------------------------------------

  // form
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { mb: 1, width: '100%' },
      }}
      noValidate
      autoComplete='off'
      onSubmit={onSubmitHandler}
    >
      {/* name field */}
      <FormControl fullWidth>
        <TextField
          id='outlined-basic'
          label='name'
          variant='outlined'
          inputRef={nameInputRef}
        />
      </FormControl>

      {/* email field */}
      <FormControl fullWidth>
        <TextField
          id='outlined-basic'
          label='email'
          variant='outlined'
          inputRef={emailInputRef}
        />
      </FormControl>

      {/*  ----------------------------------------------------------------------------------- */}
      {/* select component */}
      {selectState.menuItems.length > 0 && (
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
              onChange={handleSelectChange}
            >
              {selectState.menuItems.map(({ id, label }, index) => {
                return (
                  // price doesnt matter here... using id for unique checking...
                  <MenuItem key={'select_' + index} value={id} label={label}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
      {/*  ----------------------------------------------------------------------------------- */}
      {/* once selected...removed from select, move to quote */}
      {selectState.options.length > 0 && (
        <div>
          <h3>quote:</h3>
          {/* put form components here... */}
          {selectState.options.map((item, index) => {
            //dynamically lazy load the component

            //@path - relative to where its loading from, @component
            //withNamedExport() ensures the imported file has export default if it is a named export
            const DynamicComponent = lazy(() => {
              return import('../' + item.component).then((module) =>
                withNamedExport(item.component)(module)
              );
            });

            return (
              <div
                key={'option_' + item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  border: '1px solid',
                  marginBottom: '15px',
                  padding: '30px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    marginBottom: '30px',
                  }}
                >
                  <div>{item.label}</div>
                  <button
                    type='button'
                    onClick={() => removeFormComponent(item)}
                  >
                    remove
                  </button>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                  <DynamicComponent
                    id={item.id}
                    onChange={formComponentUpdateHandler}
                  />
                </Suspense>
              </div>
            );
          })}
        </div>
      )}

      <div className={classes.actions}>
        <button>submit</button>
      </div>
    </Box>
  );
};
