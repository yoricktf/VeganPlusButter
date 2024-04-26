# [VeganPlusButter](https://vegan-plus-butter.vercel.app/)

[![Website](https://img.shields.io/website?label=VeganPlusButter&style=flat-square&url=https%3A%2F%2Fvegan-plus-butter.vercel.app%2F)](https://vegan-plus-butter.vercel.app/)

A recipe/blog website built using `nextJS` Pages Router, `NextAuth`, `cloudinary`, `TipTap` and hosted on `Vercel`. Admin users are able to post, edit and delete recipes/posts. Non-admin users can sign in with Google and are able to have favorite posts, and leave comments on posts. It is a full CRUD application, to use it locally you need the following items in your .env.local file.

- `MONGODB_URI`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`
- `SECRET`

## ScreenShots

### HomePage

The Home page renders differently slightly differently when a user is signed in. The users image is displayed instead of the 'Sign In' button in the top right. If the User is an selected as `Admin` they also have an additional button to add new posts. The HomePage always displays,

- The three newest Recipes
- Random combination of posts the user marks as "featured"
- The five latest blog posts
- Five different recipes suggestions depending on the time of day

![HomePage Screenshot](/public/Screenshots/Homepage.jpg)

### Recipe Details Page

This page displays the details of a recipe as well as users comments and if the current user has saved it as a favorite. if no one is signed in it encourages a User to do so to be able to view the comments.

![Recipe Details Page Screenshot](/public/Screenshots/RecipePage.jpg)

### Search Page

The search page searhes through the recipes based on the users input. it searches both Recipes and Blogposts, as well looking through Tags, and searching through the ingredients.

![Search Page Screenshot](/public/Screenshots/SearchPage.png)

### Blog Listing

Shows the latest Blogposts that have been written, ordered by date.

![Blog Listings Page Screenshot](/public/Screenshots/BlogListingsPage.jpg)

### Profile Page

The profile page shows a users Bio as well as the Posts they have favorited and all of their comments. The user can also delete coments from here and go to the page to edit their name and bio. The profile picture comes from their google account.

![Profile Page Screenshot](/public/Screenshots/ProfilePage.png)

### New Post Page

The new post page can only be accessed by users that are logged in and are also designated as `Admin` users. The same form component is used for creating a new post as well as editing a post. Both blog posts and recipes are created and edited with this form depending on different inputs selected.

![New Post Form Page Screenshot](/public/Screenshots/NewPostPage.png)
