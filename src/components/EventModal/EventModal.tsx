import { useEffect, useRef, useState } from 'react';
import { FiCalendar, FiChevronDown, FiClock, FiEdit2, FiMapPin } from 'react-icons/fi';

import { searchEventsSafe } from '@/api/eventsApi';
import { useDebounce } from '@/hooks/useDebounce';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import type { EventColor, EventFormData, EventModalProps } from '@/types/calendar';
import { EVENT_COLORS_WITH_NAMES } from '@/types/calendar';
import { getInitialEventFormData } from '@/utils/eventUtils';

import styles from './EventModal.module.scss';

export const EventModal = ({
  isOpen,
  onClose,
  event,
  initialDate,
  onSubmit,
  onDelete,
}: EventModalProps) => {
  const defaultColor = EVENT_COLORS_WITH_NAMES[0].color as EventColor;

  const [formData, setFormData] = useState<EventFormData>(() =>
    getInitialEventFormData(event || null, initialDate || null, defaultColor)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ id: string; title: string }>>([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useOnClickOutside(searchRef, () => setIsSearchResultsVisible(false));
  useOnClickOutside(colorPickerRef, () => setIsColorPickerVisible(false));

  const prevIsOpen = useRef(isOpen);
  const prevEventId = useRef(event?.id);
  const prevInitialDate = useRef(initialDate?.toISOString());

  useEffect(() => {
    const isOpening = isOpen && !prevIsOpen.current;
    const eventChanged = event?.id !== prevEventId.current;
    const dateChanged = initialDate?.toISOString() !== prevInitialDate.current;

    if (isOpening || eventChanged || dateChanged) {
      setFormData(getInitialEventFormData(event || null, initialDate || null, defaultColor));
    }

    prevIsOpen.current = isOpen;
    prevEventId.current = event?.id;
    prevInitialDate.current = initialDate?.toISOString();
  }, [isOpen, event, initialDate, defaultColor]);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery.trim().length >= 2) {
        const result = await searchEventsSafe(debouncedSearchQuery);
        setSearchResults(result.data || []);
        setIsSearchResultsVisible(true);
      } else {
        setSearchResults([]);
        setIsSearchResultsVisible(false);
      }
    };
    performSearch();
  }, [debouncedSearchQuery]);

  if (!isOpen) return null;

  const handleUpdate = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleUpdate('title', e.target.value);
  };

  const handleSearchResultClick = (title: string) => {
    handleUpdate('title', title);
    setIsSearchResultsVisible(false);
  };

  const handleColorSelect = (color: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleUpdate('color', color);
    setIsColorPickerVisible(false);
  };

  const handleSave = () => {
    if (formData.title) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.searchContainer} ref={searchRef}>
            <input
              className={styles.titleInput}
              placeholder="Search Event..."
              value={formData.title}
              onChange={handleTitleChange}
              onFocus={() => searchResults.length > 0 && setIsSearchResultsVisible(true)}
            />
            {isSearchResultsVisible && searchResults.length > 0 && (
              <ul className={styles.dropdown}>
                {searchResults.map((res) => (
                  <li key={res.id} onClick={() => handleSearchResultClick(res.title)}>
                    {res.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={styles.colorSelector}
            ref={colorPickerRef}
            onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}
          >
            <div className={styles.colorCircle} style={{ backgroundColor: formData.color }} />
            <FiChevronDown />
            {isColorPickerVisible && (
              <div className={styles.colorBadge}>
                {EVENT_COLORS_WITH_NAMES.map((c) => (
                  <div
                    key={c.color}
                    className={styles.colorOption}
                    style={{ backgroundColor: c.color }}
                    onClick={(e) => handleColorSelect(c.color, e)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formList}>
          <div className={styles.row}>
            <FiMapPin className={styles.icon} />
            <input
              placeholder="Add Place"
              value={formData.location}
              onChange={(e) => handleUpdate('location', e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <FiCalendar className={styles.icon} />
            <input
              placeholder="Add Date"
              value={formData.date}
              onChange={(e) => handleUpdate('date', e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <FiClock className={styles.icon} />
            <div className={styles.timeInputs}>
              <input
                value={formData.startTime}
                onChange={(e) => handleUpdate('startTime', e.target.value)}
              />
              <span>-</span>
              <input
                value={formData.endTime}
                onChange={(e) => handleUpdate('endTime', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <FiEdit2 className={styles.icon} />
            <input
              placeholder="Add Notes"
              value={formData.description}
              onChange={(e) => handleUpdate('description', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.btn} disabled={!formData.title} onClick={handleSave}>
            Save
          </button>
          {event && (
            <button className={styles.btn} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
