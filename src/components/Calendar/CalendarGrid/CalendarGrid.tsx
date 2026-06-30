import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiClock } from 'react-icons/fi';

import type { CalendarEvent, CalendarGridProps } from '@/types/calendar';
import { getHoursArray, getWeekDays, isTodayInDays } from '@/utils/dateUtils';
import {
  calculateEventHeight,
  calculateNowIndicatorTop,
  formatDateForForm,
  groupEventsByDateHour,
  parseCellId,
} from '@/utils/eventUtils';

import { TimeColumn } from '../TimeColumn/TimeColumn';
import styles from './CalendarGrid.module.scss';

interface ExtendedCalendarGridProps extends CalendarGridProps {
  events: CalendarEvent[];
  onCellClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDrop?: (eventId: string, newDate: string, newTime: string) => void;
}

const GRID_STEP = 61;
const REFRESH_INTERVAL = 60000;

const DraggableEvent = ({
  event,
  onEventClick,
}: {
  event: CalendarEvent;
  onEventClick: (e: CalendarEvent) => void;
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: event.id });

  const height = calculateEventHeight(event.startTime, event.endTime, GRID_STEP);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles.eventItem}
      style={{
        borderColor: event.color,
        height: `${height}px`,
        opacity: isDragging ? 0.3 : 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onEventClick(event);
      }}
    >
      <div className={styles.eventTitle}>{event.title}</div>
    </div>
  );
};

const CellDropZone = ({ id }: { id: string }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} className={styles.dropZone} />;
};

export const CalendarGrid = ({
  viewMode,
  currentDate,
  events,
  onCellClick,
  onEventClick,
  onEventDrop,
}: ExtendedCalendarGridProps) => {
  const hours = getHoursArray();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);

  const days = viewMode === 'day' ? [currentDate] : getWeekDays(currentDate);
  const eventsMap = groupEventsByDateHour(events);
  const shouldShowIndicator = isTodayInDays(days, now);
  const nowIndicatorTop = calculateNowIndicatorTop(now, GRID_STEP);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveEvent(null);
    if (!over || !onEventDrop) return;

    const { date, hour } = parseCellId(over.id as string);
    onEventDrop(active.id as string, date, hour);
  };

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridHeaderRow}>
        <div className={styles.headerCorner}>
          <FiClock size={16} />
        </div>
        <div className={styles.headerDaysContainer}>
          {days.map((day) => (
            <div key={day.toISOString()} className={styles.headerDayWrapper}>
              <div className={styles.columnHeader}>
                <span className={styles.weekdayLabel}>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={styles.dayLabel}>{day.getDate()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.gridScrollContainer}>
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) =>
            setActiveEvent(events.find((e) => e.id === active.id) || null)
          }
          onDragEnd={handleDragEnd}
        >
          <div className={styles.gridBody}>
            <TimeColumn />
            <div className={styles.gridContainer}>
              {shouldShowIndicator && (
                <div className={styles.nowIndicator} style={{ top: `${nowIndicatorTop}px` }} />
              )}

              {days.map((day) => (
                <div key={day.toISOString()} className={styles.column}>
                  {hours.map((h) => {
                    const dateKey = formatDateForForm(day);
                    const cellId = `cell-${dateKey}-${h}`;
                    return (
                      <div
                        key={cellId}
                        className={styles.cell}
                        onClick={() => {
                          const d = new Date(day);
                          d.setHours(h, 0, 0, 0);
                          onCellClick(d);
                        }}
                      >
                        <CellDropZone id={cellId} />
                        {eventsMap[`${dateKey}-${h}`]?.map((e: CalendarEvent) => (
                          <DraggableEvent key={e.id} event={e} onEventClick={onEventClick} />
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeEvent && (
                <div className={styles.dragOverlay} style={{ borderColor: activeEvent.color }}>
                  {activeEvent.title}
                </div>
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
};
