export type Vertex = readonly [number, number, number];
export type Edge = readonly [number, number];

const normalize = ([x, y, z]: Vertex): Vertex => {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
};

/** One subdivision of a regular icosahedron: 42 vertices and 120 edges. */
export function createHeroGeometry(): { vertices: Vertex[]; edges: Edge[] } {
  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices: Vertex[] = [];
  for (const a of [-1, 1])
    for (const b of [-phi, phi]) {
      vertices.push(
        normalize([a, b, 0]),
        normalize([0, a, b]),
        normalize([b, 0, a]),
      );
    }
  const distance = (a: Vertex, b: Vertex) =>
    Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const side = Math.min(
    ...vertices.slice(1).map((vertex) => distance(vertices[0], vertex)),
  );
  const adjacent = (a: number, b: number) =>
    Math.abs(distance(vertices[a], vertices[b]) - side) < 1e-6;
  const faces: [number, number, number][] = [];
  for (let a = 0; a < 12; a++)
    for (let b = a + 1; b < 12; b++)
      for (let c = b + 1; c < 12; c++) {
        if (adjacent(a, b) && adjacent(b, c) && adjacent(c, a))
          faces.push([a, b, c]);
      }
  const midpoints = new Map<string, number>();
  const midpoint = (a: number, b: number) => {
    const key = [a, b].sort((x, y) => x - y).join(":");
    const existing = midpoints.get(key);
    if (existing !== undefined) return existing;
    const va = vertices[a],
      vb = vertices[b];
    const index =
      vertices.push(
        normalize([
          (va[0] + vb[0]) / 2,
          (va[1] + vb[1]) / 2,
          (va[2] + vb[2]) / 2,
        ]),
      ) - 1;
    midpoints.set(key, index);
    return index;
  };
  const edges = new Map<string, Edge>();
  for (const [a, b, c] of faces) {
    const ab = midpoint(a, b),
      bc = midpoint(b, c),
      ca = midpoint(c, a);
    for (const triangle of [
      [a, ab, ca],
      [b, bc, ab],
      [c, ca, bc],
      [ab, bc, ca],
    ]) {
      for (let i = 0; i < 3; i++) {
        const [start, end] = [triangle[i], triangle[(i + 1) % 3]].sort(
          (x, y) => x - y,
        );
        edges.set(`${start}:${end}`, [start, end]);
      }
    }
  }
  return { vertices, edges: [...edges.values()] };
}

export function rotateVertex(
  [x, y, z]: Vertex,
  angleX: number,
  angleY: number,
): Vertex {
  const rotatedX = x * Math.cos(angleY) + z * Math.sin(angleY);
  const rotatedZ = -x * Math.sin(angleY) + z * Math.cos(angleY);
  return [
    rotatedX,
    y * Math.cos(angleX) - rotatedZ * Math.sin(angleX),
    y * Math.sin(angleX) + rotatedZ * Math.cos(angleX),
  ];
}

/** Match a 60-degree perspective camera four units in front of the artwork. */
export function projectVertex(
  [x, y, z]: Vertex,
  width: number,
  height: number,
) {
  const depth = 4 - z;
  const focal = height / (2 * Math.tan(Math.PI / 6));
  return {
    x: width / 2 + (x * focal) / depth,
    y: height / 2 - (y * focal) / depth,
    depth,
  };
}

/** A stable particle field avoids a distracting jump on resize or theme changes. */
export function createHeroParticles(count = 120): Vertex[] {
  let seed = 83;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 0x100000000;
  };
  return Array.from(
    { length: count },
    () =>
      [
        (random() - 0.5) * 8,
        (random() - 0.5) * 8,
        (random() - 0.5) * 8,
      ] as Vertex,
  );
}
