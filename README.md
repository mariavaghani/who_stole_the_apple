# Who Stole The Apple

# Background and Overview

Welcome to the game where we would steal some apples and exercise our algorithmic thinking along the way. The game takes place in a garden / an abstract environment where a mischievous fox is trying to sneak around the obstacles, steal some apples, crops, or vegetables, and escape into a hole.

The game play area would have three main components: a **toolbox** of methods, **work area**, and the **board**. 
The **toolbox** is the collection of tools that a player could use in order to create their algorithm. On the interface these would be draggable boxes that a player could put into the work area. The tools would have different functions like “up”, “down”, “left”, “right”, depending on a level there would be additional boxes containing logical operators, push movements, etc.

The **work area** is the area where the player would drag tool blocks into. The order, in which the player would arrange the blocks, would affect what would happen on the board. Work area would also have a “run” or a “play” button, that a player would press once the algorithm is complete and ready for testing.

The **board** is where the supposed magic would happen. The board would have a character or a peg at the origin. There also would be blocks with obstacles, poles, “enemies”, walls, and depending on a level “movable” blocks that a character would need to clear to get to the target. The goal of the algorithm is to make the character to reach the target cell on the board. 

Initial levels may be just with the basic moving arrows to get accustomed to the mechanics. Other level may need to utilize conditional logic, other may require a character to move another block out of the way. Another level may have moving components that would require a character to make a certain number of moves before entering that block.

The entire game would be on one workplace, but the toolbox would get different tools for each level, and the board would have a different challenge, all revolving around creating a moving algorithm to solve it.

# Functionality and MVPs

### In "Who Stole The Apple?", users will be able to:

- Drag tool blocks into a work area;
- Connect tool blocks to create a sequence
- Re-connect blocks in a different sequence after placing them in a work area
- Execute the sequence of block by pressing a button
- Have a character to perform the sequence of events based on instructions given in the work area
- Win a level by having the character reach the target when the assests are collected


### In addition, this project will include:

- Ability to mute/unmute the sound
- Run the sequence using keyboard shortcuts
- An animated tutorial that guides a player through the first basic level

# Wireframes

