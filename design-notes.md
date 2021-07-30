Minimal VP:
- randomly mashes together stuff in the DB (as many times)
- not the same dinners every day (lunchs, bfast OK)
- create a summation of all the ingredients + quantites of all recipes

Moderate VP:
- Reroll specific foods in a week's plan
- min amount of ingredients
- [optional] Not the same as last week + record what was had last week
- Consider the ingredients

Ideal product :
- Rating system integrated, weighted recipes
     - generates X weekly plans, allow user to mash them together
- easy way to edit recipes (ex. not in google sheets)


======
## DESIGN
======
1. Weekly meal generator:
Backend
Inputs - none
output -  list of list of meal names OR objects {type and name}
ex. [ [chicken, cereal, toast], [...], [...] ]

1. go meal at a time [B/L/D], pick 7 (for each day of the week)
randomly selected + not already picked

ALSO make anonymous meals -- how many??

[
  [cereal, sammich, chicken dinner ], #monday
  [egg sammich, soup, tofu]. #tuesday
  ....
]

Format meals to JSON obj
backend
inputs = list of list of meal names
ex. [ [chicken, cereal, toast], [...], [...] ]

output:
nice json object
ex.

```json
{
  Monday :
    [
       {
          name : chicken,
          ingredients : [...]
        },
        { ... },
        { ... },
    ],
  Tuesday :
    [
      {
```

Summation of ingredients algo
Backend
Input = [recipe names...]

map over the input, mash the ingredients tgt
