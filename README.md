# didya_fullstack
Didya_app fullstack repository from Joseph Naves

Didya is an app that is designed to help someone get the small stuff done with a simple interface.  It is a work in progress.  A user would created some tasks and it will randomly pick one to do for the day.  This is my first solo app out of coding school and I do plan on making improvements to this.
For a better rundown of the why and how I made this app, I have included the short presentation scripe I did while presenting this app at a local developer demo day.



Hi, I'm Joseph Naves.  I come from the gaming and building maintenance industry here in Las Vegas.  With this industry, you maintain things you don't create, and it can be terribly monotonous and unfulfilling.  I decided to become a web developer to make things, and if I can improve at least one person's life with the thing I create then it is worth all of the effort.

For the past 4 months, I've completely dedicated myself to learning web development at PunchCode and on my own.  The thing I found most interesting in this time was using express to set up a monolithic app.  It's amazing when you get to see and use something that lets two things communicate with each other that on the outset dont look like they could.

I created an application that helps you to remember to do simple tasks around your house to help save your weekend.  In the previous industry I was involved with many of my coworkers (myself included) would work all day and when we got home would put off simple tasks.  These add up over the week and by the time our precious weekend came, these simple things would take up a half a day.  I have had many times where it didn't feel like I actually had a weekend between work and chores.  I want to help people prevent that from happening.

This SERN stack app was designed using bootstrap with some personal customizations.

Anyone can login from the landing page, if someone would like to sign up you just click on the sign up button.  

From here we created an account with our email and password.

This takes us to the add task page where we will add a short task that will take less than 15 minutes. For example we need to wipe down the kitchen counter, so we type “Wipe down the kitchen counter”.  By the way these pages are all React components. 

Once we click submit we are taken to the all tasks page where we can add another task by clicking the + button.  So lets add two more tasks: clean the litter box and vacuum the stairs.

Now let's look at the actual point of the app.

Now i'm going to logout and log back in and this takes you to the homepage or the Didya page as I keep calling it.  The app using Express will pull the list of tasks from AWS. Then using lodash, it will shuffle my tasks and pick one from my list.  I can click the check mark when I have completed this task or the x mark if I was lazy.

Now if there is a task that I don't do anymore or a typo, we can navigate to all tasks and click the edit button.  Here we can edit the task to our liking or delete the task all together.  This will update or remove the data from my mySQL database.
