DemoApp.JavaDevelopmentScreen = Core.extend(Echo.ContentPane, {

    $static: {
        NUMBER_GUESS_EXAMPLE: 
            "import nextapp.echo.app.*\n" +
            "\n" +
            "/**\n" +
            " * Guess-a-number Tutorial Application.\n" +
            " */\n" +
            "public class NumberGuessApp extends ApplicationInstance {\n" +
            "\n" +
            "    private Window window;\n" +
            "    \n" +
            "    /**\n" +
            "     * Displays a congratulatory message to the user when s/he has guessed\n" +
            "     * the correct number.\n" +
            "     * \n" +
            "     * @param numberOfTries the number of tries it took the user to guess the\n" +
            "     *        correct answer.\n" +
            "     */\n" +
            "    void congratulate(int numberOfTries) {\n" +
            "        window.setContent(new CongratulationsPane(numberOfTries));\n" +
            "    }\n" +
            "    \n" +
            "    /**\n" +
            "     * @see nextapp.echo.app.ApplicationInstance#init()\n" +
            "     */\n" +
            "    public Window init() {\n" +
            "        window = new Window();\n" +
            "        window.setTitle(\"Echo Guess-A-Number\");\n" +
            "        startNewGame();\n" +
            "        return window;\n" +
            "    }\n" +
            "\n" +
            "    /**\n" +
            "     * Starts a new game:\n" +
            "     * Sets content of Window to a new <code>GamePane</code>.\n" +
            "     */\n" +
            "    void startNewGame() {\n" +
            "        // Set the content to be a new GamePane.\n" +
            "        window.setContent(new GamePane());\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "/**\n" +
            " * A <code>ContentPane</code> which generates a random number and provides the\n" +
            " * user opportunities to guess it.\n" +
            " */\n" +
            "class GamePane extends ContentPane \n" +
            "implements ActionListener {\n" +
            "\n" +
            "    /** Randomly generated number between 1 and 100 inclusive. */\n" +
            "    private int randomNumber = ((int) Math.floor(Math.random() * 100)) + 1;\n" +
            "    \n" +
            "    /** The current lowest sensible guess, based on previous guesses. */\n" +
            "    private int lowerBound = 1;\n" +
            "\n" +
            "    /** The current highest sensible guess, based on previous guesses. */\n" +
            "    private int upperBound = 100;\n" +
            "    \n" +
            "    /** The number of guesses made in the current game. */\n" +
            "    private int numberOfTries = 0;\n" +
            "    \n" +
            "    /** <code>TextField</code> into which guesses are entered. */\n" +
            "    private TextField guessEntryField;\n" +
            "    \n" +
            "    /** \n" +
            "     * <code>Label</code> displaying the current \"status\".  Initially blank, \n" +
            "     * this label will inform the user whether his/her last guess was too \n" +
            "     * high, too low, or simply invalid.\n" +
            "     */ \n" +
            "    private Label statusLabel = new Label();\n" +
            "    \n" +
            "    /**\n" +
            "     * <code>Label</code> indicating the total number of guesses made so far.\n" +
            "     */\n" +
            "    private Label countLabel = new Label(\"You have made no guesses.\");\n" +
            "    \n" +
            "    /**\n" +
            "     * <code>Label</code> prompting the user to enter a new guess.  The text of\n" +
            "     * this label will change as the user makes guesses to reflect the updated\n" +
            "     * \"sensible\" range of possible guesses.\n" +
            "     */\n" +
            "    private Label promptLabel = new Label(\"Guess a number between 1 and 100: \");\n" +
            "    \n" +
            "    /**\n" +
            "     * Creates a new <code>GamePane</code>.\n" +
            "     */\n" +
            "    GamePane() {\n" +
            "        super();\n" +
            "        \n" +
            "        Column layoutColumn = new Column();\n" +
            "        layoutColumn.setInsets(new Insets(30));\n" +
            "        layoutColumn.setCellSpacing(new Extent(10));\n" +
            "        add(layoutColumn);\n" +
            "        \n" +
            "        layoutColumn.add(new Label(\n" +
            "                new ResourceImageReference(\n" +
            "                \"/echotutorial/numberguess/TitleBanner.png\")));\n" +
            "        layoutColumn.add(statusLabel);\n" +
            "        layoutColumn.add(countLabel);\n" +
            "        layoutColumn.add(promptLabel);\n" +
            "        \n" +
            "        guessEntryField = new TextField();\n" +
            "        \n" +
            "        guessEntryField.setForeground(Color.WHITE);\n" +
            "        guessEntryField.setBackground(Color.BLUE);\n" +
            "        ColumnLayoutData columnLayoutData = new ColumnLayoutData();\n" +
            "        columnLayoutData.setInsets(new Insets(20, 0));\n" +
            "        guessEntryField.setLayoutData(columnLayoutData);\n" +
            "        layoutColumn.add(guessEntryField);\n" +
            "        \n" +
            "        Button submitButton = new Button(\"Submit Your Guess\");\n" +
            "        submitButton.setActionCommand(\"submit guess\");\n" +
            "        submitButton.setForeground(Color.BLACK);\n" +
            "        submitButton.setBackground(Color.GREEN);\n" +
            "        submitButton.setWidth(new Extent(200));\n" +
            "        submitButton.addActionListener(this);\n" +
            "        layoutColumn.add(submitButton);\n" +
            "        \n" +
            "        Button newGameButton  = new Button(\"Start a New Game\");\n" +
            "        newGameButton.setActionCommand(\"new game\");\n" +
            "        newGameButton.setForeground(Color.WHITE);\n" +
            "        newGameButton.setBackground(Color.RED);\n" +
            "        newGameButton.setWidth(new Extent(200));\n" +
            "        newGameButton.addActionListener(this);\n" +
            "        layoutColumn.add(newGameButton);\n" +
            "    }\n" +
            "    \n" +
            "    /**\n" +
            "     * @see nextapp.echo.app.event.ActionListener#actionPerformed(\n" +
            "     *      nextapp.echo.app.event.ActionEvent)\n" +
            "     */\n" +
            "    public void actionPerformed(ActionEvent e) {\n" +
            "        if (e.getActionCommand().equals(\"new game\")) {\n" +
            "            ((NumberGuessApp) ApplicationInstance.getActive()).startNewGame();\n" +
            "        } else if (e.getActionCommand().equals(\"submit guess\")) {\n" +
            "            processGuess();\n" +
            "        }\n" +
            "    }\n" +
            "    \n" +
            "    /**\n" +
            "     * Processes a user's guess.\n" +
            "     */\n" +
            "    private void processGuess() {\n" +
            "        \n" +
            "        int guess;\n" +
            "        try {\n" +
            "            guess = Integer.parseInt(guessEntryField.getDocument().getText());\n" +
            "        } catch (NumberFormatException ex) {\n" +
            "            statusLabel.setText(\"Your guess was not valid.\");\n" +
            "            return;\n" +
            "        }\n" +
            "\n" +
            "        ++numberOfTries;\n" +
            "\n" +
            "        if (guess == randomNumber) {\n" +
            "            ((NumberGuessApp) ApplicationInstance.getActive())\n" +
            "                    .congratulate(numberOfTries);\n" +
            "            return;\n" +
            "        }\n" +
            "        \n" +
            "        if (guess < 1 || guess > 100) {\n" +
            "            statusLabel.setText(\"Your guess, \" + guess  \n" +
            "                    + \" was not between 1 and 100.\");\n" +
            "        } else if (guess < randomNumber) {\n" +
            "            if (guess >= lowerBound) {\n" +
            "                lowerBound = guess + 1;\n" +
            "            }\n" +
            "            statusLabel.setText(\"Your guess, \" + guess \n" +
            "                    + \" was too low.  Try again:\");\n" +
            "        } else if (guess > randomNumber) {\n" +
            "            statusLabel.setText(\"Your guess, \" + guess \n" +
            "                    + \" was too high.  Try again:\");\n" +
            "            if (guess <= upperBound) {\n" +
            "                upperBound = guess - 1;\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        // Update number of tries label.\n" +
            "        if (numberOfTries == 1) {\n" +
            "            countLabel.setText(\"You have made 1 guess.\");\n" +
            "        } else {\n" +
            "            countLabel.setText(\"You have made \" + numberOfTries + \" guesses.\");\n" +
            "        }\n" +
            "        \n" +
            "        // Update the prompt label to reflect the new sensible range of numbers.\n" +
            "        promptLabel.setText(\"Guess a number between \" \n" +
            "                + lowerBound + \" and \" + upperBound + \": \");\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "/**\n" +
            " * A <code>ContentPane</code> which presents a congratulatory message to the\n" +
            " * player when the correct number has been guessed.\n" +
            " */\n" +
            "class CongratulationsPane extends ContentPane\n" +
            "implements ActionListener {\n" +
            "\n" +
            "    /**\n" +
            "     * Creates a new <code>CongratulationsPane</code>.\n" +
            "     * \n" +
            "     * @param numberOfTries the number of tries it took the user to guess the\n" +
            "     *        correct answer.\n" +
            "     */\n" +
            "    CongratulationsPane(int numberOfTries) {\n" +
            "        Column layoutColumn = new Column();\n" +
            "        layoutColumn.setInsets(new Insets(30));\n" +
            "        layoutColumn.setCellSpacing(new Extent(30));\n" +
            "        add(layoutColumn);\n" +
            "        \n" +
            "        layoutColumn.add(new Label(new ResourceImageReference(\n" +
            "                \"/echotutorial/numberguess/CongratulationsBanner.png\")));\n" +
            "        layoutColumn.add(new Label(\"You got the correct answer in \" \n" +
            "                + numberOfTries + (numberOfTries == 1 ? \" try.\" : \" tries.\")));\n" +
            "\n" +
            "        Button button = new Button(\"Play Again\");\n" +
            "        button.setForeground(Color.WHITE);\n" +
            "        button.setBackground(Color.RED);\n" +
            "        button.setWidth(new Extent(200));\n" +
            "        button.addActionListener(this);\n" +
            "        layoutColumn.add(button);\n" +
            "    }\n" +
            "\n" +
            "    /**\n" +
            "     * @see nextapp.echo.app.event.ActionListener#actionPerformed(\n" +
            "     *      nextapp.echo.app.event.ActionEvent)\n" +
            "     */\n" +
            "    public void actionPerformed(ActionEvent e) {\n" +
            "        ((NumberGuessApp) ApplicationInstance.getActive()).startNewGame();\n" +
            "    }\n" +
            "}\n"
    },

    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            children: [
                new Echo.SplitPane({
                    styleName: "DefaultResizableLarge",
                    orientation: Echo.SplitPane.ORIENTATION_HORIZONTAL_RIGHT_LEFT,
                    separatorPosition: 270,
                    children: [
                        new Echo.Column({
                            layoutData: {
                                background: "#afcfff"
                            },
                            insets: 10,
                            cellSpacing: 10,
                            children: [
                                new DemoApp.HtmlLabel({
                                    html: this._msg["JavaDevelopmentScreen.Text.1"]
                                }),
                                new DemoApp.HtmlLabel({
                                    html: this._msg["JavaDevelopmentScreen.Text.2"]
                                }),
                                new DemoApp.HtmlLabel({
                                    html: this._msg["JavaDevelopmentScreen.Text.3"]
                                })
                            ]
                        }),
                        new Echo.ContentPane({
                            background: "#ffffff",
                            foreground: "#002f00",
                            font: {
                                typeface: ["Courier New", "Courier", "Monospace"]
                            },
                            children: [
                                new DemoApp.SourceView({
                                    blockCommentColor: "#004f7f",
                                    lineCommentColor: "#7f007f",
                                    code: DemoApp.JavaDevelopmentScreen.NUMBER_GUESS_EXAMPLE
                                })
                            ]
                        })
                    ]
                }),
                new Echo.WindowPane({
                    styleName: "Default",
                    positionX: "100%",
                    positionY: "100%",
                    width: 300,
                    resizable: false,
                    closable: false,
                    title: this._msg["JavaDevelopmentScreen.SourceDescription.Title"],
                    insets: 10,
                    backgroundImage: "image/fill/LightBeigeLine.png",
                    children: [
                        new Echo.Label({
                            text: this._msg["JavaDevelopmentScreen.SourceDescription.Message"]
                        })
                    ]
                })
            ]
        });
    }
});
