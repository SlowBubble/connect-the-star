
# m1a
- Start with index.html and main.js
- Have 2 url query params: vertices and jump and solution
  - Default to 5 vertices and a jump of 2 and solution is false
- Using those 2 params and a canvas, generate dots evenly spaced around a circle of radius 3 inches.
  - Label the dots from 0, 1, .. to n-1.
- Below the circle, generate the instruction for how to connect the dots
  - E.g. for 5 vertices, it will be  0-->2-->4-->1-->3-->0
  - E.g. for 6 vertices and a jump of 2, it will be  0-->2-->4-->0
  1-->3-->5-->1
  - Have a general algorithm that works for a general number of vertices and a general jump
- If solution is true, draw the lines that connect the dots.

# m1b
- Create a separate printable version (2x2 things per page) stars per page in print.html (with the instruction as before and without solution)
  - Iterate thru these (vertices, jump) combinations:
    - (5,2)
    - (6,2), (6,3)
    - (7, 2), (7, 3)
    - (8, 2), (8, 3), (8, 4)
    - (9, 2), (9, 3), (9, 4)
    - (10, 2), (10, 3), (10, 4), (10, 5)
    - (11, 2), (11, 3), (11, 4), (11, 5)
