// Assuming you are using a function like fetchBusinessNames in your frontend
const fetchReviews  = async () => {
  const token = localStorage.getItem('token');  
  
  const response = await fetch('https://smart.aliveai.net/scrape/business-names',  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch business names');
  }
  return response.json();
};

export default fetchReviews;
