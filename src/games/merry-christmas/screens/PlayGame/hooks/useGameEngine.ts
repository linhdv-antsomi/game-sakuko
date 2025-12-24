/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import {
  GAME_CONFIG,
  createItemTypesFromCollections,
  createScoreTemplate,
  BOX_CONFIG,
  getTotalScore,
} from "../constants";
import {
  getBoxWidth,
  getBoxHeight,
  clamp,
  randomBetween,
  buildWeightedTable,
  pickWeightedRandom,
} from "../utils";
import { FallingItem, GameStats, ItemType, Scores } from "../types";
import { CollectionItem } from "schemas";
import { useSoundEffect } from "hooks";

// Assets
import sparkleSound from "assets/sound-effects/sparkle.mp3";
import errorSound from "assets/sound-effects/error.mp3";
import burstLightImg from "assets/images/catch-rewards/burst-light.webp";

interface UseGameEngineOptions {
  collections?: CollectionItem[];
  startDelay?: number; // Delay in milliseconds before game starts
}

/**
 * Main game engine hook that handles all game logic
 */
export default function useGameEngine(
  gameRef: React.RefObject<HTMLDivElement>,
  boxRef: React.RefObject<HTMLDivElement>,
  options: UseGameEngineOptions = {}
): GameStats {
  const { collections = [], startDelay = 0 } = options;
  const sparkle = useSoundEffect(sparkleSound, { volume: 1 });
  const errorEffect = useSoundEffect(errorSound, { volume: 1 });

  // Memoize để tránh tạo mới mỗi lần render
  const itemTypes = useMemo(
    () => createItemTypesFromCollections(collections),
    [JSON.stringify(collections)]
  );

  const scoreTemplate = useMemo(
    () => createScoreTemplate(collections),
    [JSON.stringify(collections)]
  );

  // Weighted random table
  const weightedTable = useMemo(() => {
    if (!collections?.length) return null;

    return buildWeightedTable(collections);
  }, [JSON.stringify(collections)]);

  let durationSeconds: number = GAME_CONFIG.DURATION_SECONDS;
  const [scores, setScores] = useState<Scores>(() => ({ ...scoreTemplate }));
  const [fallingCount, setFallingCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(
    GAME_CONFIG.DURATION_SECONDS
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const restartRef = useRef<(() => void) | null>(null);
  const engineIdRef = useRef(0);
  // const totalScore = useMemo(() => {
  //   return getTotalScore(scores, collections);
  // }, [scores, JSON.stringify(collections)]);
  const [totalScore, setTotalScore] = useState<number>(0);

  // Sync scores when scoreTemplate changes
  useEffect(() => {
    setScores({ ...scoreTemplate });
  }, [scoreTemplate]);

  useEffect(() => {
    engineIdRef.current += 1;
    const myEngineId = engineIdRef.current;

    const gameEl = gameRef.current;
    const boxEl = boxRef.current;

    if (!gameEl || !boxEl) {
      return undefined;
    }

    // Removed sparkles - not used and causes performance issues
    let items: FallingItem[] = [];
    let animationId: number | null = null;
    let lastSpawn: number = 0;
    let spawnInterval: number = GAME_CONFIG.SPAWN_INTERVAL_START;
    let lastTimestamp: number = performance.now();
    let isRunning: boolean = false;
    let boxX: number = 0;
    let fallen: number = 0;
    let elapsedSeconds: number = 0;
    let speedMultiplier: number = 1;
    let lastSpeedIncreaseTime: number = 0;
    let lastReportedTime: number = durationSeconds;
    let startTime: number = performance.now();
    let isStunned = false;
    let stunEndTime = 0;
    const scoresRef: Scores = { ...scoreTemplate };

    /**
     * Check if box is stunned
     */
    const checkStun = (now: number) => {
      if (isStunned && now >= stunEndTime) {
        isStunned = false;
      }
    };

    /**
     * Get game area bounding rectangle
     */
    const getGameRect = (): DOMRect => gameEl.getBoundingClientRect();

    /**
     * Move box to specific client X position
     * Using transform instead of left for better performance
     */
    const moveBoxToClientX = (clientX: number): void => {
      const rect = getGameRect();
      const boxWidth = getBoxWidth(boxEl);
      // Calculate relative X position within game area
      let relativeX = clientX - rect.left;

      // Clamp to keep box fully within game area
      // Allow box to go all the way to edges (0 to rect.width - boxWidth)
      relativeX = clamp(relativeX - boxWidth / 2, 0, rect.width - boxWidth);

      boxX = relativeX;
      // Use transform instead of left for GPU acceleration
      boxEl.style.transform = `translate3d(${boxX}px, 0, 0)`;
    };

    /**
     * Update scores in React state
     */
    const updateScores = (): void => {
      setScores({ ...scoresRef });
    };

    /**
     * Spawn a new falling item
     * Spawn item from weighted table if available
     */
    const spawnItem = (): void => {
      if (itemTypes.length === 0) return;

      let type: ItemType;

      // Nếu có chọn collection → ưu tiên weighted trong toàn bộ list
      if (weightedTable) {
        const chosen = pickWeightedRandom(weightedTable); // CollectionItem
        const matched = itemTypes.find((t) => t.key === chosen.id);
        type = matched ?? itemTypes[0];
      } else {
        type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      }

      // if (selectedCollectionId) {
      //   const selectedItem = itemTypes.find(
      //     (item) => item.key === selectedCollectionId
      //   );
      //   // 40% chance for selected collection, 60% for random
      //   if (selectedItem && Math.random() < 0.4) {
      //     type = selectedItem;
      //   } else {
      //     type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      //   }
      // } else {
      //   // Random item from all collections
      //   type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      // }

      const size = randomBetween(type.sizeRange[0], type.sizeRange[1]);
      const speed = randomBetween(type.speedRange[0], type.speedRange[1]);
      const rect = getGameRect();

      // Random horizontal movement
      const horizontalSpeed = randomBetween(-30, 30); // Tốc độ ngang (âm = trái, dương = phải)
      const swingAmplitude = randomBetween(15, 40); // Biên độ dao động
      const swingFrequency = randomBetween(0.8, 2.0); // Tần số dao động
      const swingPhase = Math.random() * Math.PI * 2; // Pha ban đầu random

      const itemEl = document.createElement("div");
      itemEl.className = "falling-item";
      itemEl.style.setProperty("--size", `${size}px`);

      // Use image instead of emoji
      if (type.image) {
        const img = document.createElement("img");
        img.src = type.image;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        itemEl.appendChild(img);
      } else if (type.emoji) {
        itemEl.textContent = type.emoji;
      }

      const x = Math.random() * (rect.width - size);
      const y = -size;
      // Set initial position using transform
      itemEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      gameEl.appendChild(itemEl);

      items.push({
        el: itemEl,
        type,
        x,
        y,
        size,
        speed,
        horizontalSpeed,
        swingAmplitude,
        swingFrequency,
        swingPhase,
      });

      fallen += 1;
      setFallingCount(fallen);
    };

    /**
     * Collect an item (player caught it)
     */
    const collectItem = (item: FallingItem, index: number): void => {
      const christmasItem = item.type as ItemType;

      // Play sparkle sound
      if (
        christmasItem?.type === "minus-score" ||
        christmasItem?.type === "stun"
      ) {
        errorEffect.play();
      } else {
        sparkle.play();
      }

      if (isStunned && christmasItem.type !== "stun") {
        // vẫn remove item nhưng không score
        item.el.remove();
        items.splice(index, 1);
        return;
      }

      // Create +1 animation element
      const plusItem = document.createElement("div");
      plusItem.innerHTML = `
        <div class="burst-light"></div>
        <img src="${burstLightImg}" alt="burst light" class="burst-light-image" />
        <span class="burst-text">${
          christmasItem?.type === "plus-time"
            ? `+${christmasItem?.value}s`
            : christmasItem?.type === "plus-score"
            ? `+${christmasItem?.value}`
            : christmasItem?.type === "minus-score"
            ? `-${christmasItem?.value}`
            : christmasItem?.type === "stun"
            ? `Choáng`: ""
        }</span>
      `;
      plusItem.className = `plus-one-animation plus-score`;

      // plusItem.textContent = christmasItem?.type === "plus-time" ? `${christmasItem?.value}s` : `${christmasItem?.value}`;
      // plusItem.className = "collect-item";
      // Use transform for positioning
      plusItem.style.transform = `translate3d(${item.x + item.size / 2}px, ${
        item.y
      }px, 0)`;

      // Add CSS class if not already added
      if (!document.getElementById("plusItemStyles")) {
        const style = document.createElement("style");
        style.id = "plusItemStyles";

        style.textContent = `
          .plus-one-animation {
            position: absolute;
            pointer-events: none;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;

            animation: burstGlow 0.6s ease-out forwards;
          }

          .burst-text {
            position: relative;
            font-size: 18px;
            font-weight: 700;
            color: #ee0000;
            z-index: 2;
          }

          /* Ánh sáng tỏa */
          .burst-light-image {
            position: absolute;
            width: 80px;
            height: 80px;
            max-width: max-content;
            z-index: 1;  
          }

          .burst-light {
            position: absolute;
            width: 40px;
            height: 40px;
            z-index: 1;

            /* Dạng sáng tròn vàng */
            background:
              /* lớp sáng tròn mạnh */
              radial-gradient(circle at center,
                #FFFFAF,      /* trắng kem sáng */
                #FFF8A3,     /* vàng nhạt */
                #FDDD74,      /* vàng cam */
                #F6D380,    /* cam đậm */
              );


            border-radius: 50%;
            filter: blur(6px);
            opacity: 0.9;
          }

          /* Light animation */
          @keyframes burstGlow {
            0% {
              transform: translate3d(var(--x), var(--y), 0) translateY(10px) scale(0.6);
              opacity: 0.4;
            }
            60% {
              transform: translate3d(var(--x), var(--y), 0) translateY(0px) scale(1.3);
              opacity: 1;
            }
            100% {
              transform: translate3d(var(--x), var(--y), 0) translateY(-10px) scale(1);
              opacity: 1;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Set CSS variables for animation
      plusItem.style.setProperty("--x", `${item.x + item.size / 2}px`);
      plusItem.style.setProperty("--y", `${item.y}px`);

      gameEl.appendChild(plusItem);

      // Remove plusItem element after animation
      setTimeout(() => {
        plusItem.remove();
      }, 600);

      // Immediately remove item (no fade for better performance)
      item.el.remove();
      items.splice(index, 1);
      scoresRef[item.type.key] += 1;
      updateScores();

      // Update total score
      if (
        christmasItem.type === "plus-score" &&
        !isNaN(Number(christmasItem.value))
      ) {
        setTotalScore((prev) => prev + +christmasItem.value);
      } else if (
        christmasItem.type === "minus-score" &&
        !isNaN(Number(christmasItem.value))
      ) {
        setTotalScore((prev) => Math.max(0, prev - +christmasItem.value));
      } else if (
        christmasItem.type === "plus-time" &&
        !isNaN(Number(christmasItem.value))
      ) {
        durationSeconds += +christmasItem.value;
        // setTimeLeft((prev) => Math.max(0, prev + +christmasItem.value));
      } else if (
        christmasItem.type === "stun" &&
        !isNaN(Number(christmasItem.value))
      ) {
        isStunned = true;
        stunEndTime = performance.now() + Number(christmasItem.value) * 1000;
      }
    };
    /**
     * End the game
     */
    const endGame = (): void => {
      if (!isRunning) {
        return;
      }
      isRunning = false;
      setIsGameOver(true);
      setTimeLeft(0);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    /**
     * Main game loop tick function
     */
    const tick = (timestamp: number): void => {
      if (!isRunning || engineIdRef.current !== myEngineId) {
        return;
      }

      checkStun(timestamp);
      gameEl.classList.toggle("stunned", isStunned);
      boxEl.classList.toggle("stunned", isStunned);

      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      elapsedSeconds = (timestamp - startTime) / 1000;
      const remaining = Math.max(0, durationSeconds - elapsedSeconds);
      if (Math.abs(remaining - lastReportedTime) >= 0.05) {
        lastReportedTime = remaining;
        setTimeLeft(parseFloat(remaining.toFixed(1)));
      }

      if (remaining <= 0) {
        endGame();
        return;
      }

      const progress = clamp(elapsedSeconds / durationSeconds, 0, 1);
      const speedRamp = Math.pow(
        progress,
        GAME_CONFIG.SPEED_ACCELERATION_EXPONENT
      );
      // speedMultiplier = clamp(
      //   1 +
      //     speedRamp *
      //       GAME_CONFIG.BASE_SPEED_GROWTH *
      //       GAME_CONFIG.DURATION_SECONDS,
      //   1,
      //   GAME_CONFIG.SPEED_MULTIPLIER_MAX
      // );

      // const intervalRamp = Math.pow(
      //   progress,
      //   GAME_CONFIG.SPAWN_ACCELERATION_EXPONENT
      // );
      // spawnInterval = Math.max(
      //   GAME_CONFIG.SPAWN_INTERVAL_END,
      //   GAME_CONFIG.SPAWN_INTERVAL_START -
      //     intervalRamp *
      //       (GAME_CONFIG.SPAWN_INTERVAL_START - GAME_CONFIG.SPAWN_INTERVAL_END)
      // );

      spawnInterval = GAME_CONFIG.BASE_SPAWN_INTERVAL; // mỗi 0.8s rơi 1 item

      // 🚀 Tăng tốc mỗi 15 giây
      if (
        elapsedSeconds - lastSpeedIncreaseTime >=
        GAME_CONFIG.SPEED_INCREASE_INTERVAL
      ) {
        lastSpeedIncreaseTime = elapsedSeconds;
        speedMultiplier *= 1 + GAME_CONFIG.SPEED_INCREASE_PERCENT; // cộng 10%
      }

      if (timestamp - lastSpawn > spawnInterval) {
        spawnItem();
        lastSpawn = timestamp;
      }

      const rect = getGameRect();
      const boxY = rect.height - getBoxHeight(boxEl) - 24;
      const boxLeft = boxX;
      const boxRight = boxLeft + getBoxWidth(boxEl);
      const boxBottom = boxY + getBoxHeight(boxEl);

      for (let i = items.length - 1; i >= 0; i -= 1) {
        const item = items[i];
        const adjustedSpeed = item.speed * speedMultiplier;

        // Update vertical position
        item.y += (adjustedSpeed * delta) / 1000;

        // Update horizontal position (linear drift)
        item.x += (item.horizontalSpeed * delta) / 1000;

        // Add sinusoidal swing motion
        const swingOffset =
          Math.sin(elapsedSeconds * item.swingFrequency + item.swingPhase) *
          item.swingAmplitude;

        // Calculate final x position with swing
        const finalX = item.x + swingOffset;

        // Keep item within bounds (bounce off edges)
        if (finalX < 0) {
          item.x = -swingOffset;
          item.horizontalSpeed = Math.abs(item.horizontalSpeed);
        } else if (finalX + item.size > rect.width) {
          item.x = rect.width - item.size - swingOffset;
          item.horizontalSpeed = -Math.abs(item.horizontalSpeed);
        }

        // Apply position to element using transform for better performance
        item.el.style.transform = `translate3d(${item.x + swingOffset}px, ${
          item.y
        }px, 0)`;

        // Check collision with box
        const ALLOWANCE = 12;

        const itemBottom = item.y + item.size;
        const isInHorizontalRange =
          finalX + item.size >= boxLeft && finalX <= boxRight;

        // Chỉ cho collect nếu item đang ở QUY TRÌNH RƠI TỪ TRÊN
        const isComingFromTop = itemBottom <= boxY + ALLOWANCE;
        if (
          isComingFromTop && // ❗ ngăn collision ngang
          itemBottom >= boxY && // chạm miệng hộp
          itemBottom <= boxBottom && // nằm trong thân hộp
          isInHorizontalRange
        ) {
          collectItem(item, i);
          continue;
        }

        // Remove if out of bounds
        if (item.y > rect.height + item.size) {
          item.el.remove();
          items.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    /**
     * Reset game to initial state
     */
    const resetGame = (): void => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      items.forEach(({ el }) => el.remove());
      items = [];

      Object.keys(scoresRef).forEach((key) => {
        scoresRef[key as keyof Scores] = 0;
      });
      setScores({ ...scoresRef });

      fallen = 0;
      setFallingCount(0);
      elapsedSeconds = 0;
      speedMultiplier = 1;
      lastReportedTime = GAME_CONFIG.DURATION_SECONDS;
      startTime = performance.now();
      lastTimestamp = startTime;
      setTimeLeft(GAME_CONFIG.DURATION_SECONDS);
      setIsGameOver(false);

      spawnInterval = GAME_CONFIG.SPAWN_INTERVAL_START;
      lastSpawn = startTime - spawnInterval;

      isStunned = false;
      stunEndTime = 0;

      const rect = getGameRect();
      moveBoxToClientX(rect.left + rect.width / 2);

      // Delay game start if needed
      if (startDelay > 0) {
        setTimeout(() => {
          isRunning = true;
          startTime = performance.now();
          lastTimestamp = startTime;
          lastSpawn = startTime - spawnInterval;
          animationId = requestAnimationFrame(tick);
        }, startDelay);
      } else {
        isRunning = true;
        animationId = requestAnimationFrame(tick);
      }
    };

    restartRef.current = resetGame;

    /**
     * Handle pointer/touch movement
     */
    const handlePointer = (event: PointerEvent | TouchEvent): void => {
      if (!isRunning || isStunned) {
        return;
      }
      const touch = "touches" in event ? event.touches[0] : null;
      const clientX = touch ? touch.clientX : (event as PointerEvent).clientX;
      if (typeof clientX !== "number") {
        return;
      }
      moveBoxToClientX(clientX);
    };

    /**
     * Handle pointer down (capture pointer)
     */
    const handlePointerDown = (event: PointerEvent): void => {
      if (event.pointerId != null) {
        gameEl.setPointerCapture(event.pointerId);
      }
      handlePointer(event);
    };

    /**
     * Handle pointer up (release pointer)
     */
    const handlePointerUp = (event: PointerEvent): void => {
      if (event.pointerId != null) {
        gameEl.releasePointerCapture(event.pointerId);
      }
    };

    /**
     * Handle keyboard controls
     */
    const handleKeyboard = (event: KeyboardEvent): void => {
      if (!isRunning || isStunned) {
        return;
      }
      const step = 24;
      const rect = getGameRect();
      const center = rect.left + boxX + getBoxWidth(boxEl) / 2;
      if (event.key === "ArrowLeft" || event.key === "a") {
        moveBoxToClientX(center - step);
      } else if (event.key === "ArrowRight" || event.key === "d") {
        moveBoxToClientX(center + step);
      }
    };

    /**
     * Handle window resize
     */
    const handleResize = (): void => {
      const rect = getGameRect();
      moveBoxToClientX(rect.left + rect.width / 2);
    };

    // Removed initSparkles - not needed, causes performance issues
    resetGame();

    gameEl.addEventListener("pointermove", handlePointer as EventListener);
    gameEl.addEventListener("pointerdown", handlePointerDown as EventListener);
    gameEl.addEventListener("pointerup", handlePointerUp as EventListener);
    gameEl.addEventListener("touchmove", handlePointer as EventListener, {
      passive: true,
    });
    document.addEventListener("keydown", handleKeyboard);
    window.addEventListener("resize", handleResize);

    return () => {
      engineIdRef.current += 1;
      isRunning = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      items.forEach(({ el }) => el.remove());
      // Removed sparkles cleanup
      restartRef.current = null;

      gameEl.removeEventListener("pointermove", handlePointer as EventListener);
      gameEl.removeEventListener(
        "pointerdown",
        handlePointerDown as EventListener
      );
      gameEl.removeEventListener("pointerup", handlePointerUp as EventListener);
      gameEl.removeEventListener("touchmove", handlePointer as EventListener);
      document.removeEventListener("keydown", handleKeyboard);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRef, boxRef]);

  const restart = useCallback(() => {
    if (typeof restartRef.current === "function") {
      restartRef.current();
    }
  }, []);

  return { scores, totalScore, fallingCount, timeLeft, restart, isGameOver };
}
