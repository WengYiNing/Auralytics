import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/TimeRangeSelector.css';

interface Props {
  currentRange: string;
  onRangeChange: (range: string) => void;
}

const TimeRangeSelector: React.FC<Props> = ({ currentRange, onRangeChange }) => {
  const { t } = useTranslation();

  return (
    <div className="time-range">
      <button
        onClick={() => onRangeChange('short_term')}
        className={currentRange === 'short_term' ? 'active' : 'inactive'}
      >
        {t('time_range.last_1_month')}
      </button>
      <button
        onClick={() => onRangeChange('medium_term')}
        className={currentRange === 'medium_term' ? 'active' : 'inactive'}
      >
        {t('time_range.last_6_months')}
      </button>
      <button
        onClick={() => onRangeChange('long_term')}
        className={currentRange === 'long_term' ? 'active' : 'inactive'}
      >
        {t('time_range.last_12_months')}
      </button>
    </div>
  );
};

export default TimeRangeSelector;