![Wireframe_1 0](https://user-images.githubusercontent.com/54246143/136493945-bedd2991-35ff-464d-8dc9-5b2ca23cb671.jpg)

[](<mxfile host="app.diagrams.net" modified="2021-10-08T04:34:02.666Z" agent="5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36" version="15.4.3" etag="tgQXicVT-EC64mPFigfg" type="github"><diagram id="C5RBs43oDa-KdzZeNtuy" name="Page-1">7VvZcuI4FP0aHpPywpZHIEt3TzpDN5lkXgUWoEG2GFmE0F/fV7a8KoCd4HZCqEpVrGtZtnSOro6OTcMeuM83HC3n35mDacMynOeGfdmwLNOybPgnI5sw0u2YYWDGiaMqJYER+YVV0FDRFXGwn6koGKOCLLPBCfM8PBGZGOKcrbPVpoxm77pEM6wFRhNE9egjccRc9cLqJPEvmMzm0Z3N9kV4xkVRZdUTf44ctk6F7KuGPeCMifDIfR5gKgcvGpfHr5tHerto33z74f+P/un/dX/3cBY2dl3mkrgLHHvi1U3/Wkyvvzw0//t3Obz+sTZueuNvZ+oS4wnRlRqvIeY+81SPxSYaRn9NXIo8KPWnzBMjdQYGoY8omXlwPIGnwxwCT5gLAgj01AnBlhCdzAl1btGGrWQffIEmi6jUnzNOfkGziMIpEwJwmgtFJqudqTGSV0LYgCjHPtQZRgNjxqFb5AtVZ8IoRUufjIMHllVcxGfE6zMhmBs1xFaegx1VipEOCoKzRcwdeX1BOBRscjTwc4qMCp4bzFws+AaqqLMx0zbR5FPldUJcs61i8zRp7a6aMGqyzOK249v9hMmFvBkMQnI/O3e/ZsH7ASKZ2yEKwHtI4L4cRj9NQzhIdTUJBeQsQVRTI+odcrFGUxhpkaIkxVOxlZD+Ek2IN7sN6lw2k8hP1VMZYnDtlAZkmBPHwV5AFoEECvkkGbJkxBPBULT68AcDNjDOW40WPNAAymZShj9ZnYsB84BXiAQEwkDWNZaEfYFaO6ftfmptsoiVRTZNpAykZfGz9EQzZ54k493KHUPaODYkd2SUuXCpOqwK75ZVM962hveVi4i8rOc4kKP9E+AHBbzTrRnwpga4hjAlgX5Qo2G+uLbugd8FIGVzEd73kg6XZ6bGCVvnhP0C/hSNMR0ynwjCZPs8rJvjRV1Z2zSaxVDdsfy/CdSWnrVXfDJHvkzcILsWMLzB0RHO58pANevOzW0N1ZFYObKbBVW/cVL9h1P9Zk712+1qVb+ZU/129/2q/s52ph6rbiyYdtqFafZedgBdDcsePL10byzjOywlR4fkQQVhabxr3wFcnAThwUEtqvKr0oOm7hd+hcRvXAEawVJrGfdMlj3OZGtHNqPTGqhZFcbduhO1qXttN1iuuCPsEg9xCfg9WmDdJP7o+FYFaf2SP3qAXdkYe05PvnCB0pgyqbb7EFJy3DTC4jWh0cq1Ry9nlz/szHA0dTAds/VVEugHATgRMaW02vYZbEvxfshgfzHDBXZz8ml3AvsSkBxTJMhT9r3TDm0+lMRNdLllZHW5ZdjZJsJOqqvSL3rKNhSOgtbQwax63fsbcjbFvs90uX7aYVa/w7TzO76iO8yOsZfEL2ww7WaBDWbnfWwwTd22HCGKVMb9hGtbPHk/zsbS1F1KDb3PvtMoD2vR/WNlWw3dpfxUiiVC7F1LFjOX6TuvlCx2riGrk3uWqiWLbjRue015EizVC5aW0c3QofCHMJa5Y5HZrlharQ/0IYzuo44Ex1h/efNZFEunML3ejWLRvdEBEcenOQ/qgJfHuXYL3NLtUkja4vg+W6sZ6No/frF0yxSUvVzFLWPAnBPgBwa88Icx1SGuG6oDGBNxhM5B3VjbrxRjh8NaNzQ1kD+9wVAe11ZBGVaVw2Dp3t8DQOQc4wJdHYrt2jOxbv/9vRLLlbQXevJd5a2cBydECyN6UXu+LWf9sWUw1uXMvdgXNOu3+tTY7nX6Iiz3Wn0KZ0mltK3RVA/0Rtcvfp8TE8bKNlHU9Ws19zS0xfXTGjrLv3HKtcOmUx9XYhxaunFonJ9HwCd0Dcy4VCLYk3bGypIL1/A+mixmAX8HjDIO5z2WGJDK7baK54RofqmfXKrHasQ/Pytu1J29kVERMf8YXLp5VhyrSD99VLAOM/ujb3L/OHS6Z0ahF3KBR1u9z5Qcz6Oqq+AiDn6s0XdjXcpFfyMxNAJs40rxdeLiMEyxsy5+lKTfwhUoJj+4DqsnP1u3r34D</diagram></mxfile>)

# Technologies, Libraries, APIs

- Vanila JS to create animations and game logic
- CSS for styling
- HTML canvas 

# Implementation Timeline

### Friday Afternoon & Weekend

- Game design, outline classes, inheritance structure, backend methods
- Create the frontend mockup, create a basic frontend for testing the backend
- Create design of the first three levels 

### Monday

- Continue creating the backend and testing the gameplay on the frontend
- Add event listeners to the blocks, make them draggable
- Make blocks to stick-snap to each other when being placed on the work area

### Tuesday

- Start working on the frontend and animations
- Add character design, make the character to move parts of the body

### Wednesday

- Keep working on frontend, animations, and add levels 2 - 3

### Thursday Morning

- Deploy the game on github pages
