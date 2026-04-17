export const TOAST_MESSAGES = {
  ADD_TO_CART_SUCCESS: "해당 상품이 장바구니에 담겼습니다",
  REMOVE_FROM_CART_SUCCESS: "장바구니에서 제거되었습니다",
  WISHLIST_ADD_SUCCESS: "위시리스트에 추가되었습니다",
  WISHLIST_REMOVE_SUCCESS: "위시리스트에서 제거되었습니다",
  WISHLIST_CLEAR_SUCCESS: "위시리스트가 비워졌습니다",
} as const;

export const ERROR_MESSAGES = {
  LOGIN_REQUIRED: "로그인이 필요합니다",
  ADD_TO_CART_FAILED: "장바구니 추가 실패",
  REMOVE_FROM_CART_FAILED: "삭제 실패",
  UPDATE_CART_FAILED: "업데이트 실패",
  WISHLIST_TOGGLE_FAILED: "찜하기 실패",
  WISHLIST_CLEAR_FAILED: "전체 삭제 실패",
} as const;
