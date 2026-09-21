/* Flood It engine - pure logic, shared by the app and node tests.
   Board: flat array of size*size color indices. Flood starts at the top-left cell. */
(function (global) {
  'use strict';

  var COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  /* Random board of size x size with `colorCount` possible colors. */
  function newBoard(size, colorCount, rand) {
    var b = new Array(size * size);
    for (var i = 0; i < b.length; i++) b[i] = Math.floor(rand() * colorCount);
    return b;
  }

  /* The connected region (4-way) of same-colored cells containing (0,0). */
  function region(board, size) {
    var target = board[0];
    var seen = new Array(board.length).fill(false);
    var stack = [0];
    seen[0] = true;
    var out = [];
    while (stack.length) {
      var i = stack.pop();
      out.push(i);
      var x = i % size, y = (i - x) / size;
      var nbrs = [];
      if (x > 0) nbrs.push(i - 1);
      if (x < size - 1) nbrs.push(i + 1);
      if (y > 0) nbrs.push(i - size);
      if (y < size - 1) nbrs.push(i + size);
      for (var k = 0; k < nbrs.length; k++) {
        var j = nbrs[k];
        if (!seen[j] && board[j] === target) { seen[j] = true; stack.push(j); }
      }
    }
    return out;
  }

  /*
   * Flood from the top-left with `color` (index). Returns a NEW board:
   * the region takes `color`, and merges with any adjacent cells of that color.
   * Returns null if the move changes nothing (color already flooding).
   */
  function flood(board, size, color) {
    if (board[0] === color) return null;
    var next = board.slice();
    var cells = region(board, size);
    for (var i = 0; i < cells.length; i++) next[cells[i]] = color;
    return next;
  }

  function isSolved(board) {
    for (var i = 1; i < board.length; i++) if (board[i] !== board[0]) return false;
    return true;
  }

  /* Suggested move budget for a board size / color count (classic formula). */
  function moveBudget(size, colorCount) {
    return Math.floor(size * colorCount / 14 * 3.2);
  }

  var api = { COLORS: COLORS, newBoard: newBoard, region: region, flood: flood, isSolved: isSolved, moveBudget: moveBudget };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.FloodIt = api;
})(typeof window !== 'undefined' ? window : globalThis);
