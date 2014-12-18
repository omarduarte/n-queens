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

  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex , colIndex); //Change (rowIndex ,colIndex) to 1
      if (board.hasAnyRooksConflictsOn(rowIndex, colIndex)) { //if it fails
        board.togglePiece(rowIndex , colIndex); //Change (row,colIndex) to 0
      } else {
        break;
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

  var board = new Board({'n': n});

  var traverseBoard = function (rowIndex) {
    var result = null;
    //Base case
    if (rowIndex === n) {
      return board.rows(); //if we find a solution
    }

    //iterate through each column
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex); //insert a 1 at (rowIndex, colIndex)

      if (board.hasAnyQueenConflictsOn(rowIndex, colIndex)) { //if any conflicts,
        board.togglePiece(rowIndex, colIndex); //insert a 0 at (rowIndex, colIndex)
        continue; //go to next column

      } else {
        result = traverseBoard(rowIndex + 1); //recurse into to next row

        if (result) { // if result's recursion passes the base condition
          return result; //return the solution
        } else {
          board.togglePiece(rowIndex, colIndex); //insert a 0 at (rowIndex, colindex)
        }
      }
    }
    return result; // Only if result === null;
  };

  return traverseBoard(0) || board.rows(); //call it
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

    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyQueenConflictsOn(rowIndex, colIndex)) {
        board.togglePiece(rowIndex, colIndex);
        continue;
      } else {
        countQueenSolutions(rowIndex + 1);
        board.togglePiece(rowIndex, colIndex);
      }
    }
  };

  countQueenSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
