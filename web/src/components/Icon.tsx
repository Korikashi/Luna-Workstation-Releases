/**
 * Vector icons ported from the application (`src/ui/icons.rs` of Luna WorkStation): same geometry, expressed in a
 * unit coordinate system (-1..1, radius 1) with the same thin (0.16) and thick (0.24) stroke widths.
 */
import type { ReactNode } from 'react';

export type IconName =
  | 'monitor'
  | 'grid'
  | 'fullscreen'
  | 'shield'
  | 'gear'
  | 'sliders'
  | 'palette'
  | 'activity'
  | 'folder'
  | 'keyboard'
  | 'home'
  | 'power'
  | 'logoff'
  | 'flask'
  | 'download'
  | 'refresh'
  | 'menu'
  | 'close'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronDown'
  | 'info'
  | 'play';

const THIN = 0.16;
const THICK = 0.24;

function poly(points: Array<[number, number]>): string {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

/** Points of an arc (degrees), following the parametrisation used by the application. */
function arc(radius: number, from: number, to: number, step: number, mode: 'sincos' | 'cossin'): string {
  const pts: Array<[number, number]> = [];
  for (let a = from; a <= to + 1e-6; a += step) {
    const r = (a * Math.PI) / 180;
    const p: [number, number] =
      mode === 'sincos' ? [radius * Math.sin(r), -radius * Math.cos(r)] : [radius * Math.cos(r), radius * Math.sin(r)];
    pts.push([Number(p[0].toFixed(3)), Number(p[1].toFixed(3))]);
  }
  return poly(pts);
}

const thin = { strokeWidth: THIN };
const thick = { strokeWidth: THICK };

const shapes: Record<IconName, ReactNode> = {
  monitor: (
    <g {...thin}>
      <rect x={-0.95} y={-0.75} width={1.9} height={1.15} />
      <line x1={0} y1={0.4} x2={0} y2={0.8} />
      <line x1={-0.5} y1={0.82} x2={0.5} y2={0.82} />
    </g>
  ),
  grid: (
    <g {...thin}>
      {[-0.5, 0.5].flatMap((x) =>
        [-0.5, 0.5].map((y) => <rect key={`${x}${y}`} x={x - 0.35} y={y - 0.35} width={0.7} height={0.7} />),
      )}
    </g>
  ),
  fullscreen: (
    <g {...thick}>
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([sx = 0, sy = 0]) => (
        <polyline
          key={`${sx}${sy}`}
          points={poly([
            [0.3 * sx, 0.85 * sy],
            [0.85 * sx, 0.85 * sy],
            [0.85 * sx, 0.3 * sy],
          ])}
        />
      ))}
    </g>
  ),
  shield: (
    <polyline
      {...thin}
      points={poly([
        [0, -0.9],
        [0.8, -0.55],
        [0.65, 0.35],
        [0, 0.9],
        [-0.65, 0.35],
        [-0.8, -0.55],
        [0, -0.9],
      ])}
    />
  ),
  gear: (
    <g {...thick}>
      <circle r={0.55} />
      {Array.from({ length: 8 }, (_, k) => {
        const a = (k * 45 * Math.PI) / 180;
        return (
          <line
            key={k}
            x1={0.55 * Math.cos(a)}
            y1={0.55 * Math.sin(a)}
            x2={0.92 * Math.cos(a)}
            y2={0.92 * Math.sin(a)}
          />
        );
      })}
      <circle r={0.16} fill="currentColor" stroke="none" />
    </g>
  ),
  sliders: (
    <g {...thin}>
      {(
        [
          [-0.6, -0.35],
          [0, 0.4],
          [0.6, -0.1],
        ] as const
      ).map(([y, knob]) => (
        <g key={y}>
          <line x1={-0.9} y1={y} x2={0.9} y2={y} />
          <circle cx={knob} cy={y} r={0.22} fill="currentColor" stroke="none" />
        </g>
      ))}
    </g>
  ),
  palette: (
    <g {...thin}>
      <circle r={0.85} />
      {(
        [
          [-0.4, -0.35],
          [0.1, -0.55],
          [0.52, -0.1],
          [-0.45, 0.3],
        ] as const
      ).map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={0.1} fill="currentColor" stroke="none" />
      ))}
    </g>
  ),
  activity: (
    <polyline
      {...thin}
      points={poly([
        [-0.95, 0.05],
        [-0.55, 0.05],
        [-0.32, -0.55],
        [-0.05, 0.75],
        [0.26, -0.75],
        [0.48, 0.05],
        [0.95, 0.05],
      ])}
    />
  ),
  folder: (
    <g {...thin}>
      <rect x={-0.9} y={-0.45} width={1.8} height={1.15} />
      <polyline
        points={poly([
          [-0.9, -0.45],
          [-0.55, -0.8],
          [0, -0.8],
          [0.25, -0.45],
        ])}
      />
    </g>
  ),
  keyboard: (
    <g {...thin}>
      <rect x={-0.95} y={-0.55} width={1.9} height={1.1} />
      {[-0.22, 0.1].flatMap((row) =>
        [-0.6, -0.2, 0.2, 0.6].map((col) => (
          <circle key={`${row}${col}`} cx={col} cy={row} r={0.07} fill="currentColor" stroke="none" />
        )),
      )}
      <line x1={-0.5} y1={0.35} x2={0.5} y2={0.35} />
    </g>
  ),
  home: (
    <g {...thin}>
      <polyline
        points={poly([
          [-0.95, 0],
          [0, -0.85],
          [0.95, 0],
        ])}
      />
      <rect x={-0.6} y={0} width={1.2} height={0.85} />
    </g>
  ),
  power: (
    <g>
      <polyline {...thin} points={arc(0.8, -60, 300, 10, 'sincos')} />
      <line {...thick} x1={0} y1={-0.95} x2={0} y2={-0.1} />
    </g>
  ),
  logoff: (
    <g {...thin}>
      <polyline
        points={poly([
          [0.1, -0.9],
          [-0.85, -0.9],
          [-0.85, 0.9],
          [0.1, 0.9],
        ])}
      />
      <line x1={-0.3} y1={0} x2={0.9} y2={0} />
      <polyline
        points={poly([
          [0.5, -0.4],
          [0.9, 0],
          [0.5, 0.4],
        ])}
      />
    </g>
  ),
  flask: (
    <g {...thin}>
      <polyline
        points={poly([
          [-0.25, -0.9],
          [-0.25, -0.2],
          [-0.8, 0.85],
          [0.8, 0.85],
          [0.25, -0.2],
          [0.25, -0.9],
        ])}
      />
      <line x1={-0.45} y1={-0.9} x2={0.45} y2={-0.9} />
      <line x1={-0.5} y1={0.3} x2={0.5} y2={0.3} />
    </g>
  ),
  download: (
    <g {...thin}>
      <line x1={0} y1={-0.9} x2={0} y2={0.35} />
      <polyline
        points={poly([
          [-0.45, -0.1],
          [0, 0.35],
          [0.45, -0.1],
        ])}
      />
      <polyline
        points={poly([
          [-0.85, 0.3],
          [-0.85, 0.82],
          [0.85, 0.82],
          [0.85, 0.3],
        ])}
      />
    </g>
  ),
  refresh: (
    <g {...thin}>
      <polyline points={arc(0.72, 40, 340, 10, 'cossin')} />
      <polyline
        points={poly([
          [0.677 - 0.42, -0.246 - 0.08],
          [0.677, -0.246],
          [0.677 + 0.02, -0.246 + 0.42],
        ])}
      />
    </g>
  ),
  menu: (
    <g {...thin}>
      {[-0.6, 0, 0.6].map((y) => (
        <line key={y} x1={-0.85} y1={y} x2={0.85} y2={y} />
      ))}
    </g>
  ),
  close: (
    <g {...thick}>
      <line x1={-0.7} y1={-0.7} x2={0.7} y2={0.7} />
      <line x1={-0.7} y1={0.7} x2={0.7} y2={-0.7} />
    </g>
  ),
  chevronLeft: (
    <polyline
      {...thick}
      points={poly([
        [0.3, -0.7],
        [-0.4, 0],
        [0.3, 0.7],
      ])}
    />
  ),
  chevronRight: (
    <polyline
      {...thick}
      points={poly([
        [-0.3, -0.7],
        [0.4, 0],
        [-0.3, 0.7],
      ])}
    />
  ),
  chevronDown: (
    <polyline
      {...thick}
      points={poly([
        [-0.7, -0.3],
        [0, 0.4],
        [0.7, -0.3],
      ])}
    />
  ),
  info: (
    <g>
      <circle {...thin} r={0.82} />
      <circle cx={0} cy={-0.48} r={0.12} fill="currentColor" stroke="none" />
      <line {...thick} x1={0} y1={-0.16} x2={0} y2={0.52} />
    </g>
  ),
  play: (
    <polygon
      fill="currentColor"
      stroke="none"
      points={poly([
        [-0.55, -0.8],
        [0.8, 0],
        [-0.55, 0.8],
      ])}
    />
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

/** Decorative icon (hidden from assistive technology; the surrounding control carries the label). */
export function Icon({ name, size = 16, className }: IconProps) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="-1.1 -1.1 2.2 2.2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}

/** Crescent of the official icon (`src/ui/about_icon.svg`), drawn with the accent color. */
export function MoonMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className ? `moon ${className}` : 'moon'}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M 60 3 C 28.58 8.30 5.65 34.65 5.5 64 C 5.63 93.81 30.11 124 64 124 C 92.55 124.63 116.24 101.68 121 77 C 112.15 89.68 97.22 98.82 81 99 C 54.04 97.97 33.33 75.14 32.5 51 C 31.21 30.64 43.49 14.32 60 3 Z"
      />
    </svg>
  );
}
