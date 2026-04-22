/**
 * 조건부 클래스명을 합쳐주는 유틸리티 (Tailwind 스타일링용)
 * @example cls("flex", isHidden && "hidden", "p-4") => "flex p-4"
 */
export function cls(...classnames: (string | boolean | undefined)[]) {
  return classnames.filter(Boolean).join(" ");
}

/**
 * 장바구니나 리스트에서 상품을 식별하기 위한 고유 키 생성
 * @param productId - 상품 ID
 * @param size - 선택한 사이즈
 */
export const createUniqueKey = (productId: string, size: string) =>
  `${productId}-${size}`;

/**
 * 사용자 이름 마스킹 처리 (첫 글자 제외 별표 처리)
 * @example maskUserName("김철수") => "김****"
 */
export const maskUserName = (name: string): string => {
  return name.slice(0, 1) + "****";
};

/**
 * 금액 포맷팅 (세 자리마다 콤마 추가 및 통화 단위 결합)
 * @param unitPrice - 포맷팅할 금액
 * @param currency - 통화 단위 (기본값: "원")
 * @example formatCurrency(39000) => "39,000원"
 */
export const formatCurrency = (unitPrice: number, currency = "원"): string => {
  return `${unitPrice.toLocaleString()}${currency}`;
};

/**
 * 할인율을 적용한 실제 판매가 계산
 * @param unitPrice - 원가
 * @param discountRate - 할인율 (1~100 사이의 숫자)
 * @returns 할인된 최종 금액 (소수점 반올림 처리)
 */
export const calculateDisplayPrice = (
  unitPrice: number,
  discountRate?: number,
) => {
  if (!discountRate || discountRate <= 0) return unitPrice;
  return Math.round(unitPrice * (1 - discountRate / 100));
};

/**
 * 현재 날짜를 기준으로 특정 개월 전의 날짜를 YYYY-MM-DD 형식으로 반환
 * @param monthsAgo - 계산할 개월 수 (기본값: 0)
 * @example getFormattedDate(3) // 3개월 전 날짜 반환
 */
export const getFormattedDate = (monthsAgo: number = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
