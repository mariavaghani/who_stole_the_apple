# who_stole_the_apple

# Background and Overview

Welcome to the game where we would steal some apples and exercise our algorithmic thinking along the way. The game takes place in a garden / an abstract environment where a mischievous fox is trying to sneak around the obstacles, steal some apples, crops, or vegetables, and escape into a hole.

The game play area would have three main components: a **toolbox** of methods, **work area**, and the **board**. 
The **toolbox** is the collection of tools that a player could use in order to create their algorithm. On the interface these would be draggable boxes that a player could put into the work area. The tools would have different functions like “up”, “down”, “left”, “right”, depending on a level there would be additional boxes containing logical operators, push movements, etc.

The **work area** is the area where the player would drag tool blocks into. The order, in which the player would arrange the blocks, would affect what would happen on the board. Work area would also have a “run” or a “play” button, that a player would press once the algorithm is complete and ready for testing.

The **board** is where the supposed magic would happen. The board would have a character or a peg at the origin. There also would be blocks with obstacles, poles, “enemies”, walls, and depending on a level “movable” blocks that a character would need to clear to get to the target. The goal of the algorithm is to make the character to reach the target cell on the board. 

Initial levels may be just with the basic moving arrows to get accustomed to the mechanics. Other level may need to utilize conditional logic, other may require a character to move another block out of the way. Another level may have moving components that would require a character to make a certain number of moves before entering that block.

The entire game would be on one workplace, but the toolbox would get different tools for each level, and the board would have a different challenge, all revolving around creating a moving algorithm to solve it.

# Functionality and MVPs

In "Who Stole The Apple?", users will be able to:

- Drag tool blocks into a work area;
- Connect tool blocks to create a sequence
- Re-connect blocks in a different sequence after placing them in a work area
- Execute the sequence of block by pressing a button
- Have a character to perform the sequence of events based on instructions given in the work area
- Win a level by having the character reach the target when the assests are collected


In addition, this project will include:

- Ability to mute/unmute the sound
- Run the sequence using keyboard shortcuts
- An animated tutorial that guides a player through the first basic level

