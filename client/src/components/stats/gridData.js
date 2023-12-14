
export const postsData = [
  {
    id: 1,
    cover: '/assets/cards/card-mastercard-2.png', // URL to the image
    category: 'Category 1',
    author: {
      avatar: 'avatar-url-1.png', // URL to the author's avatar
      name: 'Author Name 1'
    },
    publishedAt: new Date(), // Date of publication
    readTime: '5 min',
    title: 'Post Title 1',
    shortDescription: 'This is a short description for post 1...',
    pageLink: '/page-1' // URL or path to the linked page
  },
  {
    id: 2,
    cover: 'image-url-2.jpg',
    category: 'Category 2',
    author: {
      avatar: 'avatar-url-2.png',
      name: 'Author Name 2'
    },
    publishedAt: new Date(),
    readTime: '10 min',
    title: 'Post Title 2',
    shortDescription: 'This is a short description for post 2...',
    pageLink: '/page-2'
  },
  // ... more post objects
];
