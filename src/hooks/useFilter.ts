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

  const handleChange = (key: keyof FilterState, value: string | number) => {
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

  const applyFilter = () => {
    setAppliedValues(tempValues);
  };

  const resetFilter = (key: keyof FilterState) => {
    setTempValues((prev) => ({ ...prev, [key]: [] }));
    setAppliedValues((prev) => ({ ...prev, [key]: [] }));
  };
  const cancelFilter = () => {
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
