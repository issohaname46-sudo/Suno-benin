import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { lyrics, style, title } = await req.json();
    const apiKey = process.env.SUNO_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "SUNO_API_KEY n'est pas configurée sur Vercel." },
        { status: 500 }
      );
    }

    if (!lyrics || typeof lyrics !== "string") {
      return NextResponse.json(
        { error: "Les paroles sont obligatoires." },
        { status: 400 }
      );
    }

    const sunoRes = await fetch("https://api.sunoapi.org/api/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: lyrics,
        style: style || "Afrobeats",
        title: title || "Suno Bénin",
        customMode: true,
        instrumental: false,
        model: "V4",
      }),
      cache: "no-store",
    });

    const data = await sunoRes.json();

    if (!sunoRes.ok) {
      return NextResponse.json(
        { error: data?.message || "Le service de génération a refusé la demande.", details: data },
        { status: sunoRes.status }
      );
    }

    const audioUrl =
      data?.audio_url ||
      data?.data?.audio_url ||
      data?.data?.[0]?.audio_url ||
      data?.clips?.[0]?.audio_url ||
      data?.data?.[0]?.audioUrl;

    return NextResponse.json({
      ...data,
      audio_url: audioUrl || undefined,
      message: audioUrl
        ? "Audio disponible."
        : "Génération lancée ou en attente du résultat.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur inconnue.",
      },
      { status: 500 }
    );
  }
}