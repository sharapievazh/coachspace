import { useEffect, useRef, useState } from "react";
import { Play, Pause, FastForward, Rewind, ChevronDown, ChevronUp, Headphones } from "lucide-react";
import { PODCASTS, PODCAST_GROUPS, type Podcast } from "@/lib/podcasts-data";

function formatTime(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEEDS = [1, 1.25, 1.5, 2] as const;
type Speed = typeof SPEEDS[number];

function PlayerCard({ podcast }: { podcast: Podcast }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      try {
        await audio.play();
        setPlaying(true);
      } catch (e) {
        console.warn("playback error", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const seek = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta));
  };

  const onSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setCurrent(val);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onLoad = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(false); setCurrent(0); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{ background: podcast.color + "12", border: `1.5px solid ${podcast.color}28` }}
    >
      <audio ref={audioRef} src={podcast.file} preload="metadata" />

      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-11 h-11 rounded-xl grid place-items-center text-xl"
          style={{ background: podcast.color + "22" }}
        >
          {podcast.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm leading-snug">{podcast.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{podcast.description}</p>
          <span className="text-xs text-muted-foreground/70 mt-1 inline-block">{podcast.duration}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <input
          type="range" min={0} max={duration || 100} value={current}
          onChange={onSlider}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, ${podcast.color} ${pct}%, var(--secondary) ${pct}%)` }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(current)}</span>
          <span>{duration ? formatTime(duration) : podcast.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => seek(-15)} className="w-10 h-10 grid place-items-center rounded-full bg-background text-foreground hover:bg-secondary transition-colors">
          <Rewind size={18} />
        </button>
        <button
          onClick={toggle}
          className="w-13 h-13 w-[52px] h-[52px] grid place-items-center rounded-full text-white shadow-md transition-opacity hover:opacity-90"
          style={{ background: podcast.color }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : playing ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-0.5" />
          )}
        </button>
        <button onClick={() => seek(15)} className="w-10 h-10 grid place-items-center rounded-full bg-background text-foreground hover:bg-secondary transition-colors">
          <FastForward size={18} />
        </button>
        <button
          onClick={cycleSpeed}
          className="w-10 h-10 grid place-items-center rounded-full bg-background text-foreground hover:bg-secondary transition-colors text-xs font-bold tabular-nums"
        >
          {speed}x
        </button>
      </div>
    </div>
  );
}

function GroupSection({ emoji, label, color, podcasts }: {
  emoji: string;
  label: string;
  color: string;
  podcasts: Podcast[];
}) {
  const [open, setOpen] = useState(false);
  const count = podcasts.length;
  const countLabel = count === 1 ? "выпуск" : count < 5 ? "выпуска" : "выпусков";

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: `1.5px solid ${color}30` }}>
      {/* Section header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 text-left active:opacity-80 transition-opacity"
        style={{ background: `${color}12` }}
      >
        {/* Color icon */}
        <span
          className="shrink-0 w-11 h-11 rounded-xl grid place-items-center text-xl shadow-sm"
          style={{ background: color, boxShadow: `0 4px 12px ${color}40` }}
        >
          {emoji}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-bold text-foreground leading-snug">{label}</span>
          <span className="block text-xs mt-0.5 font-medium" style={{ color }}>{count} {countLabel}</span>
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full grid place-items-center"
          style={{ background: `${color}18` }}
        >
          {open
            ? <ChevronUp size={16} style={{ color }} />
            : <ChevronDown size={16} style={{ color }} />}
        </span>
      </button>

      {/* Episodes */}
      {open && (
        <div className="p-4 pt-3 space-y-3 bg-background" style={{ borderTop: `1px solid ${color}20` }}>
          {podcasts.map((p) => (
            <PlayerCard key={p.id} podcast={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Podcasts() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Подкасты</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{PODCASTS.length} аудиовыпусков · слушайте по темам</p>
      </div>

      {PODCAST_GROUPS.map((group) => {
        const items = PODCASTS.filter((p) => p.group === group.id);
        if (items.length === 0) return null;
        return (
          <GroupSection
            key={group.id}
            emoji={group.emoji}
            label={group.label}
            color={group.color}
            podcasts={items}
          />
        );
      })}
    </div>
  );
}
