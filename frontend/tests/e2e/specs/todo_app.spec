# Todo Web App Acceptance Tests

## Adding New Todo Item to Empty Todo List
* When I go to the app, I should see an empty todo form
* When I write buy some milk to text box and click to add button
* Then I should see buy some milk item in ToDo list

## Adding A Second Item To Todo List With One Item
* When I go to the app, I should see a todo list with one item
* When I write enjoy the assignment to text box and click to add button
* Then I should see enjoy the assignment in ToDo list below buy some milk

## Marking A Todo Item As Done
* Given ToDo list with buy some milk item
* When I click on buy some milk text
* Then I should see buy some milk item marked as done

## Removing Done Mark From A Todo Item
* Given ToDo list with buy some milk item marked as done
* When I click on text
* Then I should see buy some milk item not marked as done

## Deleting Items To Get An Empty List
* Given ToDo list with rest for a while item
* When I click on delete button next to rest for a while item
* Then List should be empty

## Deleting One Item Out Of Two Items
* Given ToDo list with rest for a while and drink water item in order
* When I click on delete button next to rest for a while
* Then I should see drink water item in ToDo list
