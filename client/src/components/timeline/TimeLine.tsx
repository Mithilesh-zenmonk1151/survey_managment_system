import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useAppDispatch } from '@/store/hooks';

interface SurveyInfoProps {
  survey: any;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function OppositeContentTimeline({ survey }: SurveyInfoProps) {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" sx={{ fontWeight: "500", fontSize: "18px" }}>
          First published
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: "#4d9f49" }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {survey?.published_at ? formatDate(survey.published_at) : "Not yet published"}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {survey?.createdAt && formatDate(survey?.createdAt)}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: "#4471f4" }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ fontWeight: "500", fontSize: "18px" }}>Modified</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" sx={{ fontWeight: "500", fontSize: "18px" }}>
          Publication status changed
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: "#f3901d" }} />
        </TimelineSeparator>
        <TimelineContent>
          {survey?.publication_status_changed_at ? formatDate(survey.publication_status_changed_at) : "Not yet changed"}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
