// src/types/mileage.ts
export type MileageType = "earn" | "use";

export interface MileageItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: MileageType;
}
