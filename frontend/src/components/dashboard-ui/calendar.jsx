import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  modifiers,
  modifiersStyles,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={classNames}
      selected={selected}
      onDayClick={onSelect}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      {...props}
    />
  );
}
