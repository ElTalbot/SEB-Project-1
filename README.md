# General Assembly

### Project 1 (Going Walkabout)

</br>

Going Walkabout is a game based on the well-known game Frogger. The concept for my game was based around an Australian theme where my little Joey had to be reunited with his mother and sister.

## Concept

In order for Joey to reach his family he had to be navigated past a pack of dingoes, use the log to get across the Billabong and dodge the incoming traffic of pick-up trucks. If Joey collides with a dingo or truck or falls in the Billabong he will return to the start and the player will lose a life.

## Game Link

[Going Walkabout](https://eltalbot.github.io/SEB-Project-1/)

## Technology Used

### HTML

- **Welcome Page** including title, description and start button
- **Successful game** boilerplate with a Play Again button
- **Game Over** boilerplate with Try Again button
- **Audio** element set to autoplay

### CSS

- Grid creation (7 rows by 9 columns - 62 cells in total)
- Layouts and styling for boilerplates
  - Welcome
  - Game over
  - Successful game
- `.hidden` class to hide and show appropriate boilerplates where necessary
- Scoring, lives and mute button layout
- Adding objects including
  - Joey
  - Kangaroo
  - Dingo
  - Truck
  - Water
  - Log
  - Food

### JavaScript

- Audio controls (mute/play audio)
- `createGrid ` and `obstacleCollision` function
- `classList.add` and `classList.remove` to manage objects
- Local storage to access high scores
- Current score and lives control
- `handleKeyDown` event to manage Joey’s movement
- `setInterval` to move obstacles
- Event listeners to start, reset and play again

### Figma

- Wireframe the layout
- Pseudocode the potential working of the game

## Time Frame

This was a solo project that was to be completed in the 4th week of our bootcamp, it was our first project and designed to put what we learnt about JavaScript, CSS and HTML to practice.

## Instructional Team Brief

We had a choice of a number of grid based games including

- Battleships
- Connect 4
- Frogger
- Mastermind
- Minesweeper
- Pac-man
- Snake
- Space-invaders
- Tetris
- Ultimate tic-tac-toe

I decided to use the game Frogger as my inspiration and put my own spin on it to make it slightly different to the original game - I made sure to stick to the brief which can be seen in the screenshots below

![Frogger Introduction Brief](<README Assets/Screenshot 2024-02-23 at 17.31.30.png#brief>)

![Frogger requirements, challenges and tips](<README Assets/Screenshot 2024-02-23 at 17.31.37.png#brief>)

## Planning, Process and Implementation

### Research and Settling

The initial brief as seen below; outlines the deliverables, challenges and suggested ways to start the project.

![The Game - Project 1 Introduction Brief](<README Assets/Screenshot 2024-02-24 at 20.42.03.png>)

![The Game - Requirements, enhancements and challenges](<README Assets/Screenshot 2024-02-24 at 20.42.10.png>)

With this brief and minimal experience in programming I took the time to look at the briefs provided for the potential games available to build.

I did not take this lightly as I wanted to make sure that I chose a game that would both challenge me but was within my scope of capability - after talking to my instructor I chose to do Frogger over Connect 4.

### Pseudocode

My next step was to pseudocode the game; I am new to this process and tried to use it to help me plan how I wanted the game to work in a simple, readable format.

This also helped me get an idea of the theme and look hoped for with the game - I started with wireframing the layout and defining the potential framework of the game including obstacles, objects and possible enhancements (see screenshots below)

![Game Explainer](<README Assets/Screenshot 2024-02-24 at 21.37.04.png>)

![MVP Game Wireframe](<README Assets/Screenshot 2024-02-24 at 21.38.02.png>)

I then used the wireframe to define the potential functions necessary to perform the actions required for the game including the journey of the player, the pressing of a button and the browser opening.

![Pseudocode Game](<README Assets/Screenshot 2024-02-24 at 21.37.38.png>)

### Initial Build

#### <ins>First Step - Grid Creation</ins>

The class `.grid` in my HTML was in place to hold the game.

![.grid - HTML](<README Assets/Screenshot 2024-02-25 at 19.59.29.png>)

CSS was used to design and style the game.

![Grid - CSS](<README Assets/Screenshot 2024-02-25 at 19.57.21.png>)

![Individual divs CSS](<README Assets/CSS div style.png>)

A function in JavaScript created the game, by defining the height and width of the desired grid enabled a for loop (as seen here) to create each individual cell, add the cell into the `.grid` and push the cell into the empty cell array.

![Grid Creation - JavaScript](<README Assets/Screenshot 2024-02-25 at 19.56.46.png>)

#### <ins>Second Step - Adding Objects</ins>

`.grid div.kangaroo` is an example of the CSS code that added the objects of the game into the grid.

The JavaScript function as seen here examples the process of adding and removing the objects of the game - by taking the position of a cell and either adding or removing the `classList` as defined in the CSS will enable this action.

![Adding and Removing Objects](<README Assets/Adding and Removing Objects.png>)

`handleKeyDown` seen in this screenshot is a function enabling the movement of the Joey around the cells of the grid using the arrow keys on a keyboard

![Using the arrows  to move the Joey](<README Assets/Handle Key Down.png>)

#### <ins>Third Step - Player and Obstacle Collision </ins>

To implement an action when a collision between the player and an obstacle occurs I used a control flow that identified when the `cells[joeyCurrentPosition].classList.contains("truck)` for example.
If this was to happen then the function would carry out the defined actions as seen in the screenshot below

![Obstacles Collision Code](<README Assets/Obstacle Collision.png>)

#### <ins>Fourth Step - Total Score and High Score </ins>

There are 2 ways to win points; 1. landing on the grass and 2. reuniting Joey with his family - although a simple concept this dual point scoring I found a challenge to put into practice. By creating a `playerScore` variable I was able to total the score accordingly.

Using `localStorage.getItem` and `localStorage.setItem` the players high score was able to be displayed and updated accordingly (see screenshot below)

![Total Score and High Score Code](<README Assets/Scoring.png>)

### Win, End and Reset Game

Identifying the potential user journey through the game was key for me to be able to build appropriate user flows.

1. Win game - if the player successfully reunites the Joey with his family
2. End game - if a player loses all their lives before reaching the kangaroo

Both these have different user flows therefore, using a `.hidden` class in CSS and a conditional that identifies whether the player has won the game or lost meant I was able to toggle the appropriate overlay. This enabled the required functions, whether it be update the high score, reset the onscreen lives, score displays or reset the objects to their starting positions.

![Reset Game Code](<README Assets/Reset game.png>)

## Challenges

I came across a number of challenges during this project, a couple that come to mind include the `setInterval` function that enabled the movement of the objects.

After identifying that the `setInterval()` function was one way to achieve this, the next step was to recognise what exactly needed to happen during this interval.

1. the obstacle needed to be removed and added
2. this needed to happen along an array of cells
   To do this a control flow and the use of a `.map` method through an array of positions meant the obstacles within the game would automatically generate.

At first the obstacles were sporadic and appearing in random places and by using the `cell.innerText = i;` I was able to identify the specific cell positions required to prevent the random positioning of the obstacles.

The nature of my obstacles meant that there was a logical direction for them to move in and due to this I had to trial the direction. To do this I changed both the array positions from `[11, 13, 15, 17]` to `[17, 15, 13, 11]` for example and changed `return (element += 1)` to 'return (element -= 1)` which both in turn successfully changed the direction.

![Obstacles movement code](<README Assets/Obstacle Move.png>)

Another challenge was within the obstacle collision function - I had 3 obstacle arrays, 2 of which when the Joey collided would reset the Joey to its starting position.

The challenge came with the array of cells containing the log - instead of the Joey returning to the start when he collides with the log, the difference here is the Joey needs to use the log to get over the Billabong so therefore, the Joey needs to be reset to the start when he misses the log and lands in an empty cell.

After realising that what I wanted to achieve was the exact opposite of the other obstacle collisions, I was able to identify the appropriate operator.
Using the same `if ()` statement yet adding the bang operator `!` and the `&&` logical operator meant I was able to reverse the logic and return the Joey to the start when the any cell in the Billabong array did not contain the log `&&` contained the Joey.

![Log Obstacle Code](<README Assets/Log Obstacle.png>)

## Wins

I found my first project quite a challenging process but looking back the biggest win was the audio element.

With minimal experience using audio within JavaScript I was concerned about the time it would take me to successfully implement the mute and play audio function.

![Audio mute and play code](<README Assets/Audio.png>)

Being able to start audio on page load was important to me to create a more authentic, inclusive experience. However, the option to mute the audio was an added bonus, and using onscreen`muteButton` and `playButton` event listeners enabled this alongside the class `.hidden` to hide and remove the appropriate images as seen here

![Audio mute and play image](<README Assets/Audio Buttons.png>)

## Key Learnings/Takeaways

#### <ins>The importance of Pseudocode</ins>

Deciding on the Frogger game, my next step to get a better concept of my project I decided to complete wireframes using the design tool Figma.

This process meant I was able to identify the different steps required to build the game - _***as seen in the pseudocode section above.***_

However, even though this gave me a starting point, on reflection I should have spent more time at each step defining more specific JavaScript code required to make the game work; be it a function, control flow statement or even an event listener.

The actual detailed syntax at this point wouldn’t necessarily be needed but defining the basic building blocks would have helped lessen the challenges and stress going forward.

#### <ins>Project Management</ins>

Although I have some experience of stand ups, I found my day to day planning quite tricky to manage - I wasn’t utilising them effectively and wasn't using them to help me shape the structure of my day.

Initially I went into each stand up more prepared to discuss the challenges of the previous day and although this allowed me to reflect and learn, I found it left me ill-prepared for the day ahead.

The first hour of my day was spent re-grouping and trying to plan the day ahead -
over the course of the project this improved, on reflection I would approach the stand up better prepared and a better idea of what I wanted to achieve by the end of the day.

#### <ins>Prioritising</ins>

A greater familiarity with HTML and CSS meant I was more inclined initially to focus on these parts of the project - and although basic HTML was required to begin, I feel this hindered my initial progress.

On reflection, prioritising each step of the process would have meant the more challenging aspects of the project could have been tackled earlier, reducing the stress and time constraints in the latter part of the process.

#### <ins>Asking for help</ins>

Although a solo project, my experience in this project has highlighted the importance of support and having the confidence to ask for help - facing a challenge and independantly looking for a solution is an incredibly important skill.

However, being able to talk through the challenge with fellow students or instructors can be useful to help see things from a different perspective.

### Bugs

There have been a couple of bugs mentioned in the challenges section above such as, the `setInterval()` function that moved the obstacles but another includes the nature of the start button and its position on the game board.

Pressing the reset button above the game board reset the objects to their original position but also increased the speed of each object every time the button was pressed, which was not ideal.

Following the user flow and recognising that the event listener for the reset button was the same as the start button meant that the function placed on the reset button was the same as the start button.
This button starts the interval on the obstacles therefore, setting their speed and to return to the start button the interval is cleared and therefore, reset.
The issue was that using this same function on the reset button meant that every time this button was pressed the speed accumulated because the there was no `clearInterval` function to reset this speed.

To mitigate this I decided to remove the reset button.

### Future Improvements

I believe with every project there is always something to learn and to improve, learning along the way and feedback from others is how I hope projects such as these can progress and develop with time.

This project in particular the future improvements at the forefront of my mind include:

1. Sound Effects - although there is a play/mute background audio element on my game, it would have been an extra bonus to have been able to include sound effects for when Joey collides with obstacles or when Joey reunites with his family.

2. Levels - the opportunity for the player to progress up levels of difficulty would have given the game a more interactive feel to it. These difficulties may be, increasing the speed of the obstacles or building the game so more lines are added with more obstacles.
   The concept of the game would have to be reassessed for this level up to make sense being that Joey reunited with his family but with more time and further pseudocode and wireframing this improvement would have been ideal.

3. Dynamic Family Movement - The Joeys family is a static element sitting on the last line of the game and it would have brought an added dynamic to the game if they automatically moved forwards and backwards along the row.

4. Styling - For me the aesthetics and layout is an incredibly important part of the game - the key for me is that when a user lands on my game I would like them to not only have fun but have a sense of comfort and wish to stay and play the game.

Therefore, managing my time better and being able to spread my focus amongst all parts of the process may have resulted in a more professional and engaging look.

Another improvement under styling for me starts by looking behind the curtain at the styling and organisation within my code - this being a solo project meant that the structure of the code only really needed to be understandable by me but collaborative projects would require a more organised code so others can easily understand and edit the code.
