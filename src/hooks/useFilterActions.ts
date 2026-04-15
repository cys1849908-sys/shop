import { useState } from "react";

export interface FilterState {
  rating: number[];
  height: string[];
  weight: string[];
  size: string[];
}

const initialFilter: FilterState = {
  rating: [],
  height: [],
  weight: [],
  size: [],
};

export function useFilterActions() {
  const [tempValues, setTempValues] = useState<FilterState>(initialFilter); // 임시
  const [appliedValues, setAppliedValues] = // 저장된것
    useState<FilterState>(initialFilter);

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
    // 초기화
    setTempValues((prev) => ({ ...prev, [key]: [] }));
    setAppliedValues((prev) => ({ ...prev, [key]: [] }));
  };
  const cancelFilter = () => {
    // 취소
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
