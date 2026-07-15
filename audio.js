// Retro Web Audio Synth Engine for CyberHack

let audioCtx = null;
let musicNode = null;
let musicInterval = null;
let musicVolumeNode = null;
let sfxVolumeNode = null;

let isMuted = false;
let masterVolume = 0.5;

function initAudio() {
    if (audioCtx) return;
    
    // Support standard and older browsers
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
    
    // Create master volume nodes
    musicVolumeNode = audioCtx.createGain();
    sfxVolumeNode = audioCtx.createGain();
    
    musicVolumeNode.gain.value = isMuted ? 0 : masterVolume * 0.3;
    sfxVolumeNode.gain.value = isMuted ? 0 : masterVolume;
    
    musicVolumeNode.connect(audioCtx.destination);
    sfxVolumeNode.connect(audioCtx.destination);
    
    // Start background synth music loop
    startMusicLoop();
}

function setVolume(pct) {
    masterVolume = pct / 100;
    if (audioCtx && !isMuted) {
        musicVolumeNode.gain.setValueAtTime(masterVolume * 0.3, audioCtx.currentTime);
        sfxVolumeNode.gain.setValueAtTime(masterVolume, audioCtx.currentTime);
    }
}

function toggleMute() {
    isMuted = !isMuted;
    if (audioCtx) {
        musicVolumeNode.gain.setValueAtTime(isMuted ? 0 : masterVolume * 0.3, audioCtx.currentTime);
        sfxVolumeNode.gain.setValueAtTime(isMuted ? 0 : masterVolume, audioCtx.currentTime);
    }
    return isMuted;
}

// Custom 8-bit sound effects using basic waveforms
function playSound(type) {
    if (!audioCtx || isMuted) return;
    
    // Resume audio context if suspended (browser security policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    switch (type) {
        case 'click': {
            // Short mechanical keyboard sound
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1000, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
            
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            
            osc.start(now);
            osc.stop(now + 0.05);
            break;
        }
        case 'laser': {
            // Typing completion / firewall blast
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
            
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            
            osc.start(now);
            osc.stop(now + 0.16);
            break;
        }
        case 'error': {
            // Short pitch drops for mistypes
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.setValueAtTime(100, now + 0.08);
            
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            
            osc.start(now);
            osc.stop(now + 0.12);
            break;
        }
        case 'shield': {
            // Shield charging effect
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(1200, now + 0.3);
            
            gainNode.gain.setValueAtTime(0.01, now);
            gainNode.gain.linearRampToValueAtTime(0.4, now + 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            
            osc.start(now);
            osc.stop(now + 0.3);
            break;
        }
        case 'heal': {
            // Cyber rejuvenation sound
            const notes = [440, 554, 659, 880];
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                osc.connect(gainNode);
                gainNode.connect(sfxVolumeNode);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.07);
                
                gainNode.gain.setValueAtTime(0.15, now + idx * 0.07);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.15);
                
                osc.start(now + idx * 0.07);
                osc.stop(now + idx * 0.07 + 0.15);
            });
            break;
        }
        case 'slow': {
            // Warp speed-down effect
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.linearRampToValueAtTime(80, now + 0.5);
            
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            
            osc.start(now);
            osc.stop(now + 0.5);
            break;
        }
        case 'breach': {
            // Firewall damage (bass drop/explosion)
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
            
            gainNode.gain.setValueAtTime(0.5, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            
            osc.start(now);
            osc.stop(now + 0.4);
            break;
        }
        case 'glitch': {
            // Electronic noisy crackle
            const bufferSize = audioCtx.sampleRate * 0.1;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(2000, now);
            
            const gainNode = audioCtx.createGain();
            
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            
            noise.start(now);
            noise.stop(now + 0.1);
            break;
        }
        case 'win': {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                osc.connect(gainNode);
                gainNode.connect(sfxVolumeNode);
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.1);
                
                gainNode.gain.setValueAtTime(0.2, now + idx * 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.3);
                
                osc.start(now + idx * 0.1);
                osc.stop(now + idx * 0.1 + 0.3);
            });
            break;
        }
        case 'lose': {
            const notes = [293.66, 277.18, 261.63, 196.00]; // descending minor
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                osc.connect(gainNode);
                gainNode.connect(sfxVolumeNode);
                
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + idx * 0.15);
                
                gainNode.gain.setValueAtTime(0.2, now + idx * 0.15);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.15 + 0.4);
                
                osc.start(now + idx * 0.15);
                osc.stop(now + idx * 0.15 + 0.4);
            });
            break;
        }
        case 'keystroke': {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(sfxVolumeNode);
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
            
            gainNode.gain.setValueAtTime(0.05, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
            
            osc.start(now);
            osc.stop(now + 0.03);
            break;
        }
    }
}

// Low-fi cyber-terminal music synthesizer loops (Generative synth bass)
function startMusicLoop() {
    if (musicInterval) clearInterval(musicInterval);
    
    // Minimal cyberpunk baseline
    const bassSequence = [55, 55, 65.41, 55, 73.42, 73.42, 65.41, 82.41]; // A1, A1, C2, A1, D2, D2, C2, E2
    let beatIdx = 0;
    
    musicInterval = setInterval(() => {
        if (!audioCtx || isMuted) return;
        
        // Auto-resume if suspended (e.g. after tab switch)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const now = audioCtx.currentTime;
        const freq = bassSequence[beatIdx % bassSequence.length];
        
        // Generate deep sub-bass pulse
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(musicVolumeNode);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        
        osc.start(now);
        osc.stop(now + 0.3);
        
        // Occasional ambient hi-hat / high synth bleep
        if (beatIdx % 4 === 2 && Math.random() > 0.4) {
            const highOsc = audioCtx.createOscillator();
            const highGain = audioCtx.createGain();
            highOsc.connect(highGain);
            highGain.connect(musicVolumeNode);
            
            highOsc.type = 'sine';
            highOsc.frequency.setValueAtTime(freq * 4, now + 0.05); // transpose up two octaves
            
            highGain.gain.setValueAtTime(0.08, now + 0.05);
            highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            
            highOsc.start(now + 0.05);
            highOsc.stop(now + 0.2);
        }
        
        beatIdx++;
    }, 350); // 170 BPM approx eighth notes
}
