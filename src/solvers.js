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
window.findNRooksSolution = function(n) {
  //create empty n x n matrix

  var board = new Board({'n': n});
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var row = board.get(i);
      row[j] = 1;
      board.set(i, row);
      if (board.hasAnyRooksConflicts()) {
        row[j] = 0;
        board.set(i, row);
      }
    }
  }

  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix.push(board.get(i));
  }
  var solution = matrix; //fixme


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var counter = 0;
  var recursion = function (rowIndex) {
    //Base case
    if (counter === n) {
      return makeSolution();
    }
    //create a new row from rowIndex taken from the board instance
    //iterate through each row
      //insert a 1 at column and check for conflicts, increase counter
      //if any conflicts, remove from column and go to next column
      //if no conflicts, jump to next row and recursively call and counter++





  };






  var makeSolution = function() {
    var matrix = [];
    for (var i = 0; i < n; i++) {
      matrix.push(board.get(i));
    }
    var solution = matrix; //fixme
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  };
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
