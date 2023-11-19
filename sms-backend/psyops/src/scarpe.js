const puppeteer = require('puppeteer')
const { batchInsertReviews, getUrlFromListing } = require('./db')
const isValidUrl = require('./utils').isValidUrl

const classNames = {
  username: 'd4r55',
  description: 'RfnDt',
  stars: 'kvMYJc',
  date: 'rsqaWe',
  seeMoreButton: 'w8nwRe.kyuRq',
  reviewText: 'wiI7pd'
}

async function clickSeeMoreButton(page, selector, index) {
  try {
    const buttons = await page.$$(selector)
    if (index < buttons.length) {
      await buttons[index].click()
    }
  } catch (error) {
    console.error(error)
  }
}

async function run(listingId, maxReviews) {
  const url = getUrlFromListing(listingId)

  if (!isValidUrl(url)) {
    console.log('Invalid URL')
    return
  }

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url + '&hl=en')

  let prevNumOfReviews = 0
  let noChangeCount = 0
  const MAX_NO_CHANGE = 5
  let reviewsToInsert = []

  while (true) {
    await page.waitForTimeout(3000)
    const currentNumOfReviews = await page.$$eval(
      `.${classNames.username}`,
      (elements) => elements.length
    )

    if (currentNumOfReviews === prevNumOfReviews) {
      noChangeCount++
    } else {
      noChangeCount = 0
    }

    if (
      noChangeCount >= MAX_NO_CHANGE ||
      reviewsToInsert.length >= maxReviews
    ) {
      break
    }

    prevNumOfReviews = currentNumOfReviews
    await page.evaluate(() => {
      const sidebar = document.querySelector('selector-for-sidebar')
      if (sidebar) {
        sidebar.scrollTop = sidebar.scrollHeight
      }
    })

    // Extract reviews
    for (let i = 0; i < maxReviews; i++) {
      try {
        const username = await page.$eval(
          `.${classNames.username}:nth-of-type(${i + 1})`,
          (el) => el.innerText.trim()
        )
        const description = await page.$eval(
          `.${classNames.description}:nth-of-type(${i + 1})`,
          (el) => el.innerText.trim()
        )
        const date = await page.$eval(
          `.${classNames.date}:nth-of-type(${i + 1})`,
          (el) => el.innerText.trim()
        )
        const reviewText = await page.$eval(
          `.${classNames.reviewText}:nth-of-type(${i + 1})`,
          (el) => el.innerText.trim()
        )
        const stars = await page.$eval(
          `.${classNames.stars}:nth-of-type(${i + 1})`,
          (el) => el.getAttribute('aria-label')
        )

        reviewsToInsert.push({
          author: username,
          authorDescription: description,
          stars: stars,
          date: date,
          content: reviewText
        })
      } catch (error) {
        console.log(`Encountered an error at index ${i}: ${error}`)
      }
    }

    // Click see more buttons
    await clickSeeMoreButton(page, `.${classNames.seeMoreButton}`, i)
  }

  await browser.close()
  batchInsertReviews(listingId, reviewsToInsert)
}

// Example Usage
run('someListingId', 10)
