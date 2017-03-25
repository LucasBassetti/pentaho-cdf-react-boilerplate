export const FETCH_EXAMPLE = 'FETCH_EXAMPLE';

export function fetchExample() {
  return {
    type: FETCH_EXAMPLE,
    payload: [
      { id: 1, title: 'item 1' },
      { id: 2, title: 'item 2' },
      { id: 3, title: 'item 3' },
    ]
  };
}
