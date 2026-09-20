"use client";

import { useState } from "react";

export default function Home() {
  const [lyrics, setLyrics] = useState(
    "Bonne semaine à ma Queen Rosalie, que Dieu te bénisse, tu es ma joie."
  );
  const [style, setStyle] = useState("Afrobeats Romantic, Female Voice, Slow");
  const [title, setTitle] = useState("Suno Bénin");
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState("");
  const [message, setMessage] = useState("");

  async function generate() {
    if (!lyrics.trim()) {
      setMessage("Écris d'abord quelques paroles.");
      return;
    }

    setLoading(true);
    setAudio("");
    setMessage("🎵 Création de ta chanson...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lyrics, style, title }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur pendant la génération.");
      }

      if (data.audio_url) {
        setAudio(data.audio_url);
        setMessage("✅ Ta chanson est prête !");
      } else {
        setMessage(
          data.message ||
          "⏳ La génération a été lancée. L'API n'a pas encore fourni l'audio."
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mb-3 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
            🇧🇯 Création musicale IA
          </div>
          <h1 className="text-4xl font-black sm:text-6xl">SUNO BÉNIN</h1>
          <p className="mt-3 text-zinc-400">
            Transforme tes paroles en chanson.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5 shadow-2xl sm:p-7">
          <label className="font-bold">Titre de la chanson</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none focus:border-white"
            placeholder="Ex. Mon amour"
          />

          <label className="mt-6 block font-bold">Tes paroles</label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="mt-2 h-40 w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none focus:border-white"
            placeholder="Écris tes paroles ici..."
          />

          <label className="mt-6 block font-bold">Style musical</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none"
          >
            <option>Afrobeats Romantic, Female Voice, Slow</option>
            <option>Gospel Powerful, Piano, Emotional</option>
            <option>Afro Love, Amapiano</option>
            <option>Afrobeats, Male Voice, Dance</option>
            <option>Rap Bénin Drill, Male Voice</option>
          </select>

          <button
            onClick={generate}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-white py-4 text-lg font-black text-black disabled:opacity-50"
          >
            {loading ? "⏳ GÉNÉRATION..." : "🎤 FAIRE CHANTER"}
          </button>

          {message && (
            <p className="mt-4 rounded-2xl bg-zinc-900 p-4 text-center text-sm text-zinc-300">
              {message}
            </p>
          )}

          {audio && (
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="mb-3 font-bold">🎧 Résultat</p>
              <audio controls src={audio} className="w-full" />
            </div>
          )}
        </section>

        <div className="mt-6 text-center">
          <a
            href="https://wa.me/2290196669448?text=Je%20veux%20un%20site%20comme%20Suno%20B%C3%A9nin"
            className="inline-block rounded-full bg-green-500 px-7 py-3 font-bold text-black"
          >
            📲 Commander un site sur WhatsApp
          </a>
          <p className="mt-3 text-xs text-zinc-600">
            Site créé au Bénin 🇧🇯
          </p>
        </div>
      </div>
    </main>
  );
}