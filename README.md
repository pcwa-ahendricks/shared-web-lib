# Neu! Website

> www.pcwa.net

## Deploying Updates

Vercel provides integrations for the [Neu! Web](https://github.com/placercountywater/neu-web) GitHub, allowing for automatic deployments on every branch push and merge.

The easiest way to use a Git Integration is to think of the _master_ branch as production, ie. [https://www.pcwa.net](https://www.pcwa.net). Every time a pull/merge request is made to any other branch, Vercel will create a unique deployment, allowing you to view the changes in a preview deployment before merging to _master_.

When merging to the _master_ branch, a Production Deployment is made, making the latest changes available to [https://www.pcwa.net](https://www.pcwa.net) automatically.

It is **highly recommended** that the _develop_ branch be used for general updates and development. Committed changes can be previewed prior to merging into _master_ branch!

The Vercel Git Integrations provide the following benefits:

- Preview Deployments for every push for every branch
- Production Deployments for the most recent changes from the _master_ branch
- Instant rollbacks when reverting changes assigned to a custom domain, ie. [https://www.pcwa.net](https://www.pcwa.net)

## Development

### ENV Variables

To pull in environment variables from Vercel

```sh
vercel env pull
```

which will create a `.env` file which should reflect the variables outlined in `.env.example`.

## Todos

- [ ] Add some tests
- [ ] Add custom 404
- [ ] Fix vscode debugger

### GO-LIVE

Find **GO-LIVE** tagged comments and address them prior to _Go Live_ date.

- Forms Now deployment will no longer be necessary
- Use robots.txt.live over temporary robots.txt
- Set 'printf "https://www.pcwa.net" | vc env add NEXT_PUBLIC_BASE_URL production'
- Set 'printf "false" | vc env add NEXT_PUBLIC_USE_NG_IFRAME production'
- Confirm Water Quality links for CCRs are working from Docs api route
- Confirm redirects are working defined in next.config.json
- Confirm Google Site Search works
- Confirm Google Analytics works
- Confirm Form Submission works
- assets/\* should 404 for removal from Google Search

## Miscellaneous

### About Redirects

See `next.config.js` for redirects.

- `/rate-adjust-2018` Was used on NG version of website.
- `/about-pcwa/board-minutes` Was used on NG version of website. Stopped using "about-pcwa/board-minutes" for board minutes URL.
- `/about-pcwa/board-agenda` Was used on NG version of website. Stopped using "about-pcwa/board-agenda" for board meeting agendas URL.
- `/about-pcwa/board-of-directors` Was used on NG version of website. Stopped using "about-pcwa" for board related URLs.
- `/about-pcwa/board-of-directors/district/#` Was used on NG version of website. Stop using "/about-pcwa/.../district/# route params. Instead we are using "/board-of-directors/district-#".
- `/about-pcwa/board-agenda` Was used on NG version of website. Stopped using "about-pcwa" for board related URLs.
- `/newsroom/news-release` Was used on NG version of website. Use plural route instead.
- `/newsroom/publication` Was used on NG version of website. Use plural route instead.
- `/newsroom/multimedia-library/p` Was used on NG version of website. Use verbose/complete route name instead. Also, changed name to 'resource-library' and removed 'newsroom' path prefix.
- `/newsroom/multimedia-library/v` Was used on NG version of website. Use verbose/complete route name instead. Also, changed name to 'resource-library' and removed 'newsroom' path prefix.
- `/stewardship` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs.
- `/stewardship/watersense` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs. Changed endpoint from "water-sense" to "watersense".
- `/stewardship/rebate-programs` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs.
- `/stewardship/landscape-resources` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs.
- `/stewardship/house-calls` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs.
- `/stewardship/fire-resistant-garden` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs and page was renamed to "maidu-fire-station-makeover".
- `/stewardship/tips-for-kids` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs.
- `/stewardship/stop-leaks` Was used on NG version of website. Stopped using "stewardship" for water efficiency related URLs.
- `/recreation/campground` Was used on NG version of website. Use plural route instead.
- `/recreation/river-flow` Was used on NG version of website. Use plural route instead.
- `/career/salary-schedule` Was used on NG version of website. Use plural route instead.
- `/career/employee-benefits-summary` Was used on NG version of website. Use plural route instead.
- `/career/recruitment` Was used on NG version of website. Use plural route instead.

### Cronjobs

Below are the cronjobs on Vercel in order

ACIS jobs run at 12 am and 12 pm local time

- Snow Summary - Water Year
- Snow Summary - Last 7 Days
- Snow Summary - Last 30 Days
- Precipitation Summary - Water Year
- Precipitation Summary - Last 7 Days
- Precipitation Summary - Last 30 Days
- Max Temp Summary - Water Year
- Max Temp Summary - Last 7 Days
- Max Temp Summary - Last 30 Days
