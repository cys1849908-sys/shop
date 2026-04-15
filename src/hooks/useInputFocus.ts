// // src/hooks/useInputFocus.ts
// import { useRef, useState } from "react";

// export function useInputFocus() {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const focusInput = () => {
//     inputRef.current?.focus();
//     setIsFocused(true);
//   };

//   const getValue = () => {
//     return inputRef.current?.value;
//   };

//   const clearInput = () => {
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   };

//   return {
//     inputRef,
//     focusInput,
//     getValue,
//     clearInput,
//     isFocused,
//     setIsFocused,
//   };
// }
