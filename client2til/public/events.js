import { apiHandler } from './bundled.js'

const elements = {
  reviews_url: document.getElementById('reviews_url'),
  description: document.getElementById('description'),
  listingId: document.getElementById('listingId'),
  max_reviews: document.getElementById('max_reviews'),
  userId: document.getElementById('userId'),
  name: document.getElementById('listingName')
}

function callHandler() {
  const listingName = elements.name.value.trim()

  // Validate the length of listingName
  if (listingName.length > 20) {
    alert('Listing name must be less than or equal to 20 characters long.')
    return
  }

  // Continue with API call if validation passes
  return apiHandler
    .handleCreateListing(
      userId,
      listingName,
      elements.reviews_url.value,
      elements.description.value
    )
    .then((response) => response.json())
    .then(
      (result) =>
        (document.getElementById('response').innerText = JSON.stringify(result))
    )
    .catch(
      (error) => (document.getElementById('response').innerText = error.message)
    )
}



function callListings() {
  return apiHandler
    .handleGetListing(elements.userId.value, elements.listingName.value)
    .then((response) => response.json())
    .then(
      (result) =>
        (document.getElementById('response').innerText = JSON.stringify(result))
    )
    .catch(
      (error) => (document.getElementById('response').innerText = error.message)
    )
}

function callFetchReviews() {
  return apiHandler
    .handleFetchReviews(elements.listingId.value, elements.max_reviews.value)
    .then((response) => response.json())
    .then(
      (result) =>
        (document.getElementById('response').innerText = JSON.stringify(result))
    )
    .catch(
      (error) => (document.getElementById('response').innerText = error.message)
    )
}

function handleCreateListingForm(event) {
  event.preventDefault()
  callHandler()
}

function handleGetListingForm(event) {
  event.preventDefault()
  callListings()
}

function handleFetchReviewsForm(event) {
  event.preventDefault()
  callFetchReviews()
}

document
  .getElementById('handleCreateListingForm')
  .addEventListener('submit', handleCreateListingForm)
document
  .getElementById('handleGetListingForm')
  .addEventListener('submit', handleGetListingForm)
document
  .getElementById('handleFetchReviewsForm')
  .addEventListener('submit', handleFetchReviewsForm)
