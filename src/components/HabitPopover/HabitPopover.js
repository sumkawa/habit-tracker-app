'use client';
import React from 'react';
import { PlusIcon, ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import './styles.css';
import TimePicker from 'react-time-picker';
import * as Dialog from '@radix-ui/react-dialog';

const weekValues = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

function HabitPopover() {
  const [habitTitle, setHabitTitle] = React.useState('');
  const [behavior, setBehavior] = React.useState('');
  const [time, setTime] = React.useState('10:00');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [weekdays, setWeekdays] = React.useState(weekValues);
  const [isAM, setIsAm] = React.useState('AM');

  const weekdaysList = Object.keys(weekValues);

  const wrapperRef = React.useRef(null);

  const scrollNext = () => {
    if (wrapperRef.current) {
      const { scrollLeft, clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollLast = () => {
    if (wrapperRef.current) {
      const { scrollLeft, clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDialogOpen(false);
    console.log('submitted');
    console.log(weekdays);
    // would normally be an API post request
  };

  const handleWeekdayChange = (day) => {
    setWeekdays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  function convertTwentyFourToString(dateString) {
    let hour = Number(dateString.slice(0, 2));
    const minute = dateString.slice(3);

    if (hour >= 12) {
      hour = hour > 12 ? hour - 12 : hour;
    } else {
      hour = hour === 0 ? 12 : hour;
    }

    const stringTime = `${hour}:${minute}`;
    return stringTime;
  }

  function isAmOrPm(dateString) {
    const hour = Number(dateString.slice(0, 2));
    return hour >= 12 ? 'PM' : 'AM';
  }

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        scrollNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='popover-container'>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger>
          <PlusIcon width='25' height='25' className='icon-opener' />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='PopoverDialogOverlay'>
            <Dialog.Content className='PopoverDialogContent'>
              <Dialog.Title>
                <VisuallyHidden.Root>Make your habit</VisuallyHidden.Root>
              </Dialog.Title>
              <Dialog.Description>
                <VisuallyHidden.Root>
                  Make your habit here. Click save when done.
                </VisuallyHidden.Root>
              </Dialog.Description>
              <div className='wrapper' ref={wrapperRef}>
                <div className='box one'>
                  <h1 className='animate-character'>Make your habit</h1>
                  <h2 className='secondary-text'>
                    First, give it a catchy title:
                  </h2>
                  <div className='form__group field'>
                    <input
                      type='input'
                      className='form__field'
                      placeholder='Name'
                      name='name'
                      id='name'
                      spellCheck={false}
                      required
                      value={habitTitle}
                      onChange={(event) => {
                        setHabitTitle(event.target.value);
                      }}
                    />
                    <label htmlFor='name' className='form__label'>
                      Name
                    </label>
                  </div>
                  <div className='footer'>
                    :)
                    <button
                      className='button'
                      onClick={scrollNext}
                      disabled={habitTitle === ''}
                    >
                      <ArrowRightIcon className='icon' width='35' height='35' />
                    </button>
                  </div>
                </div>

                <div className='box two'>
                  <h1 className='animate-character-second'>
                    Now let's define the behavior.
                  </h1>
                  <h2 className='secondary-text'>
                    Remember to make your behavior attractive, frictionless, and
                    easy.
                  </h2>
                  <div className='input-paragraph'>
                    {behavior === '' ? (
                      <div>I will [behavior] at [time] in [location]</div>
                    ) : (
                      <div>
                        I will <span className='behavior-text'>{behavior}</span>{' '}
                        at [time] in [location]
                      </div>
                    )}
                  </div>
                  <h3>
                    <div className='form__group__paragraph field'>
                      <input
                        type='input'
                        className='form__field__paragraph'
                        placeholder='put my running shoes on'
                        name='behavior'
                        id='behavior'
                        spellCheck={false}
                        required
                        value={behavior}
                        onChange={(event) => {
                          setBehavior(event.target.value);
                        }}
                      />
                      <label htmlFor='name' className='form__label__paragraph'>
                        Behavior
                      </label>
                    </div>
                  </h3>

                  <div className='footer'>
                    <button className='button' onClick={scrollLast}>
                      <ArrowLeftIcon className='icon' width='35' height='35' />
                    </button>
                    <button
                      className='button'
                      onClick={scrollNext}
                      disabled={habitTitle === ''}
                    >
                      <ArrowRightIcon className='icon' width='35' height='35' />
                    </button>
                  </div>
                </div>

                <div className='box three'>
                  <h1 className='animate-character-second'>
                    Now let's set up your time.
                  </h1>
                  <h2 className='secondary-text'>
                    The more specific the time, the more routine the habit
                    becomes.
                  </h2>
                  <div className='input-paragraph'>
                    {time === '' ? (
                      <div>
                        I will <span className='behavior-text'>{behavior}</span>{' '}
                        at [time] in [location]
                      </div>
                    ) : (
                      <div>
                        I will <span className='behavior-text'>{behavior}</span>{' '}
                        at{' '}
                        <span className='time-text'>
                          {`${convertTwentyFourToString(
                            time,
                            setIsAm
                          )} ${isAmOrPm(time)}`}
                        </span>{' '}
                        in [location]
                      </div>
                    )}
                  </div>
                  <div className='weekday-input-container'>
                    <div className='weekDays-selector'>
                      {weekdaysList.map((day) => (
                        <React.Fragment key={day}>
                          <input
                            type='checkbox'
                            id={`weekday-${day}`}
                            className='weekday'
                            checked={weekdays[day]}
                            onChange={() => handleWeekdayChange(day)}
                          />
                          <label htmlFor={`weekday-${day}`}>
                            {day.charAt(0).toUpperCase()}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className='time-input-container'>
                    <TimePicker
                      onChange={setTime}
                      value={time}
                      disableClock={true}
                      clearIcon={null}
                    />
                  </div>
                  <div className='footer'>
                    <button className='button' onClick={scrollLast}>
                      <ArrowLeftIcon className='icon' width='35' height='35' />
                    </button>
                    <button
                      className='button'
                      onClick={scrollNext}
                      disabled={habitTitle === ''}
                    >
                      <ArrowRightIcon className='icon' width='35' height='35' />
                    </button>
                  </div>
                </div>

                <div className='box four'>
                  <h1 className='animate-character-second'>Location</h1>
                  <h2 className='secondary-text'>
                    Habits associated with specific locations are easily
                    remembered.
                  </h2>
                  <div className='input-paragraph'>
                    {location === '' ? (
                      <div>I will [behavior] at [time] in [location]</div>
                    ) : (
                      <div>
                        I will <span className='behavior-text'>{behavior}</span>{' '}
                        at <span className='time-text'>{time}</span> in{' '}
                        <span className='location-text'>{location}</span>
                      </div>
                    )}
                  </div>
                  <h3>
                    <div className='form__group__paragraph field'>
                      <input
                        type='input'
                        className='form__field__paragraph'
                        placeholder='the office'
                        name='location'
                        id='location'
                        spellCheck={false}
                        required
                        value={location}
                        onChange={(event) => {
                          setLocation(event.target.value);
                        }}
                      />
                      <label htmlFor='name' className='form__label__paragraph'>
                        Location
                      </label>
                    </div>
                  </h3>

                  <div className='footer'>
                    <button className='button' onClick={scrollLast}>
                      <ArrowLeftIcon className='icon' width='35' height='35' />
                    </button>
                    <button
                      className='button'
                      onClick={scrollNext}
                      disabled={habitTitle === ''}
                    >
                      <ArrowRightIcon className='icon' width='35' height='35' />
                    </button>
                  </div>
                </div>

                <div className='box five'>
                  <h1 className='animate-character-second'>{habitTitle}</h1>
                  <h2 className='secondary-text'>How's it look?</h2>
                  <div className='input-paragraph'>
                    <div>
                      I will <span className='behavior-text'>{behavior}</span>{' '}
                      at <span className='time-text'>{time}</span> in{' '}
                      <span className='location-text'>{location}</span>
                    </div>
                  </div>
                  <h3 className='submit-button-container'>
                    <form onSubmit={handleSubmit}>
                      <input
                        className='button-submission'
                        value='Looks Good!'
                        type='submit'
                      ></input>
                    </form>
                  </h3>

                  <div className='footer'>
                    <button className='button' onClick={scrollLast}>
                      <ArrowLeftIcon className='icon' width='35' height='35' />
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default HabitPopover;
