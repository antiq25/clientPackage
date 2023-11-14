import  * as apiHandler  from '../apiWrap'

document
  .getElementById('create-listing-form')
  ?.addEventListener('submit', async (event: Event) => {
    event.preventDefault() // This should be at the beginning of the function

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const userId = Number(formData.get('userId'))
    const name = formData.get('name') as string
    const reviews_url = formData.get('reviews_url') as string
    const description = formData.get('description') as string | undefined

    try {
      const response = await apiHandler.handleCreateListing(
        userId,
        name,
        reviews_url,
        description
      )
      // Handle the response here
      console.log(response) // Or update the UI as needed
    } catch (error) {
      console.error(error)
      alert('An error occurred while creating the listing.')
    }
  })


document
  .getElementById('get-listing-form')
  ?.addEventListener('submit', async (event: Event) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const userId = Number(formData.get('userId'))
    const listingName = formData.get('listingName') as string | undefined

    try {
      const response = await apiHandler.handleGetListing(userId, listingName)
      if (response.success) {
        console.log(response.data) // Display data as needed
        alert('Listing fetched successfully')
      } else {
        alert(response.error)
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred.')
    }
  })

document
  .getElementById('fetch-reviews-form')
  ?.addEventListener('submit', async (event: Event) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const userId = Number(formData.get('userId'))
    const listingId = Number(formData.get('listingId'))
    const max_reviews = Number(formData.get('max_reviews'))
    // Removed the 'url' as it's not used in the API call

    try {
      const response = await apiHandler.handleFetchReviews(listingId, max_reviews)
      if (response.success) {
        console.log(response.data) // Display data as needed
        alert('Reviews fetched successfully')
      } else {
        alert(response.error)
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred.')
    }
  })
