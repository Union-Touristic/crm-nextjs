"use client";
import { Tilt } from "react-tilt";

const cardOptions = {
  reverse: true, // reverse the tilt direction
  max: 20, // max tilt rotation (degrees)
  perspective: 4000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

export function CardTilt() {
  return (
    <Tilt
      options={cardOptions}
      className="w-[440px] h-[560px] bg-passport-blue-gradient bg-cover overflow-hidden"
    />
  );
}
