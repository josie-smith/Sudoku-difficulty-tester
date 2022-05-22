import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './grid';
import Difficulty from './difficulty';
import getNextPuzzle from './graphQlConnector';

class Game extends React.Component<{}, {
  currentGrid: (number | undefined)[][],
  currentPuzzle: (number | undefined)[][],
  difficulty: Difficulty
}>
 {
  constructor(props: {}) {
    super(props);
    const difficulty: Difficulty = Difficulty.Random;
    const puzzle: (number | undefined)[][] = getNextPuzzle(difficulty);

    this.state = {
      currentPuzzle: puzzle,
      currentGrid: puzzle,
      difficulty: difficulty
    };
  }
  
  handleCellChange(row: number, column: number, value: number | undefined) {
    let grid: (number | undefined)[][] = copy(this.state.currentGrid);
    if (!value) {
        grid[row][column] = value;
    } else if (value >=1 && value <= 9) {
        grid[row][column] = value;
    }

    this.setState({
      currentGrid: grid
    });
  }
  
  reset() {
    this.setState({
      currentGrid: copy(this.state.currentPuzzle)
    });
  }

  solve(puzzle: (number | undefined)[][]) {
    console.log('Solving...');
  }

  checkSolution(puzzle: (number | undefined)[][]) {
    console.log('Checking...');
  }

  nextPuzzle() {
    const puzzle = getNextPuzzle(this.state.difficulty);

    this.setState({
      currentPuzzle: puzzle,
      currentGrid: puzzle,
    });
  }

  changeDifficulty(difficulty: Difficulty) {
    this.setState({
      difficulty: difficulty
    })
  }

  render() {
    let difficultyButtons: JSX.Element[] = [];
    Object.values(Difficulty).forEach((difficulty, i) => {
      difficultyButtons.push(
        <button key={i} disabled={this.state.difficulty === difficulty} onClick={() => this.changeDifficulty(difficulty)}>
          {difficulty}
        </button>
      );
    });

    return (
      <div className="game">

        <div className="grid">
          <Grid 
            puzzle={this.state.currentPuzzle}
            grid={this.state.currentGrid}
            handleCellChange={(row, column, value) => this.handleCellChange(row, column, value)}
          />
        </div>

        <div className="game-info">

          <div className="puzzle-controls">
            <button onClick={() => this.reset()}>
              Reset
            </button>
            <button onClick={() => this.checkSolution(this.state.currentGrid)}>
              Check solution
            </button>
            <button onClick={() => this.solve(this.state.currentGrid)}>
              Solve
            </button>
            <button onClick={() => this.nextPuzzle()}>
              Next puzzle
            </button>
          </div>

          <div className="difficulty-controls">
            {difficultyButtons}
          </div>

        </div>
      </div>
    );
  }
}

function copy(array: any): any {
  return JSON.parse(JSON.stringify(array));
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);