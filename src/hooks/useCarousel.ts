"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  MouseEvent,
  RefObject,
} from "react";

export type UseCarouselOptions = {
  itemsPerView?: number;
  loop?: boolean;
};

export type UseCarouselReturn = {
  containerRef: RefObject<HTMLDivElement | null>;
  slideIndex: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  hasMoved: boolean;
  goTo: (index: number) => void;
  goPrev: () => void;
  goNext: () => void;
  forceGoTo: (indeX: number) => void;
  dragHandlers: {
    onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
};

export function useCarousel(
  itemCount: number,
  { itemsPerView = 1, loop = false }: UseCarouselOptions = {},
): UseCarouselReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef<number>(0);
  const dragInfo = useRef({ startX: 0, scrollLeft: 0 });
  const hasMoveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxIndex = loop ? itemCount - 1 : Math.max(0, itemCount - itemsPerView);

  const canGoPrev = loop ? true : slideIndex > 0;
  const canGoNext = loop ? true : slideIndex < maxIndex;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const firstItem = container.querySelector<HTMLElement>(
        "[data-carousel-item]",
      );
      itemWidthRef.current = firstItem
        ? firstItem.offsetWidth
        : container.offsetWidth / itemsPerView;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [itemsPerView]);

  const scrollToIndex = useCallback((index: number) => {
    containerRef.current?.scrollTo({
      left: index * itemWidthRef.current,
      behavior: "smooth",
    });
  }, []);

  const forceGoTo = useCallback(
    (index: number) => {
      const next = loop
        ? ((index % itemCount) + itemCount) % itemCount
        : Math.min(Math.max(index, 0), maxIndex);
      setSlideIndex(next);
      scrollToIndex(next);
    },

    [itemCount, loop, maxIndex, scrollToIndex],
  );

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      const next = loop
        ? ((index % itemCount) + itemCount) % itemCount
        : Math.min(Math.max(index, 0), maxIndex);
      setIsAnimating(true);
      setSlideIndex(next);
      scrollToIndex(next);
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    },
    [loop, itemCount, maxIndex, scrollToIndex, isAnimating],
  );

  const goPrev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);
  const goNext = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);

  const snapToNearest = useCallback(() => {
    const container = containerRef.current;
    if (!container || itemWidthRef.current === 0) return;
    const index = Math.min(
      Math.round(container.scrollLeft / itemWidthRef.current),
      maxIndex,
    );
    setSlideIndex(index);
    scrollToIndex(index);
  }, [maxIndex, scrollToIndex]);

  const endDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToNearest();
    if (hasMoveTimeout.current) clearTimeout(hasMoveTimeout.current);
    hasMoveTimeout.current = setTimeout(() => setHasMoved(false), 50);
  }, [isDragging, snapToNearest]);

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    dragInfo.current = {
      startX: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    };
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !isDragging || e.buttons !== 1) return;
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = x - dragInfo.current.startX;
      if (Math.abs(walk) > 3) {
        setHasMoved(true);
        containerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
      }
    },
    [isDragging],
  );

  return {
    containerRef,
    slideIndex,
    canGoPrev,
    canGoNext,
    hasMoved,
    goTo,
    goPrev,
    goNext,
    forceGoTo,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: endDrag,
      onMouseLeave: endDrag,
    },
  };
}
