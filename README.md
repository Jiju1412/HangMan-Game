## KNOWN ISSUES

There are several "real world" problems with the starter code. You do **NOT** have to fix them.

* Player can select a letter, even though the game hasn't started
* UI is NOT mobile responsive

## TODOS

Here are some general suggestion for how to implement the app.

1. Setup the game with a `word bank`, `max number of chances`, and `other variables` (done!)

2. Randomly select a word from the word bank

3. Display the selected word as dashes `_ _ _ _` 

    * UI: Output the selected word as dashes
    * LOGIC: Keep track of which letters are guessed vs. not guessed.  
        * **Example:** In `J _ V _ S C R _ P T`, the letters `A` and `I` remain guessed

4. Allow user to choose letters.

    * LOGIC: if letter is in word, then: 
        * output message; and 
        * replace its position in the `_ _ _ _`
    * LOGIC: if lettter incorrect, then:
        * output message, 
        * change to next image; and,
        * reduce chances
    * UI: disable the letter button that was pressed (so the user cannot select the letter again)

5. Implement Game Over conditions:

    * LOGIC: if chancesRemaining = 0, display error message and do game over
    * LOGIC: if word guessed, display win message and do game over
    * UI:  disable all letter buttons

6. Game reset: 

    * If user presses START GAME again, reset all the UI and variables to their default state

7.  Save the game
    
    * Save the `selected word` and `chances remaining` to localstorage. 

8. Done, submit to dropbox!

## HELPFUL RESOURCES

1. Creating a new array of a specific size: https://stackoverflow.com/a/34937412

2. Intializing an array with a specific set of values: https://www.w3schools.com/jsref/jsref_fill.asp

3. Outputting an array as a string, separated by a delimiter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join

## ATTRIBUTION

* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"  title="Flaticon">www.flaticon.com</a></div>

