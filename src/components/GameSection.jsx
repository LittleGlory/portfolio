import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, ArrowRight } from 'lucide-react';

const GameSection = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('start'); // start, playing, won, lost
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [tempName, setTempName] = useState('');
    const [highScore, setHighScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lostMessage, setLostMessage] = useState('');

    const LOST_MESSAGES = [
        "Don't let negativity win, {name}.",
        "Fall seven times, stand up eight, {name}!",
        "Your sparkle is still there, {name}. Try again!",
        "Rest if you must, but don't quit, {name}.",
        "Chaos is just a stepping stone, {name}.",
        "Breathe. Realign. Conquer, {name}.",
        "You are stronger than this challenge, {name}.",
        "Every setback is a setup for a comeback, {name}."
    ];

    // Load High Score
    useEffect(() => {
        const stored = localStorage.getItem('gloryHighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    // Save High Score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('gloryHighScore', score);
        }
    }, [score, highScore]);

    // GLORY Grid (1 = Wall, 0 = Path)
    // Added padding rows (Top/Bottom) AND Columns (Left/Right) for full arena movement
    const MAZE_GRID = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Top Padding
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Top Padding
        [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Bottom Padding
    ];

    const GRID_COLS = MAZE_GRID[0].length;
    const GRID_ROWS = MAZE_GRID.length;

    // We use a ref to track keys so the game loop always has fresh data 
    // without needing to be a dependency of useEffect (which causes re-inits)
    const keys = useRef({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });

    // D-Pad Helpers
    const handleDPad = (direction, isPressed) => {
        // Clear all opposities if pressed? No, standard logic handles conflicting keys.
        // We just toggle the specific key ref.
        keys.current[direction] = isPressed;
    };

    useEffect(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Assets
        const playerImage = new Image();
        playerImage.src = '/avatar.png';

        // START POSITION: Gap between L and O. Col 10 (9 + 1 padding). Row 4.
        let player = {
            col: 10,
            row: 4,
            dir: { x: 0, y: 0 },
            progress: 0,
            moving: false
        };

        // Custom Icons & Colors
        const COLLECTIBLES = [
            { icon: '★', color: '#FBBF24' }, // Yellowish Golden
            { icon: '♥', color: '#E879F9' }, // Pinkish Lavender
            { icon: '☘', color: '#34D399' }, // Green Clover
            { icon: '✿', color: '#F472B6' }  // Flower (Pink fallback)
        ];
        let dots = [];

        // Flood Fill Logic (Spawn logic)
        const getReachableTiles = (startCol, startRow) => {
            const visited = new Set();
            const reachable = [];
            const queue = [[startCol, startRow]];
            const key = (c, r) => `${c},${r}`;
            visited.add(key(startCol, startRow));

            while (queue.length > 0) {
                const [c, r] = queue.shift();
                reachable.push({ c, r });

                const moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
                for (let [dx, dy] of moves) {
                    const nc = c + dx;
                    const nr = r + dy;
                    const k = key(nc, nr);

                    // STRICT BOUNDS: 0 to GRID_LIMITS
                    if (nc >= 0 && nc < GRID_COLS && nr >= 0 && nr < GRID_ROWS && !visited.has(k)) {
                        if (MAZE_GRID[nr][nc] === 0) { // Only path (0), walls are 1
                            visited.add(k);
                            queue.push([nc, nr]);
                        }
                    }
                }
            }
            return reachable;
        };

        const reachableTiles = getReachableTiles(player.col, player.row);

        // Populate Dots
        reachableTiles.forEach(tile => {
            if (Math.abs(tile.c - player.col) < 2 && Math.abs(tile.r - player.row) < 2) return;
            if (Math.random() > 0.8) {
                const type = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
                dots.push({
                    col: tile.c,
                    row: tile.r,
                    icon: type.icon,
                    color: type.color,
                    active: true
                });
            }
        });

        // Enemies - Offset all cols by +1 due to left padding
        let enemies = [
            { col: 2, row: 1, label: 'Fear', icon: '😨', dir: { x: 1, y: 0 }, progress: 0 }, // Top Left
            { col: 23, row: 6, label: 'Anger', icon: '😡', dir: { x: -1, y: 0 }, progress: 0 }, // Bottom Right
            { col: 15, row: 1, label: 'Chaos', icon: '🌀', dir: { x: 0, y: 1 }, progress: 0 },
            { col: 5, row: 6, label: 'Doubt', icon: '😟', dir: { x: 1, y: 0 }, progress: 0 },
            { col: 20, row: 1, label: 'Stress', icon: '😫', dir: { x: -1, y: 0 }, progress: 0 },
            // Extra Levels
            ...Array(level - 1).fill(0).map((_, i) => ({
                col: i % 2 === 0 ? 2 : 23,
                row: 4,
                label: 'X',
                icon: '😈',
                dir: { x: i % 2 === 0 ? 1 : -1, y: 0 },
                progress: 0
            }))
        ];

        const resizeCanvas = () => {
            if (canvas && canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const handleKeyDown = (e) => {
            if (keys.current.hasOwnProperty(e.key)) {
                e.preventDefault();
                keys.current[e.key] = true;
            }
        };
        const handleKeyUp = (e) => {
            if (keys.current.hasOwnProperty(e.key)) keys.current[e.key] = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // --- MOBILE TOUCH CONTROLS (SWIPE - Secondary) ---
        // Ref for Next Move (Persistent until processed)
        const nextMove = { current: null };
        const touchStart = { x: 0, y: 0 };

        const handleTouchStart = (e) => {
            touchStart.x = e.touches[0].clientX;
            touchStart.y = e.touches[0].clientY;
        };
        const handleTouchMove = (e) => {
            if (gameState === 'playing') e.preventDefault(); // Prevent scrolling

            // EXPERIMENTAL: Immediate Swipe Detection
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            const dx = x - touchStart.x;
            const dy = y - touchStart.y;

            if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    nextMove.current = dx > 0 ? 'ArrowRight' : 'ArrowLeft';
                } else {
                    nextMove.current = dy > 0 ? 'ArrowDown' : 'ArrowUp';
                }
                // Reset touch start to allow continuous direction changes? No, better to lift finger.
            }
        };
        /* const handleTouchEnd = (e) => {
            // Logic moved to TouchMove for faster response, 
            // but D-Pad is primary now.
        }; */

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        // window.addEventListener('touchend', handleTouchEnd);

        const update = () => {
            const isWall = (c, r) => {
                if (c >= 0 && c < GRID_COLS && r >= 0 && r < GRID_ROWS) return MAZE_GRID[r][c] === 1;
                return true; // Treat OOB as Wall
            };

            const MOVEMENT_SPEED = 0.15 * (1 + (level - 1) * 0.1);

            // Apply Swipe Input (Last wins)
            if (nextMove.current) {
                keys.current.ArrowUp = false; keys.current.ArrowDown = false; keys.current.ArrowLeft = false; keys.current.ArrowRight = false;
                keys.current[nextMove.current] = true;
                nextMove.current = null; // Consume the move immediately
            }

            // Player Logic
            if (!player.moving) {
                let dx = 0, dy = 0;
                if (keys.current.ArrowUp) dy = -1;
                else if (keys.current.ArrowDown) dy = 1;
                else if (keys.current.ArrowLeft) dx = -1;
                else if (keys.current.ArrowRight) dx = 1;

                if (dx !== 0 || dy !== 0) {
                    const nextC = player.col + dx;
                    const nextR = player.row + dy;

                    // STRICT BOUNDS CHECK (Everything must be >= 0)
                    if (!isWall(nextC, nextR)) {
                        player.moving = true;
                        player.dir = { x: dx, y: dy };
                        player.progress = 0;
                    }
                }
            } else {
                player.progress += MOVEMENT_SPEED;
                if (player.progress >= 1) {
                    player.col += player.dir.x;
                    player.row += player.dir.y;
                    player.progress = 0;
                    player.moving = false;
                }
            }

            // Enemy Logic
            enemies.forEach(enemy => {
                enemy.progress += MOVEMENT_SPEED * 0.6;
                if (enemy.progress >= 1) {
                    enemy.col += enemy.dir.x;
                    enemy.row += enemy.dir.y;
                    enemy.progress = 0;

                    const possibleDirs = [];
                    [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dx, dy]) => {
                        if (dx === -enemy.dir.x && dy === -enemy.dir.y) return;
                        const nc = enemy.col + dx;
                        const nr = enemy.row + dy;
                        if (!isWall(nc, nr)) possibleDirs.push({ x: dx, y: dy });
                    });

                    if (possibleDirs.length === 0) {
                        const nc = enemy.col - enemy.dir.x;
                        const nr = enemy.row - enemy.dir.y;
                        if (!isWall(nc, nr)) possibleDirs.push({ x: -enemy.dir.x, y: -enemy.dir.y });
                    }

                    if (possibleDirs.length > 0) {
                        const nextC = enemy.col + enemy.dir.x;
                        const nextR = enemy.row + enemy.dir.y;
                        const aboutToHitWall = isWall(nextC, nextR);
                        if (aboutToHitWall || Math.random() > 0.7) {
                            enemy.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
                        }
                    }
                }
            });

            // Collisions (Hitbox 0.8)
            const pX = player.col + player.dir.x * player.progress;
            const pY = player.row + player.dir.y * player.progress;

            dots.forEach(dot => {
                if (!dot.active) return;
                const dist = Math.hypot(pX - dot.col, pY - dot.row);
                if (dist < 0.5) {
                    dot.active = false;
                    setScore(s => s + 10);
                }
            });
            if (dots.length > 0 && dots.every(d => !d.active)) setGameState('won');

            enemies.forEach(enemy => {
                const eX = enemy.col + enemy.dir.x * enemy.progress;
                const eY = enemy.row + enemy.dir.y * enemy.progress;
                const dist = Math.hypot(pX - eX, pY - eY);
                if (dist < 0.8) {
                    const msg = LOST_MESSAGES[Math.floor(Math.random() * LOST_MESSAGES.length)];
                    setLostMessage(msg.replace('{name}', playerName));
                    setGameState('lost');
                }
            });
        };

        const draw = () => {
            if (!canvasRef.current) return;
            const w = canvas.width;
            const h = canvas.height;

            // CAMERA / TILE LOGIC
            // Fix Tile Size to be readable on mobile (>24px) but scale up on desktop
            let ts = Math.max(26, Math.min(w / 16, h / 10)); // Min 26px tile size

            const mapW = GRID_COLS * ts;
            const mapH = GRID_ROWS * ts;

            // Camera Logic: Center Player
            // Actual Player Screen Position
            const pAbsX = (player.col + player.dir.x * player.progress) * ts + ts / 2;
            const pAbsY = (player.row + player.dir.y * player.progress) * ts + ts / 2;

            // Camera Offset (Desired Center - Actual Player)
            let camX = w / 2 - pAbsX;
            let camY = h / 2 - pAbsY;

            // Clamp Camera (Don't scroll past edges if map fits, otherwise clamp to see all)
            // If Map < Canvas, Center coordinates.
            if (mapW < w) camX = (w - mapW) / 2;
            else {
                // Bounds: Min = w - mapW (Right edge aligned), Max = 0 (Left edge aligned)
                camX = Math.min(0, Math.max(w - mapW, camX));
            }

            if (mapH < h) camY = (h - mapH) / 2;
            else {
                camY = Math.min(0, Math.max(h - mapH, camY));
            }


            ctx.fillStyle = '#FFF5F7';
            ctx.fillRect(0, 0, w, h);

            // Apply Camera Transform
            ctx.save();
            ctx.translate(camX, camY);

            // Walls
            MAZE_GRID.forEach((row, r) => {
                row.forEach((cell, c) => {
                    if (cell === 1) {
                        const x = c * ts;
                        const y = r * ts;
                        ctx.fillStyle = '#FBCFE8';
                        ctx.shadowColor = 'rgba(236, 72, 153, 0.2)';
                        ctx.shadowBlur = 4;
                        ctx.beginPath();
                        ctx.roundRect(x, y, ts, ts, 4);
                        ctx.fill();
                        ctx.shadowBlur = 0;
                        ctx.strokeStyle = '#F472B6';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            // Dots
            ctx.font = `${ts * 0.8}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            dots.forEach(dot => {
                if (dot.active) {
                    ctx.fillStyle = dot.color;
                    const x = dot.col * ts + ts / 2;
                    const y = dot.row * ts + ts / 2;
                    ctx.fillText(dot.icon, x, y);
                }
            });

            // Player
            // We use previously calculated Absolute positions, but we are inside translated context
            // So we need just position relative to map origin.
            const px = (player.col + player.dir.x * player.progress) * ts + ts / 2;
            const py = (player.row + player.dir.y * player.progress) * ts + ts / 2;
            const pSize = ts * 1.3;

            if (playerImage.complete && playerImage.naturalWidth !== 0) {
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 10;
                ctx.drawImage(playerImage, px - pSize / 2, py - pSize / 2, pSize, pSize);
                ctx.restore();
            } else {
                ctx.font = `${ts * 1.5}px Arial`;
                ctx.fillText('👧', px, py);
            }

            // Enemies
            ctx.font = `${ts * 1.0}px Arial`;
            enemies.forEach(enemy => {
                const ex = (enemy.col + enemy.dir.x * enemy.progress) * ts + ts / 2;
                const ey = (enemy.row + enemy.dir.y * enemy.progress) * ts + ts / 2;
                ctx.shadowColor = 'rgba(0,0,0,0.1)';
                ctx.shadowBlur = 5;
                ctx.fillText(enemy.icon, ex, ey);
                ctx.shadowBlur = 0;
            });

            ctx.restore(); // Restore camera transform
        };

        const render = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            // window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameState, level]);

    const startGame = (e) => {
        e.preventDefault();
        if (tempName.trim()) {
            setPlayerName(tempName);
            setGameState('playing');
        }
    };

    const nextLevel = () => {
        setLevel(l => l + 1);
        setGameState('playing');
    };

    const resetGame = () => {
        setScore(0);
        setLevel(1);
        setLostMessage('');
        setGameState('playing');
    };

    return (
        <section id="game" className="relative w-full flex items-center justify-center py-10 border-t border-b border-gray-100/50">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <span className="inline-block px-4 py-1 rounded-full bg-pink-50 text-pink-500 text-sm font-bold tracking-wide uppercase mb-4">Interactive</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Reclaiming Space</h2>
                    <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">Collect <span className="text-pink-500 font-semibold">Good Vibes</span>. Avoid the <span className="text-red-500 font-bold">Negativity</span>.</p>
                </div>

                <div className="relative w-full aspect-[3/4] md:aspect-[21/9] bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(236,72,153,0.1)] overflow-hidden border border-pink-100 group">
                    {/* Live Stats */}
                    <div className="absolute top-4 right-6 md:top-6 md:right-8 z-20 flex gap-4">
                        <div className="hidden md:flex bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm border border-pink-100 items-center gap-2">
                            <Trophy size={16} className="text-yellow-500" />
                            <span className="text-gray-600 font-bold">{highScore}</span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-lg border border-pink-100">
                            <span className="text-pink-600 font-bold text-lg drop-shadow-sm">Score: {score}</span>
                        </div>
                    </div>
                    {playerName && gameState === 'playing' && (
                        <div className="absolute top-4 left-6 md:top-6 md:left-8 z-20 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm border border-pink-100">
                            <span className="text-gray-600 font-bold">Player: {playerName}</span>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <canvas ref={canvasRef} className="w-full h-full cursor-none outline-none" tabIndex={0} />
                    )}

                    {/* D-PAD Overlays - Only Visible when Playing */}
                    {gameState === 'playing' && (
                        <div className="absolute bottom-6 right-6 z-30 flex flex-col items-center gap-2 md:hidden">
                            <button
                                className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center active:bg-pink-400/50 transition-colors"
                                onTouchStart={(e) => { e.preventDefault(); handleDPad('ArrowUp', true); }}
                                onTouchEnd={(e) => { e.preventDefault(); handleDPad('ArrowUp', false); }}
                                onMouseDown={() => handleDPad('ArrowUp', true)}
                                onMouseUp={() => handleDPad('ArrowUp', false)}
                            >
                                <span className="text-2xl font-bold text-pink-600">↑</span>
                            </button>
                            <div className="flex gap-4">
                                <button
                                    className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center active:bg-pink-400/50 transition-colors"
                                    onTouchStart={(e) => { e.preventDefault(); handleDPad('ArrowLeft', true); }}
                                    onTouchEnd={(e) => { e.preventDefault(); handleDPad('ArrowLeft', false); }}
                                    onMouseDown={() => handleDPad('ArrowLeft', true)}
                                    onMouseUp={() => handleDPad('ArrowLeft', false)}
                                >
                                    <span className="text-2xl font-bold text-pink-600">←</span>
                                </button>
                                <button
                                    className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center active:bg-pink-400/50 transition-colors"
                                    onTouchStart={(e) => { e.preventDefault(); handleDPad('ArrowDown', true); }}
                                    onTouchEnd={(e) => { e.preventDefault(); handleDPad('ArrowDown', false); }}
                                    onMouseDown={() => handleDPad('ArrowDown', true)}
                                    onMouseUp={() => handleDPad('ArrowDown', false)}
                                >
                                    <span className="text-2xl font-bold text-pink-600">↓</span>
                                </button>
                                <button
                                    className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center active:bg-pink-400/50 transition-colors"
                                    onTouchStart={(e) => { e.preventDefault(); handleDPad('ArrowRight', true); }}
                                    onTouchEnd={(e) => { e.preventDefault(); handleDPad('ArrowRight', false); }}
                                    onMouseDown={() => handleDPad('ArrowRight', true)}
                                    onMouseUp={() => handleDPad('ArrowRight', false)}
                                >
                                    <span className="text-2xl font-bold text-pink-600">→</span>
                                </button>
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {gameState === 'start' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md z-10 p-4"
                            >
                                <h3 className="text-5xl md:text-8xl font-black mb-2 tracking-widest text-[#FBCFE8] font-sans opacity-50 select-none text-center">PLAY GAME</h3>
                                <form onSubmit={startGame} className="flex flex-col items-center gap-4">
                                    <input
                                        type="text"
                                        placeholder="Enter your name..."
                                        value={tempName}
                                        onChange={e => setTempName(e.target.value)}
                                        className="px-6 py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center text-lg shadow-inner bg-white/80"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="group px-8 py-4 md:px-10 md:py-5 bg-gray-900 text-white rounded-full font-bold text-lg md:text-xl hover:bg-[#E84393] transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3"
                                    >
                                        <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" /> Start Journey
                                    </button>
                                </form>
                                <p className="mt-4 text-gray-400 font-medium tracking-wide text-sm md:text-base">Use Arrow Keys</p>
                            </motion.div>
                        )}
                        {gameState === 'won' && (
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md z-10 text-center p-4 content-center"
                            >
                                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">Congratulations {playerName}!<br /><span className="text-pink-500">Now you can conquer life!</span> 🌟</h3>
                                <div className="text-xl text-gray-500 mb-8 font-medium space-x-4">
                                    <span>Level {level} Complete</span>
                                    <span>•</span>
                                    <span>Score: {score}</span>
                                </div>
                                <button onClick={nextLevel} className="px-8 py-3 bg-green-500 text-white rounded-full font-bold shadow-green-200 shadow-xl hover:bg-green-600 flex items-center gap-2 transform hover:scale-105 transition-all mx-auto">
                                    Next Level <ArrowRight size={20} />
                                </button>
                            </motion.div>
                        )}
                        {gameState === 'lost' && (
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md z-10 text-center p-4 content-center"
                            >
                                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{lostMessage}</h3>
                                <p className="text-lg md:text-xl text-gray-500 mb-8">Score: {score}</p>
                                <button onClick={resetGame} className="px-8 py-3 bg-red-500 text-white rounded-full font-bold shadow-red-200 shadow-xl hover:bg-red-600 flex items-center gap-2 transform hover:scale-105 transition-all mx-auto">
                                    <RotateCcw size={20} /> Try Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
export default GameSection;
