# CSE-134B-HW5

Path to the SSG exercise folder: `ssg-exercise/`
Two pages to preview: Home (`src/pages/index.astro`) and About (`src/pages/about.astro`)
Install, build, and preview commands are in `ssg-exercise/README.md`.

# Design Note
A visitor wants to get a useless random fact on the page instead of being taken to another site. 
When they click a new fact they cannot spam another one. A GET request is sent to the Useless Facts API and 
if it's successful it displays a new fact. This means that the click handler of the new useless fact gets a response,ok  upon success and confirms that a text is string before putting the useless fact into a paragraph on screen. While a visitor is waiting they get the status that a fact is loading. On success they receive the fact, if it fails they will receive an error that a fact could not be loaded; however the button is still there so 
they can make another attempt.

A toggle size button is also there to make the useless fact and surrounding buttons bigger for readability. 