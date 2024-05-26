import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Switch } from '@mui/material';
import SurveyInformation from '../surveyInformation/SurveyInformation';
import QuestionTab from '../questionTab/QuestionTab';
import { useAppDispatch } from '@/store/hooks';
import { update_survey } from '@/slice/survey/survey_action';
import { get_question_of_survey } from '@/slice/question/question_action';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface InsideSurveyTabTabProps {
  survey: any;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function InsideSurveyTabTab({ survey }: InsideSurveyTabTabProps) {
  const [value, setValue] = React.useState(0);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  const handleStatusChange = (status: boolean) => {
    const updatedSurvey = { id: survey.id, is_published: status };
    dispatch(update_survey(updatedSurvey));
  };
  const moda=survey?.options?.modality
  const handleOnClickSave=()=>{
    try{
      get_question_of_survey(survey?.id);

    }
    catch(error){
      console.log(error)

    }
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
          {survey.name} - {moda}  ({survey?.abbreviation})
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Switch checked={survey.is_published} onChange={(event) => handleStatusChange(event.target.checked)} />
          <Typography>PUBLISH SURVEY</Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button variant='outlined'>Preview</Button>
            <Button variant='outlined' onClick={handleOnClickSave}>Save</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ border: '1px solid #e0e0e0' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs sx={{ border: '1px solid #e0e0e0', bgcolor: '#fafafa' }} value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Information' {...a11yProps(0)} />
            <Tab label='Questions' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <SurveyInformation survey={survey} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <QuestionTab survey={survey} />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
