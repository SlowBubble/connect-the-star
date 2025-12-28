
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
