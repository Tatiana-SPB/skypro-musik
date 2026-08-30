'use client';
import classNames from 'classnames';
import styles from '../Filter/filter.module.css';

type FilterItemProp = {
  activeFilter: null | string;
  changeActiveFilter: (n: string) => void;
  nameFilter: 'author' | 'year' | 'genre';
  list: string[];
  titleFilter: string;
  onSelect: (value: string) => void;
  selectedItems?: string[];
  selectedCount?: number;
};

export default function FilterItem({
  activeFilter,
  changeActiveFilter,
  nameFilter,
  list,
  titleFilter,
  onSelect,
  selectedItems = [],
  selectedCount = 0,
}: FilterItemProp) {
  const isOpen = activeFilter === nameFilter;

  return (
    <div className={styles.filterWrapper}>
      <div
        onClick={() => changeActiveFilter(nameFilter)}
        className={classNames(
          styles.filter__button,
          isOpen && styles.filter__buttonActive,
        )}
      >
        {titleFilter}
        {selectedCount > 0 && (
          <span className={styles.filter__badge}>{selectedCount}</span>
        )}
      </div>

      <div
        className={classNames(
          styles.filter__list,
          !isOpen && styles.filter__close,
        )}
      >
        <ul className={styles.filter__authorsList}>
          {list.map((item) => {
            const isSelected = selectedItems.includes(item);

            return (
              <li
                key={item}
                className={classNames(
                  styles.filter__itemList,
                  isSelected && styles.filter__itemSelected,
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                }}
                title={isSelected ? 'Выбрано' : undefined}
                style={{ cursor: 'pointer' }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
