/* eslint-disable @next/next/no-img-element */
"use client";
import KUTE from "kute.js";
import { ReactNode, useEffect } from "react";

interface Props {
  className?: string;
  blobId1: string;
  blobId2: string;
  blob: ReactNode;
  image?: ReactNode;
}

const AnimateBlob = ({ blobId1, blobId2, blob, image, className }: Props) => {
  useEffect(() => {
    if (!blobId1 || !blobId2) return;
    const tween1 = KUTE.fromTo(
      blobId1,
      { path: blobId1 },
      { path: blobId2 },
      { repeat: 999, duration: 3000, yoyo: true }
    );
    tween1.start();
  }, []);

  return (
    <div>
      {image}
      {blob}
    </div>
  );
};
export default AnimateBlob;
