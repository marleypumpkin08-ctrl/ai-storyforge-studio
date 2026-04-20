"use client";

import { useMemo } from "react";
import { CanvasTexture } from "three";
import { flipRotation } from "@/lib/book/pagePhysics";

function createTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#f5f0dd";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1c1c1c";
  ctx.font = "36px serif";
  const lines = text.match(/.{1,48}/g) ?? [text];
  lines.slice(0, 20).forEach((line, idx) => ctx.fillText(line, 72, 96 + idx * 44));
  return new CanvasTexture(canvas);
}

export function PageMesh({ text, dragProgress }: { text: string; dragProgress: number }) {
  const texture = useMemo(() => createTexture(text), [text]);
  return (
    <mesh rotation-y={-flipRotation(dragProgress)}>
      <planeGeometry args={[2, 2.8, 24, 24]} />
      <meshStandardMaterial map={texture ?? undefined} />
    </mesh>
  );
}
