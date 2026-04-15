export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

// 2. 버튼의 상태 정의
export type ButtonState =
  | "default"
  | "hover"
  | "active"
  | "loading"
  | "disabled";

// 3. 버튼 설정 타입
export interface ButtonConfig {
  variant: ButtonVariant;
  state: ButtonState;
  label: string;
  showIcon?: boolean; // 장바구니 아이콘 표시 여부 등
  fullWidth?: boolean; // 상세페이지 하단 구매 버튼처럼 꽉 차는지
}
