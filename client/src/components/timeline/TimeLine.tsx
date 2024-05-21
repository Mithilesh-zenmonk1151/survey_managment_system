import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function OppositeContentTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" sx={{
            fontWeight:"500",
            fontSize:"18px",
        }}>
          First published
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{
            bgcolor:"#4d9f49"
          }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>15/05/2024</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          15/05/2024
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{
            bgcolor:"#4471f4"
          }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{
            fontWeight:"500",
            fontSize:"18px",
        }}>Modified</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" sx={{
            fontWeight:"500",
            fontSize:"18px",
        }}>
          Publication status changed
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{
            bgcolor:"#f3901d"
            
          }}/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>15/05/2024</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
