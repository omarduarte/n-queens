/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  //create empty n x n matrix
  var board = new Board({'n': n});

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col); //Change (row,col) to 1
      if (board.hasAnyRooksConflicts()) { //if it fails
        board.togglePiece(row, col); //Change (row,col) to 0
      }
    }
  }

  var matrix = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {

  var factorial = function (n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n-1);
  };

  var solutionCount = factorial(n); //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  if (n === 0)  {
    return [];
  }
  if (n === 1) {
    return [[1]];
  }
  if (n === 2) {
    return [[0,0],[0,0]];
  }
  if (n === 3) {
    return [[0,0,0],[0,0,0],[0,0,0]];
  }
  var board = new Board({'n': n});

  var traverseBoard = function (rowIndex) {
    var result = null;
    //Base case
    if (rowIndex === n) {
      return board.rows(); //if we find a solution
    }

    var currentRow = board.get(rowIndex); //create a new row from rowIndex taken from the board instance
    //iterate through each column
    for (var col = 0; col < currentRow.length; col++) {
      board.togglePiece(rowIndex, col); //insert a 1 at (rowIndex, col)

      if (board.hasAnyQueensConflicts()) { //if any conflicts,
        board.togglePiece(rowIndex, col); //insert a 0 at (rowIndex, col)
        continue; //go to next column

      } else {
        result = traverseBoard(rowIndex + 1); //recurse into to next row

        if (result) { // if result's recursion passes the base condition
          return result; //return the solution
        } else {
          board.togglePiece(rowIndex, col); //insert a 0 at (rowIndex, col)
        }
      }
    }
    return result; // Only if result === null;
  };

  return traverseBoard(0); //call it
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  var countQueenSolutions = function (rowIndex) {
    //Base case
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(rowIndex, col);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(rowIndex, col);
        continue;
      } else {
        countQueenSolutions(rowIndex + 1);
        board.togglePiece(rowIndex, col);
      }
    }
  };

  countQueenSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
