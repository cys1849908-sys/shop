import { useState } from "react";
import { FilterState, getInitialFilter, SortOption } from "../types/review";

export function useFilter() {
  const [tempValues, setTempValues] = useState<FilterState>(getInitialFilter);
  const [appliedValues, setAppliedValues] =
    useState<FilterState>(getInitialFilter);

  const handleChange = (
    key: "rating" | "size",
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

  // 정렬 — 즉시 적용 (모달 없이 바로 반영)
  const handleSortChange = (sortBy: SortOption): void => {
    setTempValues((prev) => ({ ...prev, sortBy }));
    setAppliedValues((prev) => ({ ...prev, sortBy }));
  };

  // 포토 온리 — 즉시 적용
  const handlePhotoOnly = (photoOnly: boolean): void => {
    setTempValues((prev) => ({ ...prev, photoOnly }));
    setAppliedValues((prev) => ({ ...prev, photoOnly }));
  };

  // 키워드 — 즉시 적용
  const handleKeyword = (keyword: string): void => {
    setTempValues((prev) => ({ ...prev, keyword }));
    setAppliedValues((prev) => ({ ...prev, keyword }));
  };

  const applyFilter = (): void => setAppliedValues(tempValues);

  const cancelFilter = (): void => setTempValues(appliedValues);

  const resetFilter = (key?: keyof FilterState): void => {
    if (key) {
      const resetValue = { [key]: getInitialFilter()[key] };
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
    handleSortChange,
    handlePhotoOnly,
    handleKeyword,
    applyFilter,
    resetFilter,
    cancelFilter,
  };
}
