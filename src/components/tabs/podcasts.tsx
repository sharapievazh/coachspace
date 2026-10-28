import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, FastForward, Rewind, Headphones } from "lucide-react";
import { PODCASTS, type Podcast } from "@/lib/podcasts-data";

function formatTime(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function PlayerCard({ podcast }: { podcast: Podcast }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

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
      className="rounded-2xl p-5 space-y-4"
      style={{ background: podcast.color + "14", border: `1.5px solid ${podcast.color}30` }}
    >
      <audio ref={audioRef} src={podcast.file} preload="metadata" />

      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-2xl"
          style={{ background: podcast.color + "22" }}
        >
          {podcast.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm leading-snug">{podcast.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{podcast.description}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={current}
          onChange={onSlider}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${podcast.color} ${pct}%, var(--secondary) ${pct}%)`,
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(current)}</span>
          <span>{duration ? formatTime(duration) : podcast.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => seek(-15)}
          className="w-10 h-10 grid place-items-center rounded-full bg-background text-foreground hover:bg-secondary transition-colors"
        >
          <Rewind size={18} />
        </button>
        <button
          onClick={toggle}
          className="w-14 h-14 grid place-items-center rounded-full text-white shadow-md transition-opacity hover:opacity-90"
          style={{ background: podcast.color }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : playing ? (
            <Pause size={22} />
          ) : (
            <Play size={22} className="ml-0.5" />
          )}
        </button>
        <button
          onClick={() => seek(15)}
          className="w-10 h-10 grid place-items-center rounded-full bg-background text-foreground hover:bg-secondary transition-colors"
        >
          <FastForward size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Podcasts() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Подкасты</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Слушайте материалы в формате аудио</p>
      </div>

      {PODCASTS.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          <Headphones className="mx-auto mb-2 opacity-40" size={28} />
          Подкасты появятся здесь
        </div>
      ) : (
        <div className="space-y-4">
          {PODCASTS.map((p) => (
            <PlayerCard key={p.id} podcast={p} />
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center pb-2">
        {PODCASTS.length} {PODCASTS.length === 1 ? "подкаст" : "подкаста"}
      </p>
    </div>
  );
}
