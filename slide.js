function SlideItem({ frequencyAnswerOptions = [], questionId }, ref) {
  const { darkMode } = useSelector((state) => state.user);
  const {userSetting } = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const [dataAdded] = useState([
    { answerDesc: 'None', answerId: 0 },
    ...frequencyAnswerOptions.sort((prev, next) => prev?.precedence - next?.precedence),
  ]);
  const isSlideType = 
    frequencyAnswerOptions?.[0]?.answerTypeDesc === 'selectedradioshowtextbox';

  function valuetext(value) {
    setValue(value);
  }

  useImperativeHandle(ref, () => ({
    getValue: () => ({
      questionId: `${questionId}`,
      answerId: `${isSlideType ? dataAdded[value]?.answerId : value}`,
    }),
  }));

  const muiTheme = createTheme({
    overrides: {
      MuiRadio: {
        root: {
          color: '#391085'
        },
        colorSecondary: {
          '&$checked': {
            color: '#391085'
          },
        },
      },
      MuiSlider: {
        thumb: {
          color: '#391085',
          border: '1px solid white',
          height: 22,
          width: 22,
        },
        track: {
          color: '#391085',
          height: 14,
          borderRadius: 10,
        },
        rail: {
          color: '#535353',
          height: 14,
          borderRadius: 10,
        },
        mark: {
          marginTop: 6,
        },
      },
    },
  });

  return (
    <div className={classNames({ 'slider-container': true, 'dark-mode': darkMode })}>
      <div className="div-slider">
        {isSlideType && (
          <div className="div-slider-option-title">
            <div className="title-slider-text">{dataAdded[value]?.answerDesc ?? ''}</div>
          </div>
        )}
        <ThemeProvider theme={muiTheme}>
          {isSlideType ? (
            <Slider
              aria-label="Temperature"
              getAriaValueText={valuetext}
              defaultValue={0}
              step={1}
              marks
              min={0}
              max={4}
              size="medium"
            />
          ) : (
            <RadioGroup value={value} onChange={(_, v) => setValue(+v)}>
              {frequencyAnswerOptions.map((item) => (
                <FormControlLabel
                  value={item?.answerId}
                  control={<Radio />}
                  label={item?.answerDesc}
                />
              ))}
            </RadioGroup>
          )}
        </ThemeProvider>
      </div>
    </div>
  );
}

export default forwardRef(SlideItem);
