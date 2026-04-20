import { useState } from "react";

export interface FilterState {
  rating: number[];
  height: string[];
  weight: string[];
  size: string[];
}

export const getInitialFilter = (): FilterState => ({
  rating: [],
  height: [],
  weight: [],
  size: [],
});

export function useFilter() {
  const [tempValues, setTempValues] = useState<FilterState>(getInitialFilter);
  const [appliedValues, setAppliedValues] =
    useState<FilterState>(getInitialFilter);

  const handleChange = (
    key: keyof FilterState,
    value: string | number,
  ): void => {
    setTempValues((prev) => {
      const current = prev[key] as (string | number)[];
      const exists = current.includes(value);

      return {
        ...prev,
        [key]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const applyFilter = (): void => {
    setAppliedValues(tempValues);
  };

  const cancelFilter = (): void => {
    setTempValues(appliedValues);
  };

  const resetFilter = (key?: keyof FilterState): void => {
    if (key) {
      const resetValue = { [key]: [] };
      setTempValues((prev) => ({ ...prev, ...resetValue }));
      setAppliedValues((prev) => ({ ...prev, ...resetValue }));
    } else {
      const initial = getInitialFilter();
      setTempValues(initial);
      setAppliedValues(initial);
    }
  };

  return {
    tempValues,
    appliedValues,
    handleChange,
    applyFilter,
    resetFilter,
    cancelFilter,
  };
}
