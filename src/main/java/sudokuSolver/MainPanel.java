package sudokuSolver;

import sudokuSolver.models.Sudoku;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MainPanel extends JPanel implements ActionListener {

    private SudokuPanel sudokuPanel;
    private ButtonPanel buttonPanel;
    private Sudoku sudoku;

    public MainPanel() {

        //set variables
        buttonPanel = new ButtonPanel(this);
        sudokuPanel = new SudokuPanel();

        //Layout and borders
        setLayout(new BorderLayout());
        sudokuPanel.setBorder(new EmptyBorder(50, 70, 50, 70));
        buttonPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        this.add(BorderLayout.CENTER, sudokuPanel);
        this.add(BorderLayout.SOUTH, buttonPanel);
    }

    public void actionPerformed(ActionEvent event) {
        if (event.getSource() == buttonPanel.checkButton) { check(); }
        else if (event.getSource() == buttonPanel.solveButton) { solve(); }
        else if (event.getSource() == buttonPanel.nextButton) { newPuzzle(); }
    }

    private void check() {
        sudoku = sudokuPanel.readScreen();

        if (sudoku.isSolved()) {
            String[] options = {"Next puzzle"};
            int successPanel = JOptionPane.showOptionDialog(this,
                    "Congratulations, you have solved this puzzle!",
                    "Check solution",
                    JOptionPane.DEFAULT_OPTION,
                    JOptionPane.PLAIN_MESSAGE,
                    null,
                    options,
                    null);
            if (successPanel == JOptionPane.DEFAULT_OPTION) { newPuzzle(); }
            // TODO other options

        } else {
            JOptionPane.showMessageDialog(this,
                    "There is a mistake somewhere.");
        }
    }

    private void solve() {
        sudoku = sudokuPanel.readScreen();

        try {
            if (sudoku.getSolution() != null) {
                sudoku = sudoku.getSolution();
                this.sudokuPanel.setScreen(sudoku);
            } else {
                JOptionPane.showMessageDialog(new JFrame(),
                        "There is more than one solution.",
                        "Warning",
                        JOptionPane.WARNING_MESSAGE);
            }
        } catch (IllegalArgumentException e) {
            JOptionPane.showMessageDialog(new JFrame(),
                    "There are no solutions.",
                    "Warning",
                    JOptionPane.WARNING_MESSAGE);
        }
    }

    private void newPuzzle() {
        this.sudokuPanel.setScreen(Sudoku.getRandomPuzzle());
    }

}