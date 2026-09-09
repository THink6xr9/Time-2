'use client';

import React, { useEffect } from 'react';
import { saveLastVisitedTime } from '@/lib/storage';

interface SaveJourneyStateProps {
  time: number;
  formattedId: string;
  title: string;
}

export const SaveJourneyState: React.FC<SaveJourneyStateProps> = ({ time, formattedId, title }) => {
  useEffect(() => {
    saveLastVisitedTime(time, formattedId, title);
  }, [time, formattedId, title]);

  return null;
};
