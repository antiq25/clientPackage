import React from 'react'
import { GridList1 } from 'src/sections/components/grid-lists/grid-list-1'

const now = new Date();

const posts = {
  id: '44df90cbf89963b8aa625c7d',
  author: {
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    name: 'Siegbert Gottfried',
  },
  category: 'Entrepreneurs',
  cover: '/assets/covers/business-2-4x4-small.png',
  readTime: '3 min',
  shortDescription:
    'Praesent eget leo mauris. Morbi ac vulputate nibh. In hac habitasse platea dictumst. Praesent fermentum lacus eleifend erat cursus, congue rhoncus mi porta. Mauris rhoncus mollis nisl, vitae tempus tortor. Proin sit amet feugiat felis. Donec nunc urna, pretium sed viverra vel, blandit at urna. Integer pharetra placerat mauris, at fringilla arcu dignissim a. Morbi nec fermentum purus. Integer vel justo interdum lectus euismod bibendum.',
  title: 'How Model View Controller (MVC) Architectures Work',
};
  

const PostCard = () => { 
  return (
    <div>
      <GridList1 posts={posts}
     
  
      />
    </div>
  )
}


export default PostCard;
