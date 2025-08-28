# Job Tracker Tests

This is a small side project I built to keep myself honest about my job search.
It connects to my personal Google Sheet (where I log applications) and uses Playwright + the Google Sheets API to make sure the sheet stays clean.

### What it currently does

* Checks that my sheet has the right headers (Company, Position, Date Applied, Status, etc).
* Validates each row: company and position aren’t blank, dates follow the right format, and status is one of a few allowed values (Applied, Interviewing, Offer, Rejected, Ghosted).
* Helps me catch mistakes early — like forgetting to fill in a column or mistyping a status.

### What I want to implement

* I am adding atleast 2 entries per weekday
* Runs routinely, every weeknight
* Some notification system to alert me when a failure occurs 

### Why I built it

I spend a lot of time applying for jobs, and it’s easy to let the tracker get messy.
By treating my job search like real QA work, I get both:

* a smoother job application process
* a portfolio project that shows off Playwright + API integration skills



### Notes

This project is intentionally small and personal. It’s not meant to be a production framework, just a way to practice combining automation, APIs, and real-life data management.

