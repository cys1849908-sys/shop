import { useState } from "react";

export interface FilterState {
  rating: number[];
  height: { min: number; max: number } | null;
  weight: { min: number; max: number } | null;
  size: string[];
}

export const getInitialFilter = (): FilterState => ({
  rating: [],
  height: null,
  weight: null,
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
      const current = prev[key];

      if (Array.isArray(current)) {
        const exists = current.includes(value as never);
        return {
          ...prev,
          [key]: exists
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      }

      return prev;
    });
  };

  const applyFilter = (): void => {
    setAppliedValues(tempValues);
  };

  const resetFilter = (key: keyof FilterState): void => {
    setTempValues((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : null,
    }));
    setAppliedValues((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : null,
    }));
  };

  const cancelFilter = (): void => {
    setTempValues(appliedValues);
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
