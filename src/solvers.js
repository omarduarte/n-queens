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
      var currentRow = board.get(row); //select the current row during the iteration
      currentRow[col] = 1; //set column j in current row to 1
      board.set(row, currentRow); //push this to the board
      if (board.hasAnyRooksConflicts()) { //if it fails
        currentRow[col] = 0; //reset to 0
        board.set(row, currentRow); //reset board at the row with the reset Column value
      }
    }
  }

  var matrix = [];
  for (var row  = 0; row < n; row++) {
    matrix.push(board.get(row));
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; //fixme

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

  var makeSolution = function() {
    var matrix = [];

    for (var i = 0; i < n; i++) {
      matrix.push(board.get(i));
    }

    console.log('Single solution for ' + n + ' queens:', JSON.stringify(matrix));
    return matrix;
  };

  var recursion = function (rowIndex) {
    var result = null;
    //Base case
    if (rowIndex === n) {
      return makeSolution(); //if we find a solution
    }

    var currentRow = board.get(rowIndex); //create a new row from rowIndex taken from the board instance
    //iterate through each row
    for (var col = 0; col < currentRow.length; col++) {
      currentRow[col] = 1; //insert a 1 at column and check for conflicts, increase counter
      board.set(rowIndex, currentRow); //update the board

      if (board.hasAnyQueensConflicts()) { //if any conflicts,
        currentRow[col] = 0; //restore column
        board.set(rowIndex, currentRow); //reset the board
        continue; //go to next column
      } else {
        var result = recursion(rowIndex + 1); //recurse into to next row. Pass next rowIndex

        if (result) { // if result's recursion passes the base condition
          return result; //return the solution
        } else {
          currentRow[col] = 0; //reset the currentCol's value to 0
          board.set(rowIndex, currentRow); //reset the board
        }
      }
    }

    return result; // Only if result === null;
  };

  return recursion(0); //call it
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
