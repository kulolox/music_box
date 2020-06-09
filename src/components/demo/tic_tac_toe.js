import React from 'react';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  return (
    <button
      style={{
        height: 34,
        width: 34,
        display: 'block'
      }}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <>
        <div style={{ display: 'flex' }}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div style={{ display: 'flex' }}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div style={{ display: 'flex' }}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </>
    );
  }
}

export default class Tic extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true,
    stepNumber: 0
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(prevState => ({
      history: history.concat([
        {
          squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !prevState.xIsNext
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Board
            squares={current.squares}
            handleClick={i => this.handleClick(i)}
          />
        </div>

        <div style={{ marginLeft: 20 }}>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
