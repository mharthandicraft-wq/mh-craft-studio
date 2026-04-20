import { useEffect, useMemo, useRef, useState } from "react";

interface Slide {
  src: string;
  alt: string;
}

interface LightboxLabels {
  close: string;
  next: string;
  previous: string;
  viewer: string;
  thumbnails: string;
}

interface PortfolioLightboxProps {
  slides: Slide[];
  labels: LightboxLabels;
}

const PortfolioLightbox = ({ slides, labels }: PortfolioLightboxProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartDistanceRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef(1);
  const lastTapAtRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; panX: number; panY: number } | null>(null);

  const totalSlides = slides.length;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;

  const clampZoom = (value: number) => {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
  };

  const clampPan = (nextPan: { x: number; y: number }, zoomLevel: number) => {
    const viewport = viewportRef.current;
    const image = imageRef.current;

    if (!viewport || !image || zoomLevel <= 1) {
      return { x: 0, y: 0 };
    }

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
    const baseImageWidth = image.offsetWidth;
    const baseImageHeight = image.offsetHeight;

    const scaledWidth = baseImageWidth * zoomLevel;
    const scaledHeight = baseImageHeight * zoomLevel;
    const maxPanX = Math.max(0, (scaledWidth - viewportWidth) / 2);
    const maxPanY = Math.max(0, (scaledHeight - viewportHeight) / 2);

    return {
      x: Math.min(maxPanX, Math.max(-maxPanX, nextPan.x)),
      y: Math.min(maxPanY, Math.max(-maxPanY, nextPan.y)),
    };
  };

  const resetZoomState = () => {
    setZoom(1);
    setIsPinching(false);
    setIsDragging(false);
    setPan({ x: 0, y: 0 });
    pointersRef.current.clear();
    pinchStartDistanceRef.current = null;
    pinchStartZoomRef.current = 1;
    dragPointerIdRef.current = null;
    dragStartRef.current = null;
  };

  const safeIndex = useMemo(() => {
    if (totalSlides === 0) {
      return 0;
    }

    return ((activeIndex % totalSlides) + totalSlides) % totalSlides;
  }, [activeIndex, totalSlides]);

  const openAt = (index: number) => {
    if (totalSlides === 0) {
      return;
    }

    resetZoomState();
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => {
    resetZoomState();
    setIsOpen(false);
  };

  const goNext = () => {
    resetZoomState();
    setActiveIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    resetZoomState();
    setActiveIndex((prev) => prev - 1);
  };

  const toggleZoom = () => {
    setZoom((prev) => (prev > 1 ? 1 : 2));
  };

  const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  };

  const handleWheelZoom: React.WheelEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    const delta = event.deltaY < 0 ? 0.2 : -0.2;
    setZoom((prev) => clampZoom(prev + delta));
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore capture errors in unsupported edge cases.
    }

    if (event.pointerType === "touch") {
      const now = Date.now();
      if (now - lastTapAtRef.current < 280) {
        toggleZoom();
        lastTapAtRef.current = 0;
      } else {
        lastTapAtRef.current = now;
      }
    }

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (zoom > 1 && pointersRef.current.size === 1) {
      dragPointerIdRef.current = event.pointerId;
      dragStartRef.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        panX: pan.x,
        panY: pan.y,
      };
      setIsDragging(true);
    }

    if (pointersRef.current.size === 2) {
      dragPointerIdRef.current = null;
      dragStartRef.current = null;
      setIsDragging(false);
      const [first, second] = Array.from(pointersRef.current.values());
      pinchStartDistanceRef.current = getDistance(first, second);
      pinchStartZoomRef.current = zoom;
      setIsPinching(true);
    }
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    if (!pointersRef.current.has(event.pointerId)) {
      return;
    }

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size >= 2 && pinchStartDistanceRef.current !== null) {
      const [first, second] = Array.from(pointersRef.current.values());
      const newDistance = getDistance(first, second);
      const nextZoom = pinchStartZoomRef.current * (newDistance / pinchStartDistanceRef.current);
      const clampedZoom = clampZoom(nextZoom);
      setZoom(clampedZoom);
      setPan((prev) => clampPan(prev, clampedZoom));
      return;
    }

    if (
      zoom > 1 &&
      dragPointerIdRef.current === event.pointerId &&
      dragStartRef.current
    ) {
      const deltaX = event.clientX - dragStartRef.current.pointerX;
      const deltaY = event.clientY - dragStartRef.current.pointerY;
      const nextPan = {
        x: dragStartRef.current.panX + deltaX,
        y: dragStartRef.current.panY + deltaY,
      };
      setPan(clampPan(nextPan, zoom));
    }
  };

  const handlePointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore release errors in unsupported edge cases.
    }

    pointersRef.current.delete(event.pointerId);

    if (dragPointerIdRef.current === event.pointerId) {
      dragPointerIdRef.current = null;
      dragStartRef.current = null;
      setIsDragging(false);
    }

    if (pointersRef.current.size < 2) {
      setIsPinching(false);
      pinchStartDistanceRef.current = null;
      pinchStartZoomRef.current = zoom;
    }
  };

  useEffect(() => {
    if (zoom <= 1) {
      setPan({ x: 0, y: 0 });
      setIsDragging(false);
      return;
    }

    setPan((prev) => clampPan(prev, zoom));
  }, [zoom]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (totalSlides === 0) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="group block w-full aspect-video overflow-hidden mb-12 shadow-2xl cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        onClick={() => openAt(0)}
        aria-label={labels.viewer}
      >
        <img
          src={slides[0].src}
          alt={slides[0].alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {slides.slice(1).map((slide, idx) => {
          const imageIndex = idx + 1;

          return (
            <button
              key={`${slide.src}-${imageIndex}`}
              type="button"
              onClick={() => openAt(imageIndex)}
              className="break-inside-avoid overflow-hidden rounded-sm group cursor-zoom-in w-full text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label={labels.viewer}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[120] bg-theme-media-overlay backdrop-blur-sm px-4 py-4 md:px-8 md:py-8"
          role="dialog"
          aria-modal="true"
          aria-label={labels.viewer}
        >
          <div className="relative mx-auto flex h-full max-w-7xl flex-col">
            <div className="absolute right-0 top-0 z-10">
              <button
                type="button"
                onClick={close}
                className="h-12 w-12 rounded-full border border-theme-strong bg-theme-surface text-theme transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label={labels.close}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <button
                type="button"
                onClick={goPrev}
                className="hidden md:flex h-14 w-14 items-center justify-center rounded-full border border-theme-strong bg-theme-surface text-theme transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label={labels.previous}
              >
                ←
              </button>

              <div className="mx-3 md:mx-8 flex w-full items-center justify-center">
                <div
                  ref={viewportRef}
                  className="flex w-full items-center justify-center overflow-hidden"
                  onWheel={handleWheelZoom}
                  onDoubleClick={toggleZoom}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  onPointerLeave={handlePointerEnd}
                  style={{ touchAction: "none" }}
                >
                  <img
                    ref={imageRef}
                    src={slides[safeIndex].src}
                    alt={slides[safeIndex].alt}
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className={`max-h-[72vh] w-auto max-w-full object-contain ${zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transformOrigin: "center center",
                      transition: isPinching || isDragging ? "none" : "transform 220ms ease-out",
                      userSelect: "none",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={goNext}
                className="hidden md:flex h-14 w-14 items-center justify-center rounded-full border border-theme-strong bg-theme-surface text-theme transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label={labels.next}
              >
                →
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 md:hidden">
              <button
                type="button"
                onClick={goPrev}
                className="h-12 flex-1 rounded border border-theme-strong bg-theme-surface px-3 text-theme transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label={labels.previous}
              >
                {labels.previous}
              </button>
              <button
                type="button"
                onClick={goNext}
                className="h-12 flex-1 rounded border border-theme-strong bg-theme-surface px-3 text-theme transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label={labels.next}
              >
                {labels.next}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center text-theme-media font-sans text-sm uppercase tracking-widest">
              {safeIndex + 1} / {totalSlides}
            </div>

            <div className="mt-4 overflow-x-auto pb-2" aria-label={labels.thumbnails}>
              <div className="flex min-w-max gap-3">
                {slides.map((slide, idx) => {
                  const isActive = idx === safeIndex;

                  return (
                    <button
                      key={`${slide.src}-${idx}`}
                      type="button"
                      onClick={() => {
                        resetZoomState();
                        setActiveIndex(idx);
                      }}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${isActive ? "border-brand-gold" : "border-theme-strong"}`}
                      aria-label={`${labels.viewer} ${idx + 1}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioLightbox;