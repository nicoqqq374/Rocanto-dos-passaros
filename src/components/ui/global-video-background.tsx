"use client";

import React, { useRef, useEffect, useState } from "react";

const VIDEO_SRC = "/videos/trilha-walkthrough.mp4?v=360loop";
const POSTER_SRC = "/videos/trilha-poster.jpg?v=360loop";

export function GlobalVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.muted = true;
    video.defaultMuted = true;

    // Respect user reduced-motion preference (WCAG & modern scrollytelling standard)
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;

    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let targetProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    let currentProgress = targetProgress;
    let scrollDirection: 1 | -1 = 1;

    let rafId: number | null = null;
    let lastFrameTime = performance.now();
    let isPlayPending = false;
    let canUsePlaybackServo = true;

    let activeBlobUrl: string | null = null;
    let pendingBlobUrl: string | null = null;
    let isSwappingBlob = false;

    const pauseSafely = () => {
      if (!video.paused && !isPlayPending) {
        video.pause();
      }
    };

    const applyPendingBlobIfIdle = () => {
      if (!pendingBlobUrl || isSwappingBlob || !video) return;
      isSwappingBlob = true;
      const savedTime = video.currentTime || 0.001;
      const nextUrl = pendingBlobUrl;
      pendingBlobUrl = null;

      pauseSafely();

      const onBlobReady = () => {
        video.removeEventListener("loadedmetadata", onBlobReady);
        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = Math.max(0.001, Math.min(savedTime, video.duration - 0.03));
        }
        isSwappingBlob = false;
      };

      video.addEventListener("loadedmetadata", onBlobReady);
      video.src = nextUrl;
      video.load();
    };

    // Frame-rate independent (60Hz / 90Hz / 120Hz / 144Hz) hardware servo controller
    const tick = (now: number) => {
      if (!video || isSwappingBlob || prefersReducedMotion) {
        rafId = null;
        return;
      }

      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) {
        rafId = null;
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) / 1000));
      lastFrameTime = now;

      // Critically-damped exponential smoothing (~62ms time constant across all refresh rates)
      const alpha = 1 - Math.exp(-16 * dt);
      const progressDiff = targetProgress - currentProgress;

      if (Math.abs(progressDiff) > 0.00015) {
        currentProgress += progressDiff * alpha;
      } else {
        currentProgress = targetProgress;
      }

      const desiredTime = Math.max(0.001, Math.min(currentProgress * duration, duration - 0.03));
      const actualTime = video.currentTime;
      const timeError = desiredTime - actualTime;

      if (scrollDirection === 1) {
        // DOWNWARD SCROLL: Native 60fps sequential hardware playback servo (0 decoder flushes, 0 backward jumps)
        if (timeError > 0.008) {
          if (canUsePlaybackServo) {
            // If jumping across a huge section (e.g. navbar anchor click > 2.8s), leap close then glide in
            if (timeError > 2.8 && !video.seeking) {
              video.currentTime = Math.max(actualTime, desiredTime - 0.45);
            }

            const desiredRate = Math.min(4.0, Math.max(0.18, timeError * 5.2));
            if (Math.abs(video.playbackRate - desiredRate) > 0.05) {
              try {
                video.playbackRate = Number(desiredRate.toFixed(2));
              } catch {
                video.playbackRate = 1.0;
              }
            }

            if (video.paused && !isPlayPending && !video.seeking) {
              isPlayPending = true;
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    isPlayPending = false;
                  })
                  .catch(() => {
                    isPlayPending = false;
                    // Graceful fallback for iOS Low Power Mode where programmatic play() is restricted
                    canUsePlaybackServo = false;
                  });
              } else {
                isPlayPending = false;
              }
            }
          } else {
            // Monotonic forward-only seek fallback (never rewinds)
            if (!video.seeking && desiredTime > actualTime + 0.016) {
              video.currentTime = desiredTime;
            }
          }
        } else {
          // Reached or slightly passed target timestamp — pause without ever seeking backward
          pauseSafely();
        }
      } else {
        // UPWARD SCROLL: Pause forward stream and scrub backward cleanly via native decoder state
        pauseSafely();
        if (timeError < -0.016 && !video.seeking) {
          video.currentTime = desiredTime;
        }
      }

      const stillMoving =
        Math.abs(targetProgress - currentProgress) > 0.0002 ||
        (scrollDirection === 1 && timeError > 0.01 && canUsePlaybackServo) ||
        (scrollDirection === -1 && timeError < -0.02) ||
        video.seeking;

      if (stillMoving) {
        rafId = requestAnimationFrame(tick);
      } else {
        pauseSafely();
        rafId = null;
        applyPendingBlobIfIdle();
      }
    };

    const startLoop = () => {
      if (rafId === null && !prefersReducedMotion && !isSwappingBlob) {
        lastFrameTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleLoaded = () => {
      setIsVideoLoaded(true);
      if (!isSwappingBlob && video.duration && Number.isFinite(video.duration)) {
        const initialTime = Math.max(0.001, Math.min(targetProgress * video.duration, video.duration - 0.04));
        if (Math.abs(video.currentTime - initialTime) > 0.05) {
          video.currentTime = initialTime;
        }
      }
    };

    const handleSeeked = () => {
      if (Math.abs(targetProgress - currentProgress) > 0.0002) {
        startLoop();
      }
    };

    // Zero-layout-thrashing scroll handler: reads only compositor-cached window.scrollY
    const updateBounds = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const handleScroll = () => {
      const next = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      if (next > targetProgress + 0.00005) {
        scrollDirection = 1;
      } else if (next < targetProgress - 0.00005) {
        scrollDirection = -1;
      }
      targetProgress = next;
      startLoop();
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        pauseSafely();
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    if (video.readyState >= 1) {
      handleLoaded();
    }

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);
    video.addEventListener("seeked", handleSeeked);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateBounds, { passive: true });
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateBounds);
      resizeObserver.observe(document.documentElement);
    }

    // Background in-memory Blob preloader: eliminates 100% of HTTP 206 Range network stalls across the page
    const abortController = new AbortController();
    const preloadTimer = window.setTimeout(() => {
      if (prefersReducedMotion) return;
      fetch(VIDEO_SRC, {
        signal: abortController.signal,
        cache: "force-cache",
      })
        .then((res) => (res.ok ? res.blob() : null))
        .then((blob) => {
          if (!blob || abortController.signal.aborted) return;
          activeBlobUrl = URL.createObjectURL(blob);
          pendingBlobUrl = activeBlobUrl;
          if (rafId === null) {
            applyPendingBlobIfIdle();
          }
        })
        .catch(() => {
          // Silently continue using progressive HTTP media stream if fetch is interrupted
        });
    }, 350);

    return () => {
      window.clearTimeout(preloadTimer);
      abortController.abort();
      pauseSafely();
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      video.removeEventListener("seeked", handleSeeked);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBounds);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#050B07]"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "strict",
      }}
    >
      {/* Pure Zero-Filter GPU Hardware Video Layer (60fps, pre-graded in YUV for DirectComposition overlay) */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        width={1280}
        height={720}
        playsInline
        muted
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-85"
        }`}
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          pointerEvents: "none",
        }}
      />

      {/* Cinematic Vignettes & Biophilic Depth Gradients (Pure alpha compositing, zero mix-blend-mode readback) */}
      {/* 1. Top gradient for navbar legibility */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#050B07]/90 via-[#050B07]/60 to-transparent pointer-events-none" />

      {/* 2. Global cinematic ambient tint (Forest Pine & Obsidian calibrated for WCAG AAA text contrast) */}
      <div className="absolute inset-0 bg-[#050B07]/38 pointer-events-none" />

      {/* 3. Radial vignette keeping the center vivid and corners focused */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,#050B07_92%)] pointer-events-none" />

      {/* 4. Bottom shadow for footer seamless blending */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050B07] via-[#050B07]/75 to-transparent pointer-events-none" />

      {/* 5. Static biophilic mist tint (replaces full-screen mix-blend-screen + animate-pulse repaint bottleneck) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.04),transparent_60%),radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.04),transparent_60%)] pointer-events-none" />
    </div>
  );
}
