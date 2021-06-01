export const shuffle = (posts) => {
   for (let i = posts.length; i; i--) {
     let j = Math.floor(Math.random() * i);
     [posts[i - 1], posts[j]] = [posts[j], posts[i - 1]];
   }
};
