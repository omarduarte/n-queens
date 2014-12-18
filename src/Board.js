 // This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyRooksConflictsOn: function(rowIndex, colIndex) {
      return (this.hasRowConflictAt(rowIndex) || this.hasColConflictAt(colIndex));
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var counter = 0;

      for (var i = 0; i < row.length; i++) {
        counter += row[i];
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get size of board
      var size = this.get('n');
      //iterate thorugh every row of the board
      for ( var i = 0; i < size; i++) {
        //check if hasRowConflict === true
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //get the board
      var size = this.get('n');
      var counter = 0;
      for (var i = 0; i < size; i++) {
        var row = this.get(i);
        counter += row[colIndex];
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //grab the size of the board
      var size = this.get('n');

      //iterate through every column of the board
      for (var i = 0; i < size; i++) {
        // check if hasColConflict === true
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(projectedColIndexAtRow0) {
      // If the projected Column is less than the first column index
      // we need to set the starting rowIndex and colIndex in a position where the diagonal covers at least 2 elements
      var rowIndex = (projectedColIndexAtRow0 >= 0) ? 0 : -projectedColIndexAtRow0;
      var colIndex = (projectedColIndexAtRow0 >= 0) ? projectedColIndexAtRow0 : 0;

      var counter = 0;
      var size = this.get('n');

      while (rowIndex < size && colIndex < size) {
        counter += this.get(rowIndex)[colIndex];
        if (counter > 1) {
          return true;
        }
        rowIndex++;
        colIndex++;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');

      /*
       *  The colIndex is set to 2 - size (size === n) because we need to begin left
       *  of the first column so that hasMajorDiagonalConflictAt() can cover the entire board
       *
       * projected     4x4 board
       * colIndex -2-1  0 1 2 3
       *        |_|P|_||_|_|_|_|
       *        |_|_|P||_|_|_|_|
       *        |_|_|_||X|_|_|_|
       *        |_|_|_||_|X|_|_|
       */

      for (var colIndex = 2 - size; colIndex < size; colIndex++) {
        if (this.hasMajorDiagonalConflictAt(colIndex)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(projectedColIndexAtRow0) {
      var size = this.get('n');
      // If the projected Column exceeds the size of the matrix
      // we need to set the starting rowIndex and colIndex in a position where the diagonal covers at least 2 elements
      var rowIndex = (projectedColIndexAtRow0 >= size) ? projectedColIndexAtRow0 - size + 1 : 0;
      var colIndex = (projectedColIndexAtRow0 >= size) ? size - 1 : projectedColIndexAtRow0;
      var counter = 0;

      while (rowIndex < size && colIndex >= 0) {
        counter += this.get(rowIndex)[colIndex];
        if (counter > 1) {
          return true;
        }
        rowIndex++;
        colIndex--;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      /*
       *  The colIndex is set to 2*size - 3 (size === n) because we need to begin right
       *  of the last column so that hasMinorDiagonalConflictAt() can cover the entire board
       *
       *         4x4 board Projected
       * colIndex 0 1 2 3  4 5 6
       *         |_|_|_|_||_|P|_|
       *         |_|_|_|_||P|_|_|
       *         |_|_|_|X||_|_|_|
       *         |_|_|X|_||_|_|_|
       */

      var size = this.get('n');
      for (var colIndex = 2*size - 3; colIndex >= 0; colIndex--) {
        if (this.hasMinorDiagonalConflictAt(colIndex)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
